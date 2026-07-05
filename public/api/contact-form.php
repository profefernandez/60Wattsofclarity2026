<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const CONTACT_TO_EMAIL = 'contact@60wattsofclarity.com';
const CONTACT_RATE_LIMIT_WINDOW = 600;
const CONTACT_RATE_LIMIT_MAX = 5;
const CONTACT_BLOCKED_DOMAINS = [
    'mailinator.com',
    'tempmail.com',
    '10minutemail.com',
    'guerrillamail.com',
    'trashmail.com',
    'yopmail.com',
];

function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function env_value(string $name, ?string $default = null): ?string
{
    $value = getenv($name);
    if ($value === false || $value === '') {
        return $default;
    }

    return $value;
}

function input_text(array $payload, string $key, int $maxLength, bool $allowNewlines = false): string
{
    $value = isset($payload[$key]) ? (string) $payload[$key] : '';
    $value = trim(strip_tags($value));
    $value = preg_replace('/[<>]/', '', $value) ?? '';

    if ($allowNewlines) {
        $value = preg_replace("/\r\n|\r/", "\n", $value) ?? $value;
    } else {
        $value = preg_replace('/\s+/', ' ', $value) ?? $value;
    }

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength);
    }

    return substr($value, 0, $maxLength);
}

function get_client_ip(): string
{
    $candidates = [
        $_SERVER['HTTP_CF_CONNECTING_IP'] ?? '',
        $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '',
        $_SERVER['REMOTE_ADDR'] ?? '',
    ];

    foreach ($candidates as $candidate) {
        if ($candidate === '') {
            continue;
        }

        if (str_contains($candidate, ',')) {
            $candidate = trim(explode(',', $candidate, 2)[0]);
        }

        if (filter_var($candidate, FILTER_VALIDATE_IP)) {
            return $candidate;
        }
    }

    return 'unknown';
}

function rate_limit(string $ip): void
{
    $bucketFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . '60wattsofclarity-contact-' . hash('sha256', $ip) . '.json';
    $now = time();
    $timestamps = [];

    if (is_file($bucketFile)) {
        $raw = file_get_contents($bucketFile);
        if ($raw !== false && $raw !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                $timestamps = array_values(array_filter($decoded, static fn ($timestamp) => is_int($timestamp) || ctype_digit((string) $timestamp)));
                $timestamps = array_map('intval', $timestamps);
            }
        }
    }

    $timestamps = array_values(array_filter($timestamps, static fn (int $timestamp): bool => ($now - $timestamp) < CONTACT_RATE_LIMIT_WINDOW));

    if (count($timestamps) >= CONTACT_RATE_LIMIT_MAX) {
        respond(429, ['error' => 'Too many submissions from this source. Try again later.']);
    }

    $timestamps[] = $now;
    $written = file_put_contents($bucketFile, json_encode($timestamps, JSON_UNESCAPED_SLASHES), LOCK_EX);
    if ($written === false) {
        respond(500, ['error' => 'Unable to update rate limit state.']);
    }
}

function sanitize_email(string $email): string
{
    return strtolower(trim($email));
}

function is_blocked_domain(string $email): bool
{
    $parts = explode('@', $email);
    if (count($parts) !== 2) {
        return true;
    }

    return in_array($parts[1], CONTACT_BLOCKED_DOMAINS, true);
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);
if (!is_array($payload)) {
    respond(400, ['error' => 'Invalid JSON payload.']);
}

$website = input_text($payload, 'website', 120);
if ($website !== '') {
    respond(400, ['error' => 'Submission blocked.']);
}

$captcha = input_text($payload, 'captcha', 20);
if ($captcha !== '' && $captcha !== '5') {
    respond(400, ['error' => 'Verification answer is incorrect.']);
}

$fullName = input_text($payload, 'fullName', 80);
$email = sanitize_email(input_text($payload, 'email', 160));
$organization = input_text($payload, 'organization', 120);
$interest = input_text($payload, 'interest', 80);
$message = input_text($payload, 'message', 1200, true);
$source = input_text($payload, 'source', 80);
$userAgent = input_text($payload, 'userAgent', 255);
$fingerprint = input_text($payload, 'fingerprint', 80);

if ($fullName === '') {
    respond(422, ['error' => 'Full name is required.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['error' => 'Enter a valid email address.']);
}

if (is_blocked_domain($email)) {
    respond(422, ['error' => 'Disposable email domains are not accepted.']);
}

if ($interest === '') {
    respond(422, ['error' => 'Select one service area.']);
}

if ($message === '') {
    respond(422, ['error' => 'Message is required.']);
}

rate_limit(get_client_ip());

$resendApiKey = env_value('RESEND_API_KEY');
if ($resendApiKey === null) {
    respond(500, ['error' => 'Resend API key is not configured.']);
}

$resendFromEmail = env_value('RESEND_FROM_EMAIL', '60 Watts of Clarity <no-reply@60wattsofclarity.com>');
$resendToEmail = env_value('RESEND_TO_EMAIL', CONTACT_TO_EMAIL);
$subject = '[60 Watts of Clarity] ' . $interest;
$body = implode("\n", [
    'New contact form submission',
    '',
    'Name: ' . $fullName,
    'Email: ' . $email,
    'Organization: ' . ($organization !== '' ? $organization : 'N/A'),
    'Service area: ' . $interest,
    'Message:',
    $message,
    '',
    'Source: ' . ($source !== '' ? $source : 'contact-form'),
    'Fingerprint: ' . ($fingerprint !== '' ? $fingerprint : 'N/A'),
    'User agent: ' . ($userAgent !== '' ? $userAgent : 'N/A'),
]);

$requestBody = json_encode([
    'from' => $resendFromEmail,
    'to' => [$resendToEmail],
    'reply_to' => $email,
    'subject' => $subject,
    'text' => $body,
], JSON_UNESCAPED_SLASHES);

if ($requestBody === false) {
    respond(500, ['error' => 'Unable to encode email payload.']);
}

$request = curl_init('https://api.resend.com/emails');
curl_setopt_array($request, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $resendApiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_TIMEOUT => 15,
]);

$responseBody = curl_exec($request);
if ($responseBody === false) {
    $errorMessage = curl_error($request);
    curl_close($request);
    respond(502, ['error' => $errorMessage !== '' ? $errorMessage : 'Resend request failed.']);
}

$responseStatus = (int) curl_getinfo($request, CURLINFO_RESPONSE_CODE);
curl_close($request);

if ($responseStatus < 200 || $responseStatus >= 300) {
    $decoded = json_decode($responseBody, true);
    $details = is_array($decoded) && isset($decoded['message']) ? (string) $decoded['message'] : 'Failed to send email.';
    respond($responseStatus > 0 ? $responseStatus : 502, ['error' => $details]);
}

respond(200, ['ok' => true, 'message' => 'Message sent to contact@60wattsofclarity.com.']);

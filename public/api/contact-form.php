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
    // SECURE DEFAULT: Only read REMOTE_ADDR to prevent header spoofing via proxies.
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    if (filter_var($ip, FILTER_VALIDATE_IP)) {
        return $ip;
    }
    return 'unknown';
}

function rate_limit(string $ip): void
{
    $bucketFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . '60wattsofclarity-contact-' . hash('sha256', $ip) . '.json';
    $now = time();
    $timestamps = [];

    // Open file handles with safe check-and-write permissions
    $fp = fopen($bucketFile, 'c+');
    if (!$fp) {
        respond(500, ['error' => 'Unable to open rate limit protection stream.']);
    }

    // Acquire exclusive lock atomically before reading or checking state data (TOCTOU mitigation)
    if (!flock($fp, LOCK_EX)) {
        fclose($fp);
        respond(500, ['error' => 'Lock acquisition failure during safety checks.']);
    }

    $filesize = filesize($bucketFile);
    if ($filesize > 0) {
        rewind($fp);
        $raw = fread($fp, $filesize);
        if ($raw !== false && $raw !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                $timestamps = array_values(array_filter($decoded, static fn ($ts) => is_int($ts) || ctype_digit((string) $ts)));
                $timestamps = array_map('intval', $timestamps);
            }
        }
    }

    // Retain only timestamps within active window
    $timestamps = array_values(array_filter($timestamps, static fn (int $ts): bool => ($now - $ts) < CONTACT_RATE_LIMIT_WINDOW));

    if (count($timestamps) >= CONTACT_RATE_LIMIT_MAX) {
        flock($fp, LOCK_UN);
        fclose($fp);
        respond(429, ['error' => 'Too many submissions from this source. Try again later.']);
    }

    $timestamps[] = $now;
    $encoded = json_encode($timestamps, JSON_UNESCAPED_SLASHES);

    // Secure atomic truncation and update write path
    rewind($fp);
    ftruncate($fp, 0);
    fwrite($fp, $encoded);
    fflush($fp);

    flock($fp, LOCK_UN);
    fclose($fp);
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

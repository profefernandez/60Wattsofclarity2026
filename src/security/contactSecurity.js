const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const RATE_LIMIT_STORAGE_KEY = 'contact-form-rate-limit-v1';
const FINGERPRINT_KEY = 'contact-form-client-fingerprint-v1';

const BLOCKED_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'trashmail.com',
  'yopmail.com',
]);

export function sanitizeInput(value, maxLength) {
  return value
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trimStart()
    .slice(0, maxLength);
}

export function normalizeEmail(value) {
  return sanitizeInput(value.toLowerCase(), 160).trim();
}

export function isBlockedEmailDomain(email) {
  const domain = email.split('@')[1];
  return domain ? BLOCKED_DOMAINS.has(domain) : false;
}

function createClientFingerprint() {
  const entropy = `${navigator.userAgent}|${navigator.language}|${window.location.hostname}`;
  return btoa(entropy).slice(0, 48);
}

export function getClientFingerprint() {
  const existing = localStorage.getItem(FINGERPRINT_KEY);
  if (existing) return existing;
  const generated = createClientFingerprint();
  localStorage.setItem(FINGERPRINT_KEY, generated);
  return generated;
}

export function isRateLimited(clientFingerprint, now = Date.now()) {
  const allEntries = JSON.parse(localStorage.getItem(RATE_LIMIT_STORAGE_KEY) || '{}');
  const history = Array.isArray(allEntries[clientFingerprint]) ? allEntries[clientFingerprint] : [];
  const recent = history.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  return recent.length >= MAX_SUBMISSIONS_PER_WINDOW;
}

export function registerSubmission(clientFingerprint, now = Date.now()) {
  const allEntries = JSON.parse(localStorage.getItem(RATE_LIMIT_STORAGE_KEY) || '{}');
  const history = Array.isArray(allEntries[clientFingerprint]) ? allEntries[clientFingerprint] : [];
  const recent = history.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  allEntries[clientFingerprint] = [...recent, now];
  localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(allEntries));
}

export function requiresCaptcha({ honeypot, isRateLimitedResult, domainBlocked }) {
  return Boolean(honeypot || isRateLimitedResult || domainBlocked);
}

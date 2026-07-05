import { appEnvironment, contactSubmissionEndpoint, siteName } from '../config/environment.js';

function buildSubmissionPayload(form, metadata) {
  return {
    fullName: form.fullName,
    email: form.email,
    organization: form.organization,
    interest: form.interest,
    message: form.message,
    website: form.website,
    captcha: form.captcha,
    submittedAt: new Date().toISOString(),
    source: metadata.source,
    userAgent: metadata.userAgent,
    environment: appEnvironment,
    siteName,
    fingerprint: metadata.fingerprint,
  };
}

export async function submitContactForm(form, metadata) {
  const response = await fetch(contactSubmissionEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildSubmissionPayload(form, metadata)),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || 'Unable to submit the contact form.');
  }

  return response.json().catch(() => ({}));
}

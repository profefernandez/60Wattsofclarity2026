const defaultDescription =
  'Practical, ethical AI education and implementation for social work and human services.';

export const appEnvironment = process.env.NEXT_PUBLIC_APP_ENV || (process.env.NODE_ENV === 'production' ? 'production' : 'development');
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || '60 Watts of Clarity';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || defaultDescription;
export const enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
export const enableServiceWorker = process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER === 'true';
export const contactSubmissionEndpoint = process.env.NEXT_PUBLIC_CONTACT_SUBMISSION_ENDPOINT || '/api/contact-form.php';
export const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'GT-T5JVK8SK';
export const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-JK70L5RV1Z';

const defaultDescription =
  'Practical, ethical AI education and implementation for social work and human services.';

export const appEnvironment = import.meta.env.VITE_APP_ENV || (import.meta.env.PROD ? 'production' : 'development');
export const siteName = import.meta.env.VITE_SITE_NAME || '60 Watts of Clarity';
export const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
export const siteDescription = import.meta.env.VITE_SITE_DESCRIPTION || defaultDescription;
export const enableAnalytics = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
export const enableServiceWorker = import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true';
export const contactSubmissionEndpoint = import.meta.env.VITE_CONTACT_SUBMISSION_ENDPOINT || '/api/contact-form.php';
export const googleTagId = import.meta.env.VITE_GOOGLE_TAG_ID || 'GT-T5JVK8SK';
export const googleAnalyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID || 'G-JK70L5RV1Z';

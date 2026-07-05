import {
  enableAnalytics,
  googleAnalyticsId,
  googleTagId,
  siteName,
} from './config/environment.js';

function loadGoogleTag() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.__googleTagLoaded) return;

  window.__googleTagLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`;
  script.crossOrigin = 'anonymous';
  script.setAttribute('data-google-tag-name', siteName);
  script.setAttribute('data-google-tag-id', googleTagId);
  script.setAttribute('data-google-analytics-destination-id', googleAnalyticsId);
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', googleTagId, {
    page_title: siteName,
    send_page_view: true,
  });
  window.gtag('config', googleAnalyticsId);
}

function evaluateConsentAndRun() {
  if (!enableAnalytics) return;

  // Verify compliance state with Cookiebot before initializing scripts
  if (typeof window !== 'undefined' && window.Cookiebot) {
    if (window.Cookiebot.consent && window.Cookiebot.consent.statistics) {
      loadGoogleTag();
    } else {
      // Defer tag evaluation until consent is explicitly granted
      window.addEventListener('CookiebotOnAccept', () => {
        if (window.Cookiebot.consent && window.Cookiebot.consent.statistics) {
          loadGoogleTag();
        }
      });
    }
  } else {
    // Graceful fallback context
    loadGoogleTag();
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', evaluateConsentAndRun);
  } else {
    evaluateConsentAndRun();
  }
}

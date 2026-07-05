import { useState } from 'react';

function getBannerEnabled() {
  return import.meta.env.VITE_ENABLE_CONSENT_BANNER === 'true';
}

export default function ConsentBanner() {
  const [dismissed, setDismissed] = useState(false);
  const isEnabled = getBannerEnabled();

  if (!isEnabled || dismissed) {
    return null;
  }

  return (
    <aside
      className="consent-banner"
      role="region"
      aria-label="Privacy and consent notice"
      data-consent-placeholder="true"
    >
      <div className="consent-banner__content">
        <strong className="consent-banner__title">Privacy and consent placeholder</strong>
        <p className="consent-banner__text">
          This is a sample consent-management slot for cookie preferences, analytics opt-in, and policy links.
        </p>
      </div>
      <div className="consent-banner__actions">
        <button type="button" className="cta-gold" onClick={() => setDismissed(true)}>
          Accept
        </button>
        <button type="button" className="cta-outline" onClick={() => setDismissed(true)}>
          Decline
        </button>
        <button type="button" className="cta-outline" onClick={() => setDismissed(true)}>
          Manage preferences
        </button>
      </div>
    </aside>
  );
}

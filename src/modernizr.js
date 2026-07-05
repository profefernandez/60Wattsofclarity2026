import { enableServiceWorker } from './config/environment.js';

const MODERNIZR_FEATURES = {
  cssgrid: false,
  flexbox: false,
  serviceworker: false,
  webp: false,
};

function setRootClass(feature, supported) {
  const root = document.documentElement;
  root.classList.add(supported ? feature : `no-${feature}`);
}

function detectWebP() {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.width > 0 && image.height > 0);
    image.onerror = () => resolve(false);
    image.src =
      'data:image/webp;base64,UklGRiIAAABXRUJQVlA4TAYAAAAvAAAAHwAAQUxQSAwAAAAQUklA';
  });
}

async function initWebPFeature(root) {
  MODERNIZR_FEATURES.webp = await detectWebP();
  setRootClass('webp', MODERNIZR_FEATURES.webp);
  root.dataset.webpSupport = MODERNIZR_FEATURES.webp ? 'supported' : 'unsupported';
}

export function initModernizr() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return MODERNIZR_FEATURES;
  }

  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  // Progressive enhancement keeps the default experience usable, then layers
  // in capabilities when the browser proves support for them.
  MODERNIZR_FEATURES.cssgrid =
    typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('display', 'grid');
  MODERNIZR_FEATURES.flexbox =
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('display', 'flex') &&
    CSS.supports('flex-wrap', 'wrap');
  MODERNIZR_FEATURES.serviceworker = 'serviceWorker' in navigator;

  setRootClass('cssgrid', MODERNIZR_FEATURES.cssgrid);
  setRootClass('flexbox', MODERNIZR_FEATURES.flexbox);
  setRootClass('serviceworker', MODERNIZR_FEATURES.serviceworker);

  window.Modernizr = MODERNIZR_FEATURES;
  root.dataset.featureDetection = 'modernizr';

  if (enableServiceWorker && MODERNIZR_FEATURES.serviceworker) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        root.dataset.serviceworker = 'registration-failed';
      });
    });
  }

  void initWebPFeature(root);

  return MODERNIZR_FEATURES;
}

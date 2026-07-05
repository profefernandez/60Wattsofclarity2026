import { siteName, siteUrl } from './environment.js';

function getOrCreateMeta(selector, attribute, value) {
  if (typeof document === 'undefined') return;

  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
    return element;
  }

  const meta = document.createElement('meta');
  meta.setAttribute(attribute, value);
  document.head.appendChild(meta);
  return meta;
}

function getOrCreateLink(rel, href) {
  if (typeof document === 'undefined') return;

  const element = document.head.querySelector(`link[rel="${rel}"]`);
  if (element) {
    element.setAttribute('href', href);
    return element;
  }

  const link = document.createElement('link');
  link.setAttribute('rel', rel);
  link.setAttribute('href', href);
  document.head.appendChild(link);
  return link;
}

export function setPageMetadata({ title, description, path = '/' }) {
  if (typeof document === 'undefined') return;

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonicalUrl = new URL(path, siteUrl).toString();

  document.title = fullTitle;
  getOrCreateMeta('meta[name="description"]', 'name', 'description').setAttribute('content', description);
  getOrCreateMeta('meta[property="og:title"]', 'property', 'og:title').setAttribute('content', fullTitle);
  getOrCreateMeta('meta[property="og:description"]', 'property', 'og:description').setAttribute('content', description);
  getOrCreateMeta('meta[property="og:url"]', 'property', 'og:url').setAttribute('content', canonicalUrl);
  getOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title').setAttribute('content', fullTitle);
  getOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description').setAttribute('content', description);
  getOrCreateLink('canonical', canonicalUrl);
}

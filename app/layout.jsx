import { Suspense } from 'react';
import Navbar from '../src/components/Navbar.jsx';
import Footer from '../src/components/Footer.jsx';
import AccessibilityWidget from '../src/components/AccessibilityWidget.jsx';
import ConsentBanner from '../src/components/ConsentBanner.jsx';
import ScrollToTop from '../src/components/ScrollToTop.jsx';
import Providers from './providers.jsx';
import { siteDescription, siteName, siteUrl } from '../src/config/environment.js';
import '../src/index.css';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense fallback={null}><ScrollToTop /></Suspense>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <div className="site-layout min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <AccessibilityWidget />
            <ConsentBanner />
          </div>
        </Providers>
      </body>
    </html>
  );
}

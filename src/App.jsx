import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget.jsx';
import ConsentBanner from './components/ConsentBanner.jsx';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Booking = lazy(() => import('./pages/Booking'));
const Resources = lazy(() => import('./pages/Resources'));
const Partners = lazy(() => import('./pages/Partners'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const LearnAI = lazy(() => import('./pages/LearnAI'));
const WebsiteDevelopment = lazy(() => import('./pages/WebsiteDevelopment'));
const KeynotesWorkshops = lazy(() => import('./pages/KeynotesWorkshops'));
const Contact = lazy(() => import('./pages/Contact'));

function NotFound() {
  return (
    <main className="not-found min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white">
      <div className="text-8xl mb-6">🔦</div>
      <h1 className="text-[#ffb300] mb-4">Page Not Found</h1>
      <p className="text-[#d9d9d9] text-lg mb-8 max-w-md">
        Looks like this page has lost its signal. Let us get you back to clarity.
      </p>
      <Link
        to="/"
        className="cta-gold text-lg"
      >
        Back to Home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="site-layout min-h-screen flex flex-col">
        <Navbar />
        <Suspense fallback={<main id="main-content" className="page-loading" aria-busy="true">Loading page…</main>}>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/learning-ai" element={<LearnAI />} />
              <Route path="/services/website-development" element={<WebsiteDevelopment />} />
              <Route path="/services/keynotes-workshops" element={<KeynotesWorkshops />} />
              <Route path="/services/case-studies" element={<CaseStudies />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/learn-ai" element={<LearnAI />} />
              <Route path="/website-development" element={<WebsiteDevelopment />} />
              <Route path="/keynotes-workshops" element={<KeynotesWorkshops />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
        <Footer />
        <AccessibilityWidget />
        <ConsentBanner />
      </div>
    </BrowserRouter>
  );
}

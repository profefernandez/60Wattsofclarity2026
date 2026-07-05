import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import LearnAI from './pages/LearnAI';
import Contact from './pages/Contact';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#f0f9ff]">
      <div className="text-8xl mb-6">🔦</div>
      <h1 className="text-[#1e3a8a] mb-4">Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        Looks like this page has lost its signal. Let us get you back to clarity.
      </p>
      <a href="/" className="px-8 py-4 rounded-full bg-[#1e3a8a] text-white font-bold text-lg hover:bg-[#1e40af] transition-colors">
        Back to Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/learn-ai" element={<LearnAI />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

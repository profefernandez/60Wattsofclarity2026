import { NavLink } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1e3a8a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#d97706] flex items-center justify-center font-extrabold text-white text-lg">
              60
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              60 Watts<span className="text-[#d97706]">of</span>Clarity
            </span>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            A Social Work &amp; Human Services Agency empowering social workers and communities to learn, build, and deploy AI solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/services', label: 'Services' },
              { to: '/case-studies', label: 'Case Studies' },
              { to: '/learn-ai', label: 'Learn AI' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className="text-blue-200 hover:text-[#fbbf24] transition-colors text-sm font-medium">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-white">Get In Touch</h4>
          <ul className="flex flex-col gap-2 text-blue-200 text-sm">
            <li>
              <NavLink to="/learn-ai" className="inline-block px-4 py-2 rounded-full bg-[#d97706] text-white font-bold text-sm hover:bg-[#b45309] transition-colors mt-2">
                Book a Session
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink to="/contact" className="text-blue-200 hover:text-[#fbbf24] transition-colors">
                Send us a message →
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-700 mt-4">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-blue-300 text-xs">
          <span>© {year} 60 Watts of Clarity. All rights reserved.</span>
          <span>Empowering Communities Through AI</span>
        </div>
      </div>
    </footer>
  );
}

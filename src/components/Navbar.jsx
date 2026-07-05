import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/learn-ai', label: 'Learn AI' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#1e3a8a] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <NavLink to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="w-10 h-10 rounded-full bg-[#d97706] flex items-center justify-center font-extrabold text-white text-lg leading-none">
            60
          </div>
          <span className="text-xl font-extrabold tracking-tight leading-tight">
            60 Watts <span className="text-[#d97706]">of</span> Clarity
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-base font-semibold transition-colors duration-200 pb-1 border-b-2 ${
                  isActive
                    ? 'border-[#d97706] text-[#fbbf24]'
                    : 'border-transparent hover:text-[#fbbf24] hover:border-[#fbbf24]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/learn-ai"
            className="ml-4 px-5 py-2 rounded-full bg-[#d97706] text-white font-bold text-sm hover:bg-[#b45309] transition-colors duration-200 shadow-md"
          >
            Book a Session
          </NavLink>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#1e3a8a] border-t border-blue-700 px-6 pb-6 pt-2">
          <nav className="flex flex-col gap-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold py-2 border-b border-blue-700 ${
                    isActive ? 'text-[#fbbf24]' : 'text-white hover:text-[#fbbf24]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/learn-ai"
              onClick={() => setOpen(false)}
              className="mt-2 px-5 py-3 rounded-full bg-[#d97706] text-white font-bold text-center hover:bg-[#b45309] transition-colors duration-200"
            >
              Book a Session
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/booking', label: 'Booking' },
  { to: '/resources', label: 'Resources' },
  { to: '/partners', label: 'Partners' },
  { to: '/case-studies', label: 'Case Studies' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header w-full text-white sticky top-0 z-50 shadow-lg">
      <div className="site-header__inner max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="site-header__brand flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="site-header__logo w-10 h-10 rounded-full bg-[#ffb300] flex items-center justify-center font-extrabold text-black text-lg leading-none">
            60
          </div>
          <span className="site-header__brand-text text-xl font-extrabold tracking-tight leading-tight">
            60 Watts <span className="text-[#ffb300]">of</span> Clarity
          </span>
        </NavLink>

        <nav className="site-header__nav hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `site-header__link text-base font-semibold transition-colors duration-200 pb-1 border-b-2 ${
                  isActive
                    ? 'border-[#ffb300] text-[#ffb300]'
                    : 'border-transparent hover:text-[#ffb300] hover:border-[#ffb300]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/booking"
            className="site-header__cta ml-4 px-5 py-2 rounded-full bg-[#ffb300] text-black font-bold text-sm hover:brightness-105 transition-colors duration-200 shadow-md"
          >
            Book a Consultation
          </NavLink>
        </nav>

        <button
          className="site-header__menu-button md:hidden flex flex-col gap-1.5 p-2 rounded"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-primary-navigation"
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="site-header__mobile-panel md:hidden bg-[#050505] border-t border-[#2f2f2f] px-6 pb-6 pt-2">
          <nav id="mobile-primary-navigation" className="site-header__mobile-nav flex flex-col gap-4" aria-label="Primary mobile">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `site-header__mobile-link text-lg font-semibold py-2 border-b border-[#2f2f2f] ${
                    isActive ? 'text-[#ffb300]' : 'text-white hover:text-[#ffb300]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/booking"
              onClick={() => setOpen(false)}
              className="site-header__mobile-cta mt-2 px-5 py-3 rounded-full bg-[#ffb300] text-black font-bold text-center hover:brightness-105 transition-colors duration-200"
            >
              Book a Consultation
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

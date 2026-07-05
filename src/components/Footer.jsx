import { NavLink } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer text-white">
      <div className="site-footer__inner max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <section className="site-footer__brand" aria-label="Company information">
          <div className="site-footer__brand-row flex items-center gap-3 mb-4">
            <div className="site-footer__logo w-10 h-10 rounded-full bg-[#ffb300] flex items-center justify-center font-extrabold text-black text-lg">
              60
            </div>
            <span className="site-footer__brand-text text-xl font-extrabold tracking-tight">
              60 Watts <span className="text-[#ffb300]">of</span> Clarity
            </span>
          </div>
          <p className="site-footer__description text-[#d9d9d9] text-sm leading-relaxed">
            A Social Work &amp; Human Services Agency empowering social workers and communities to learn, build, and deploy AI solutions.
          </p>
          <div className="site-footer__contact-details mt-5 text-sm text-[#d9d9d9]">
            <p>
              <a href="mailto:contact@60wattsofclarity.com" className="hover:text-[#ffb300]">
                contact@60wattsofclarity.com
              </a>
            </p>
            <p className="mt-2">
              Follow updates on{' '}
              <a href="https://60wattsofclarity.substack.com" className="hover:text-[#ffb300]" target="_blank" rel="noreferrer">
                Substack
              </a>
            </p>
          </div>
        </section>

        <nav className="site-footer__links" aria-label="Footer">
          <h2 className="text-lg font-bold mb-4 text-white">Quick Links</h2>
          <ul className="site-footer__list flex flex-col gap-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/services', label: 'Services' },
              { to: '/booking', label: 'Booking' },
              { to: '/resources', label: 'Resources' },
              { to: '/partners', label: 'Partners' },
              { to: '/case-studies', label: 'Case Studies' },
              { to: '/learn-ai', label: 'Learn AI' },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className="site-footer__link text-[#d9d9d9] text-sm font-medium">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <section className="site-footer__contact" aria-label="Contact call to action">
          <h2 className="text-lg font-bold mb-4 text-white">Get In Touch</h2>
          <ul className="site-footer__actions flex flex-col gap-2 text-[#d9d9d9] text-sm">
            <li>
              <NavLink to="/booking" className="site-footer__cta inline-block px-4 py-2 rounded-full bg-[#ffb300] text-black font-bold text-sm hover:brightness-105 transition-colors mt-2">
                Book a Consultation
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink to="/booking" className="site-footer__link text-[#d9d9d9]">
                Request a consultation →
              </NavLink>
            </li>
            <li className="mt-2">
              <a href="https://60wattsofclarity.substack.com" className="site-footer__link text-[#d9d9d9]" target="_blank" rel="noreferrer">
                Substack newsletter →
              </a>
            </li>
            <li className="mt-2">
              <a href="mailto:contact@60wattsofclarity.com" className="site-footer__link text-[#d9d9d9]">
                Email us →
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="site-footer__bottom border-t border-[#2f2f2f] mt-4">
        <div className="site-footer__bottom-inner max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[#adadad] text-xs">
          <span>© {year} 60 Watts of Clarity. All rights reserved.</span>
          <span>Empowering Communities Through AI</span>
        </div>
      </div>
    </footer>
  );
}

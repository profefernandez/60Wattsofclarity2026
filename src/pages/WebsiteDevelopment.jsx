import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageMetadata } from '../config/pageMetadata.js';

const deliverables = [
  'Responsive build in React + Vite',
  'Accessible, semantic page structure',
  'SEO-ready titles and descriptions',
  'Copy support for conversion-focused pages',
  'Launch help and hosting handoff',
];

export default function WebsiteDevelopment() {
  useEffect(() => {
    setPageMetadata({
      title: 'Website Development',
      description: 'Website packages start at $500 plus $35/month hosting. Build a fast, accessible site with clear conversion paths.',
      path: '/services/website-development',
    });
  }, []);

  return (
    <main id="main-content" className="website-dev-page site-main">
      <section className="website-dev-page__hero section-shell" aria-labelledby="website-dev-heading">
        <div className="website-dev-page__hero-inner section-shell__inner">
          <p className="inline-flex rounded-full border border-[#2ec4b6] px-4 py-2 text-[#2ec4b6]">Website development</p>
          <h1 id="website-dev-heading" className="mt-6 max-w-4xl">
            Website packages start at $500, with hosting at $35 per month.
          </h1>
          <p className="type-24 mt-4 max-w-3xl text-[#d9d9d9]">
            We build simple, responsive sites that explain your offer, support SEO, and move people to book.
          </p>
        </div>
      </section>

      <section className="website-dev-page__details section-shell pt-0" aria-labelledby="website-dev-details-title">
        <div className="website-dev-page__details-inner section-shell__inner grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
            <h2 id="website-dev-details-title" className="mb-4">What is included</h2>
            <ul className="flex flex-col gap-3">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-[#d9d9d9]">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#ffb300]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
            <h2 className="mb-4">Best fit for</h2>
            <p className="text-[#d9d9d9]">
              Social work practices, agencies, educators, and small organizations that need a clear online presence and one primary action.
            </p>
            <div className="mt-6 rounded-xl border border-[#2f2f2f] bg-[#050505] p-4 text-[#f2f2f2]">
              Hosting: $35/month after launch
            </div>
          </article>
        </div>
      </section>

      <section className="website-dev-page__cta section-shell pt-0" aria-labelledby="website-dev-cta-title">
        <div className="website-dev-page__cta-inner section-shell__inner rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8 md:p-10">
          <h2 id="website-dev-cta-title" className="mb-4">Need a quote for your site?</h2>
          <p className="type-22 max-w-3xl text-[#d9d9d9]">
            Book a consultation and we will scope the pages, features, and launch timeline.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/booking" className="cta-gold inline-flex">
              Book a consultation
            </Link>
            <Link to="/resources" className="cta-outline inline-flex">
              Download planning tools
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

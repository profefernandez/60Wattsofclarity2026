import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageMetadata } from '../config/pageMetadata.js';

const resources = [
  {
    title: 'Case study summary',
    description: 'A short overview of one agency project: challenge, approach, and outcome.',
    href: '/downloads/60wattsofclarity-case-study.md',
    badge: 'Download',
  },
  {
    title: 'Organizational AI policy checklist',
    description: 'A planning checklist for policy, privacy, review, and rollout conversations.',
    href: '/downloads/organizational-ai-policy-checklist.md',
    badge: 'Checklist',
  },
];

export default function Resources() {
  useEffect(() => {
    setPageMetadata({
      title: 'Resources and Downloads',
      description: 'Download the case study summary and organizational AI policy checklist from 60 Watts of Clarity.',
      path: '/resources',
    });
  }, []);

  return (
    <main id="main-content" className="resources-page site-main">
      <section className="resources-page__hero section-shell" aria-labelledby="resources-heading">
        <div className="resources-page__hero-inner section-shell__inner">
          <p className="inline-flex rounded-full border border-[#2ec4b6] px-4 py-2 text-[#2ec4b6]">Downloads and planning tools</p>
          <h1 id="resources-heading" className="mt-6 max-w-4xl">
            Resources for planning an AI project, training, or website launch.
          </h1>
          <p className="type-24 mt-4 max-w-3xl text-[#d9d9d9]">
            Use these files to review outcomes, align internal policy, and prepare for a consultation.
          </p>
        </div>
      </section>

      <section className="resources-page__list section-shell pt-0" aria-label="Downloadable resources">
        <div className="resources-page__list-inner section-shell__inner grid grid-cols-1 gap-6 md:grid-cols-2">
          {resources.map(({ title, description, href, badge }) => (
            <article key={title} className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
              <p className="mb-3 inline-flex rounded-full bg-[#271a08] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ffe2af]">
                {badge}
              </p>
              <h2 className="mb-3">{title}</h2>
              <p className="text-[#d9d9d9]">{description}</p>
              <a className="cta-gold mt-6 inline-flex" href={href} download>
                Download file
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="resources-page__cta section-shell pt-0" aria-labelledby="resources-cta-title">
        <div className="resources-page__cta-inner section-shell__inner rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8 md:p-10">
          <h2 id="resources-cta-title" className="mb-4">Need a custom version?</h2>
          <p className="type-22 max-w-3xl text-[#d9d9d9]">
            Book a consultation for an organization-specific checklist, policy review, or implementation plan.
          </p>
          <Link to="/booking" className="cta-gold mt-6 inline-flex">
            Book a consultation
          </Link>
        </div>
      </section>
    </main>
  );
}

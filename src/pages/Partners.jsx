import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageMetadata } from '../config/pageMetadata.js';

const partnerGroups = [
  {
    title: 'Community colleges and universities',
    description: 'Good for faculty training, student-facing AI literacy, and curriculum support.',
  },
  {
    title: 'Behavioral health and human services agencies',
    description: 'Good for workflow mapping, policy review, and practical staff training.',
  },
  {
    title: 'Nonprofit coalitions and community networks',
    description: 'Good for group workshops, shared resource development, and public education.',
  },
  {
    title: 'Accessibility and content partners',
    description: 'Good for design review, reading-level control, and inclusive digital delivery.',
  },
  {
    title: 'Privacy and legal reviewers',
    description: 'Good for policy review, consent flows, and data handling questions.',
  },
  {
    title: 'Implementation and hosting partners',
    description: 'Good for website builds, launch support, and ongoing maintenance.',
  },
];

export default function Partners() {
  useEffect(() => {
    setPageMetadata({
      title: 'Partners and Collaborators',
      description: 'Explore the kinds of partners and collaborators that fit 60 Watts of Clarity projects.',
      path: '/partners',
    });
  }, []);

  return (
    <main id="main-content" className="partners-page site-main">
      <section className="partners-page__hero section-shell" aria-labelledby="partners-heading">
        <div className="partners-page__hero-inner section-shell__inner">
          <p className="inline-flex rounded-full border border-[#2ec4b6] px-4 py-2 text-[#2ec4b6]">Partners and collaborators</p>
          <h1 id="partners-heading" className="mt-6 max-w-4xl">
            The best projects include the right collaborators.
          </h1>
          <p className="type-24 mt-4 max-w-3xl text-[#d9d9d9]">
            We work well with teams that need practical AI guidance, accessible websites, and clear training.
          </p>
        </div>
      </section>

      <section className="partners-page__grid section-shell pt-0" aria-label="Partner types">
        <div className="partners-page__grid-inner section-shell__inner grid grid-cols-1 gap-6 md:grid-cols-2">
          {partnerGroups.map(({ title, description }) => (
            <article key={title} className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
              <h2 className="mb-3">{title}</h2>
              <p className="text-[#d9d9d9]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partners-page__cta section-shell pt-0" aria-labelledby="partners-cta-title">
        <div className="partners-page__cta-inner section-shell__inner rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8 md:p-10">
          <h2 id="partners-cta-title" className="mb-4">Need an introduction or referral plan?</h2>
          <p className="type-22 max-w-3xl text-[#d9d9d9]">
            Use the booking page to describe the collaboration, audience, and timeline. We will respond with a clear next step.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/booking" className="cta-gold inline-flex">
              Book a consultation
            </Link>
            <Link to="/resources" className="cta-outline inline-flex">
              View resources
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

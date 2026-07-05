'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { setPageMetadata } from '../config/pageMetadata.js';

const workshopTopics = [
  'AI basics for social work teams',
  'Ethics, bias, and equity in AI',
  'Faculty integration and curriculum support',
  'Policy and readiness planning',
  'Practical demos for staff and students',
];

export default function KeynotesWorkshops() {
  useEffect(() => {
    setPageMetadata({
      title: 'Keynotes and Workshops',
      description: 'Book keynotes, workshops, faculty sessions, and organizational AI training with clear next steps and consultation support.',
      path: '/services/keynotes-workshops',
    });
  }, []);

  return (
    <main id="main-content" className="workshops-page site-main">
      <section className="workshops-page__hero section-shell" aria-labelledby="workshops-heading">
        <div className="workshops-page__hero-inner section-shell__inner">
          <p className="inline-flex rounded-full border border-[#2ec4b6] px-4 py-2 text-[#2ec4b6]">Keynotes and workshops</p>
          <h1 id="workshops-heading" className="mt-6 max-w-4xl">
            Clear, practical sessions for teams, classrooms, and conferences.
          </h1>
          <p className="type-24 mt-4 max-w-3xl text-[#d9d9d9]">
            We design talks and workshops that help people understand AI, ask better questions, and leave with one next step.
          </p>
        </div>
      </section>

      <section className="workshops-page__topics section-shell pt-0" aria-labelledby="workshops-topics-title">
        <div className="workshops-page__topics-inner section-shell__inner grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
            <h2 id="workshops-topics-title" className="mb-4">Common topics</h2>
            <ul className="flex flex-col gap-3">
              {workshopTopics.map((topic) => (
                <li key={topic} className="flex gap-3 text-[#d9d9d9]">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#2ec4b6]" />
                  {topic}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
            <h2 className="mb-4">Faculty and organizational support</h2>
            <p className="text-[#d9d9d9]">
              We also support faculty integration, staff onboarding, and follow-up planning so the session leads to action.
            </p>
            <div className="mt-6 rounded-xl border border-[#2f2f2f] bg-[#050505] p-4 text-[#f2f2f2]">
              Pricing: custom quote after a free consultation
            </div>
          </article>
        </div>
      </section>

      <section className="workshops-page__cta section-shell pt-0" aria-labelledby="workshops-cta-title">
        <div className="workshops-page__cta-inner section-shell__inner rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8 md:p-10">
          <h2 id="workshops-cta-title" className="mb-4">Plan a session that fits your audience.</h2>
          <p className="type-22 max-w-3xl text-[#d9d9d9]">
            Use the booking page to tell us the audience, goals, and timing. We will follow up with a simple plan.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/booking" className="cta-gold inline-flex">
              Book a consultation
            </Link>
            <Link href="/partners" className="cta-outline inline-flex">
              See collaborator types
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

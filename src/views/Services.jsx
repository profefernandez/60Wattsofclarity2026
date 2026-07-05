'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { setPageMetadata } from '../config/pageMetadata.js';

const serviceCards = [
  {
    to: '/services/learning-ai',
    title: 'Learning AI',
    price: '$60 for 60 minutes',
    copy: 'A focused lesson for one person or a small team. Social AI sessions are $30 for 30 minutes.',
  },
  {
    to: '/services/website-development',
    title: 'Website Development',
    price: 'From $500 + $35/month hosting',
    copy: 'Accessible, responsive websites with clear copy and a single conversion path.',
  },
  {
    to: '/services/keynotes-workshops',
    title: 'Keynotes and Workshops',
    price: 'Custom quote after consultation',
    copy: 'Talks and training for agencies, classrooms, and conferences. Faculty integration support available.',
  },
  {
    to: '/services/case-studies',
    title: 'Case Studies',
    price: 'Project examples',
    copy: 'Short outcome summaries that show how the work is scoped, built, and measured.',
  },
];

export default function Services() {
  useEffect(() => {
    setPageMetadata({
      title: 'Services',
      description: 'Explore AI lessons, website development, workshops, and case studies from 60 Watts of Clarity.',
      path: '/services',
    });
  }, []);

  return (
    <main id="main-content" className="services-page site-main">
      <section className="services-page__hero section-shell" aria-labelledby="services-hero-title">
        <div className="services-page__hero-inner section-shell__inner">
          <p className="inline-flex rounded-full border border-[#2ec4b6] px-4 py-2 text-[#2ec4b6]">Services</p>
          <h1 id="services-hero-title" className="mt-6 max-w-4xl">
            Practical services with clear pricing and a direct next step.
          </h1>
          <p className="type-24 mt-4 max-w-3xl text-[#d9d9d9]">
            Choose a service below, or start with a free consultation if you want help deciding.
          </p>
        </div>
      </section>

      <section className="services-page__grid section-shell pt-0" aria-label="Service cards">
        <div className="services-page__grid-inner section-shell__inner grid grid-cols-1 gap-6 md:grid-cols-2">
          {serviceCards.map(({ to, title, price, copy }) => (
            <Link key={title} href={to} className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8 hover:border-[#ffb300] transition-colors">
              <p className="text-[#ffb300] font-bold">{price}</p>
              <h2 className="mt-3 mb-3">{title}</h2>
              <p className="text-[#d9d9d9]">{copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="services-page__cta section-shell pt-0" aria-labelledby="services-cta-title">
        <div className="services-page__cta-inner section-shell__inner rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8 md:p-10">
          <h2 id="services-cta-title" className="mb-4">Need a recommendation?</h2>
          <p className="type-22 max-w-3xl text-[#d9d9d9]">
            Use the booking page to tell us what you need, and we will point you to the right service.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/booking" className="cta-gold inline-flex">
              Book a consultation
            </Link>
            <Link href="/resources" className="cta-outline inline-flex">
              View downloads
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

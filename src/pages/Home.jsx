import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AiModuleGrid from '../components/AiModuleGrid.jsx';
import { setPageMetadata } from '../config/pageMetadata.js';
import heroPortrait from '../assets/hero.png';

const trustSignals = [
  'Human-centered AI approach',
  'Social-work ethics alignment',
  'Fast-start consultations within 72 hours',
];

const testimonials = [
  {
    quote: 'Our team moved from confusion to implementation in weeks, not months.',
    attribution: 'Director, Community Services Organization',
  },
  {
    quote: 'The AI foundation sessions were practical, ethical, and immediately useful.',
    attribution: 'Clinical Social Work Supervisor',
  },
];

const upcomingEvents = [
  {
    label: 'Next workshop',
    title: 'Ethical AI for Social Workers',
    details: 'In-person and virtual dates can be added here.',
  },
  {
    label: 'Where I am going',
    title: 'Conferences, trainings, and community events',
    details: 'Use this area to list the next places you will be speaking or teaching.',
  },
  {
    label: 'What I am doing',
    title: 'Workshops, faculty sessions, and consultations',
    details: 'Keep the section current so visitors know what is coming up next.',
  },
];

const offers = [
  {
    title: '60-minute AI lesson',
    price: '$60',
    detail: 'A live, practical session for one person or a small team.',
    link: '/services/learning-ai',
  },
  {
    title: '30-minute social AI session',
    price: '$30',
    detail: 'A shorter session for one question or one workflow.',
    link: '/services/learning-ai',
  },
  {
    title: 'Website development',
    price: 'From $500',
    detail: 'A responsive website with hosting at $35/month.',
    link: '/services/website-development',
  },
  {
    title: 'Free AI consultation',
    price: 'Free',
    detail: 'A short call to clarify your goals and next step.',
    link: '/booking',
  },
];

const processSteps = [
  {
    step: 'Learn',
    title: 'Build AI literacy',
    detail: 'Start with a lesson or consultation to understand the tools and the risks.',
  },
  {
    step: 'Build',
    title: 'Create the right system',
    detail: 'Use the right mix of training, websites, and consultation for your goals.',
  },
  {
    step: 'Deploy',
    title: 'Put it into practice',
    detail: 'Launch with a plan for usability, ethics, privacy, and support.',
  },
];

export default function Home() {
  useEffect(() => {
    setPageMetadata({
      title: 'AI training, websites, and consultation',
      description: '60 Watts of Clarity helps social work teams learn AI, build websites, and book practical consultations.',
      path: '/',
    });
  }, []);

  return (
    <main id="main-content" className="home-page site-main">
      {/* Hero conversion path with the three required primary actions. */}
      <section className="home-page__hero section-shell" aria-labelledby="home-hero-title">
        <div className="home-page__hero-inner section-shell__inner flex flex-col gap-8 lg:gap-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2ec4b6] text-[#2ec4b6] w-fit">
            Trusted AI Guidance for Human Services
          </div>

          <h1 id="home-hero-title" className="max-w-5xl">
            60 Watts of Clarity is all you need.
          </h1>

          <p className="type-24 max-w-4xl text-[#f2f2f2]">
            Practical AI training, accessible websites, and direct consultation for social work teams.
          </p>

          <div className="hero-cta-grid grid grid-cols-1 gap-4 w-full">
            <Link
              to="/learn-ai"
              className="cta-gold text-center type-20"
            >
              I want to learn AI foundations
            </Link>
            <Link
              to="/services/website-development"
              className="cta-gold text-center type-20"
            >
              I need to build a website
            </Link>
            <Link
              to="/booking"
              className="cta-gold text-center type-20"
            >
              I need an AI Consultation
            </Link>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-label="Trust signals">
            {trustSignals.map((signal) => (
              <li key={signal} className="rounded-2xl border border-[#2f2f2f] bg-[#121212] px-4 py-3 text-[#f5f5f5]">
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-page__offers section-shell pt-0" aria-labelledby="home-offers-title">
        <div className="home-page__offers-inner section-shell__inner">
          <h2 id="home-offers-title" className="mb-4">Starting points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {offers.map(({ title, price, detail, link }) => (
              <Link key={title} to={link} className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-6 hover:border-[#ffb300] transition-colors">
                <p className="text-[#ffb300] font-bold text-lg">{price}</p>
                <h3 className="mt-3 mb-2 text-xl">{title}</h3>
                <p className="text-[#d9d9d9]">{detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-page__process section-shell pt-0" aria-labelledby="home-process-title">
        <div className="home-page__process-inner section-shell__inner">
          <h2 id="home-process-title" className="mb-4">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {processSteps.map(({ step, title, detail }) => (
              <article key={step} className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-6">
                <p className="text-[#ffb300] font-bold text-sm uppercase tracking-wider">{step}</p>
                <h3 className="mt-3 mb-2 text-xl">{title}</h3>
                <p className="text-[#d9d9d9]">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-page__conversion section-shell" aria-labelledby="home-conversion-title">
        <div className="home-page__conversion-inner section-shell__inner grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
            <h2 id="home-conversion-title" className="mb-4">Clear conversion pathways</h2>
            <p className="type-22 text-[#dddddd] mb-6">
              Every section keeps one primary next step to minimize distraction and improve conversion quality.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/booking" className="cta-gold">Book Consultation</Link>
              <Link to="/case-studies" className="cta-outline">See Outcomes</Link>
            </div>
          </article>

          <article className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
            <h2 className="mb-4">Testimonials</h2>
            <div className="flex flex-col gap-4">
              {testimonials.map(({ quote, attribution }) => (
                <blockquote key={quote} className="border-l-4 border-[#2ec4b6] pl-4">
                  <p className="type-20">{quote}</p>
                  <footer className="text-[#d9d9d9] mt-2">— {attribution}</footer>
                </blockquote>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="home-page__bio section-shell pt-0" aria-labelledby="home-bio-title">
        <div className="home-page__bio-inner section-shell__inner grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
          <figure className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-4">
            <img
              src={heroPortrait}
              alt="Portrait of Jason, a licensed social worker and human-centered AI consultant"
              className="w-full h-auto rounded-xl object-cover"
              loading="lazy"
            />
          </figure>

          <article className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
            <p className="inline-flex rounded-full border border-[#2ec4b6] px-4 py-2 text-[#2ec4b6]">Bio</p>
            <h2 id="home-bio-title" className="mt-6 mb-4">Licensed social worker. Human-centered AI guide.</h2>
            <p className="type-22 text-[#dddddd] mb-4">
              60 Watts of Clarity is built for people who need practical AI guidance without losing sight of ethics, accessibility, and real-world human services work.
            </p>
            <p className="text-[#d9d9d9]">
              The work combines licensed social work expertise, plain-language teaching, and careful implementation support so teams can move forward with confidence.
            </p>
          </article>
        </div>
      </section>

      <section className="home-page__newsletter section-shell pt-0" aria-labelledby="home-newsletter-title">
        <div className="home-page__newsletter-inner section-shell__inner grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
            <p className="inline-flex rounded-full border border-[#2ec4b6] px-4 py-2 text-[#2ec4b6]">Newsletter</p>
            <h2 id="home-newsletter-title" className="mt-6 mb-4">Ethical AI for Social Workers</h2>
            <p className="type-22 text-[#dddddd] mb-4">
              Join the Substack for short, practical notes on AI, ethics, and social work practice. The newsletter is always free, and a $5 monthly donation is available if you want to support it.
            </p>
            <p className="text-[#d9d9d9]">
              Subscribe below or open the newsletter in a new tab if you prefer.
            </p>
          </article>

          <div className="rounded-2xl border border-[#2f2f2f] bg-white overflow-hidden">
            <iframe
              title="Subscribe to Ethical AI for Social Workers on Substack"
              src="https://60wattsofclarity.substack.com/embed"
              width="100%"
              height="420"
              frameBorder="0"
              scrolling="no"
              className="block w-full min-h-[420px]"
            />
          </div>
        </div>
      </section>

      <section className="home-page__events section-shell pt-0" aria-labelledby="home-events-title">
        <div className="home-page__events-inner section-shell__inner">
          <div className="flex flex-col gap-4 mb-6">
            <p className="inline-flex rounded-full border border-[#2ec4b6] px-4 py-2 text-[#2ec4b6] w-fit">Events</p>
            <h2 id="home-events-title">Where I am going and what is coming up</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map(({ label, title, details }) => (
              <article key={title} className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-6">
                <p className="text-[#ffb300] font-bold text-sm uppercase tracking-wider">{label}</p>
                <h3 className="mt-3 mb-2 text-xl">{title}</h3>
                <p className="text-[#d9d9d9]">{details}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI integration placeholders are explicit extension points for future modules. */}
      <section className="home-page__ai-hooks section-shell" aria-labelledby="home-ai-hooks-title">
        <div className="home-page__ai-hooks-inner section-shell__inner">
          <h2 id="home-ai-hooks-title" className="mb-4">AI integration hooks</h2>
          <p className="type-22 text-[#dddddd] mb-6">
            These modules are scaffold slots for non-chatbot AI interactions.
          </p>
          {/* AI modules stay isolated in their own component so future features can slot in without reworking page layout. */}
          <AiModuleGrid />
        </div>
      </section>
    </main>
  );
}

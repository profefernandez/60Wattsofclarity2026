import { Link } from 'react-router-dom';
import AiModuleGrid from '../components/AiModuleGrid.jsx';

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

export default function Home() {
  return (
    <main id="main-content" className="home-page site-main">
      {/* Hero conversion path with the three required primary actions. */}
      <section className="home-page__hero section-shell" aria-labelledby="home-hero-title">
        <div className="home-page__hero-inner section-shell__inner flex flex-col gap-8 lg:gap-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2ec4b6] text-[#2ec4b6] w-fit">
            Trusted AI Guidance for Human Services
          </div>

          <h1 id="home-hero-title" className="max-w-5xl">
            We help social work teams learn AI foundations, build digital platforms, and deploy ethical AI consulting solutions.
          </h1>

          <p className="type-24 max-w-4xl text-[#f2f2f2]">
            Conversion-focused support for organizations that need practical outcomes without sacrificing accessibility, privacy, or trust.
          </p>

          <div className="hero-cta-grid grid grid-cols-1 gap-4 w-full">
            <Link
              to="/learn-ai"
              className="cta-gold text-center type-20"
            >
              I want to learn AI foundations
            </Link>
            <Link
              to="/services"
              className="cta-gold text-center type-20"
            >
              I need to build a website
            </Link>
            <Link
              to="/contact"
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

      <section className="home-page__conversion section-shell" aria-labelledby="home-conversion-title">
        <div className="home-page__conversion-inner section-shell__inner grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-8">
            <h2 id="home-conversion-title" className="mb-4">Clear conversion pathways</h2>
            <p className="type-22 text-[#dddddd] mb-6">
              Every section keeps one primary next step to minimize distraction and improve conversion quality.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="cta-gold">Book Consultation</Link>
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

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageMetadata } from '../config/pageMetadata.js';

const sessions = [
  {
    price: '$60',
    duration: '60 Minutes',
    label: 'Deep Dive',
    highlight: true,
    icon: '🔦',
    desc: 'A focused lesson for one person or a small team. Use it to learn a tool, review a workflow, or map the next step.',
    includes: [
      'Personalized agenda based on your goal',
      'Live guidance and practical examples',
      'Short summary with next steps',
      'Recording available on request',
    ],
  },
  {
    price: '$30',
    duration: '30 Minutes',
    label: 'Quick Clarity',
    highlight: false,
    icon: '⚡',
    desc: 'A short session for one question, one tool, or one workflow.',
    includes: [
      'One-topic focus',
      'Direct answers',
      'Quick follow-up summary',
    ],
  },
];

const topics = [
  { icon: '🤖', label: 'What is AI & how does it work?' },
  { icon: '🛡️', label: 'AI ethics & social work values' },
  { icon: '📊', label: 'Data literacy & AI readiness' },
  { icon: '✍️', label: 'AI writing tools for case notes & reports' },
  { icon: '🔍', label: 'Evaluating AI tools for your agency' },
  { icon: '🌱', label: 'Building your first AI-assisted workflow' },
  { icon: '⚖️', label: 'Bias, fairness & equity in AI' },
  { icon: '📱', label: 'AI tools for community outreach' },
  { icon: '🎯', label: 'Prompt engineering for social workers' },
];

const faqs = [
  {
    q: 'Do I need a technical background to book a session?',
    a: 'Absolutely not. Our sessions are designed for social workers, community members, and human services professionals of all technical backgrounds. We start where you are.',
  },
  {
    q: 'How do I schedule my session?',
    a: 'After booking, you will receive a scheduling link to choose a time that works for you. Sessions are conducted via video call.',
  },
  {
    q: 'What do I need to bring or prepare?',
    a: 'Just show up with your questions and curiosity. For the 60-minute session, you can optionally share a challenge you are working on in advance so we can tailor the session.',
  },
  {
    q: 'Are group or team sessions available?',
    a: 'Yes! We offer custom group training for agencies and teams. Contact us for pricing and scheduling options.',
  },
  {
    q: 'What platforms do you use for the sessions?',
    a: 'We primarily use Zoom or Google Meet. Links are sent upon booking confirmation.',
  },
];

export default function LearnAI() {
  useEffect(() => {
    setPageMetadata({
      title: 'Learning AI',
      description: '$60 for a 60-minute AI lesson and $30 for a 30-minute social AI session from 60 Watts of Clarity.',
      path: '/services/learning-ai',
    });
  }, []);

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main id="main-content" className="learn-ai-page site-main">
      <section className="learn-ai-page__hero section-shell w-full bg-[#1e3a8a] text-white py-20 md:py-28" aria-labelledby="learn-ai-hero-title">
        <div className="learn-ai-page__hero-inner section-shell__inner max-w-7xl mx-auto px-6 text-center">
          <h1 id="learn-ai-hero-title" className="text-white mb-6 max-w-3xl mx-auto">
            Learn AI for social work and human services.
          </h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto leading-relaxed">
            Simple pricing, plain language, and practical examples.
          </p>
        </div>
      </section>

      <section className="learn-ai-page__pricing section-shell w-full bg-white py-20 md:py-28" aria-labelledby="learn-ai-pricing-title">
        <div className="learn-ai-page__pricing-inner section-shell__inner max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 id="learn-ai-pricing-title" className="text-[#1e3a8a] mb-4">Choose Your Session</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Start with a free AI consultation if you want help choosing the right option.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {sessions.map(({ price, duration, label, highlight, icon, desc, includes }) => (
              <div
                key={duration}
                className={`flex-1 max-w-md rounded-3xl p-10 flex flex-col gap-6 border-2 shadow-lg ${
                  highlight
                    ? 'border-[#d97706] bg-[#d97706]/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {highlight && (
                  <div className="self-start px-3 py-1 rounded-full bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="text-5xl">{icon}</div>
                <div>
                  <div className="text-7xl font-extrabold text-[#1e3a8a] leading-none">{price}</div>
                  <div className="text-2xl font-bold text-gray-700 mt-1">{duration}</div>
                  <div className="text-lg text-[#0f766e] font-semibold mt-1">{label}</div>
                </div>
                <p className="text-gray-600 text-base leading-relaxed">{desc}</p>
                <ul className="flex flex-col gap-3 flex-1">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#0f766e] flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className={`mt-4 block text-center px-8 py-4 rounded-full font-bold text-lg transition-colors ${
                    highlight
                      ? 'bg-[#d97706] text-white hover:bg-[#b45309]'
                      : 'bg-[#1e3a8a] text-white hover:bg-[#1e40af]'
                  } shadow-md`}
                >
                  Book {duration} Session
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-ai-page__topics section-shell w-full bg-[#f0f9ff] py-20" aria-labelledby="learn-ai-topics-title">
        <div className="learn-ai-page__topics-inner section-shell__inner max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 id="learn-ai-topics-title" className="text-[#1e3a8a] mb-4">Topics We Cover</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Sessions are fully customizable. Here are common topics:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl flex-shrink-0">{icon}</span>
                <span className="text-gray-800 font-medium text-base">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-ai-page__faq section-shell w-full bg-white py-20" aria-labelledby="learn-ai-faq-title">
        <div className="learn-ai-page__faq-inner section-shell__inner max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 id="learn-ai-faq-title" className="text-[#1e3a8a] mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }, i) => (
              <div
                key={q}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-8 py-6 text-left font-bold text-gray-900 text-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`learn-ai-faq-panel-${i}`}
                  id={`learn-ai-faq-trigger-${i}`}
                >
                  <span>{q}</span>
                  <span className={`flex-shrink-0 ml-4 text-[#1e3a8a] transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    id={`learn-ai-faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`learn-ai-faq-trigger-${i}`}
                    className="px-8 pb-6 text-gray-600 text-base leading-relaxed border-t border-gray-100"
                  >
                    <p className="mt-4">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-ai-page__cta section-shell w-full bg-[#0f766e] text-white py-20" aria-labelledby="learn-ai-cta-title">
        <div className="learn-ai-page__cta-inner section-shell__inner max-w-4xl mx-auto px-6 text-center">
          <h2 id="learn-ai-cta-title" className="text-white mb-6">Your AI Journey Starts Here</h2>
          <p className="text-teal-100 text-lg mb-10 max-w-xl mx-auto">
            Book a free consultation first if you want help choosing between lessons, consultation, or training.
          </p>
          <Link
            to="/booking"
            className="inline-block px-10 py-4 rounded-full bg-[#d97706] text-white font-bold text-lg hover:bg-[#b45309] transition-colors shadow-lg"
          >
            Book a consultation →
          </Link>
        </div>
      </section>
    </main>
  );
}

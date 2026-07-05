import { Link } from 'react-router-dom';

const services = [
  {
    icon: '🧠',
    title: 'AI Education & Training',
    desc: 'Customized workshops and 1-on-1 sessions that teach social workers and human services professionals how to understand, use, and evaluate AI tools in their practice.',
    features: ['Beginner-friendly curriculum', 'Hands-on tool exploration', 'Ethics & bias awareness', 'Case-based learning'],
  },
  {
    icon: '🛠️',
    title: 'AI Tool Building',
    desc: 'We co-design practical AI applications tailored to the real challenges faced by social service agencies — from intake automation to community resource matching.',
    features: ['Needs assessment', 'Prototype development', 'Staff training on new tools', 'Iterative refinement'],
  },
  {
    icon: '🚀',
    title: 'AI Deployment & Integration',
    desc: 'Launching AI is only the beginning. We guide organizations through responsible deployment and sustainable integration into existing workflows.',
    features: ['Technical implementation', 'Workflow integration', 'Ongoing monitoring', 'Impact measurement'],
  },
  {
    icon: '🌐',
    title: 'Community AI Literacy',
    desc: 'Equipping community members with the knowledge to understand AI systems that affect their lives — promoting transparency, advocacy, and informed participation.',
    features: ['Community workshops', 'Plain-language explainers', 'Advocacy frameworks', 'Digital equity focus'],
  },
  {
    icon: '📋',
    title: 'Organizational AI Strategy',
    desc: 'Strategic consulting for social work agencies ready to develop a responsible, mission-aligned approach to adopting AI technologies.',
    features: ['Readiness assessment', 'Policy development', 'Staff buy-in planning', 'Vendor evaluation'],
  },
  {
    icon: '🔍',
    title: 'AI Ethics & Equity Review',
    desc: 'Critical analysis of existing or proposed AI systems to identify bias, fairness concerns, and alignment with social work values and professional ethics.',
    features: ['Bias auditing', 'NASW ethics alignment', 'Equity impact analysis', 'Remediation roadmap'],
  },
];

export default function Services() {
  return (
    <main id="main-content" className="services-page site-main">
      <section className="services-page__hero section-shell w-full bg-[#1e3a8a] text-white py-20 md:py-28" aria-labelledby="services-hero-title">
        <div className="services-page__hero-inner section-shell__inner max-w-7xl mx-auto px-6 text-center">
          <h1 id="services-hero-title" className="text-white mb-6 max-w-3xl mx-auto">
            Services That Drive Real Change
          </h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto leading-relaxed">
            From AI literacy to full deployment, we offer end-to-end support for social workers and human services organizations ready to harness the power of artificial intelligence.
          </p>
        </div>
      </section>

      <section className="services-page__grid section-shell w-full bg-white py-20 md:py-28" aria-label="Service offerings">
        <div className="services-page__grid-inner section-shell__inner max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ icon, title, desc, features }) => (
              <article
                key={title}
                className="services-page__card flex flex-col gap-5 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white group"
              >
                <div className="text-5xl">{icon}</div>
                <h3 className="text-[#1e3a8a] text-2xl group-hover:text-[#0f766e] transition-colors">
                  {title}
                </h3>
                <p className="text-gray-600 text-base flex-1">{desc}</p>
                <ul className="flex flex-col gap-2 mt-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-4 h-4 rounded-full bg-[#d97706] flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-page__cta section-shell w-full bg-[#f0f9ff] py-20" aria-labelledby="services-cta-title">
        <div className="services-page__cta-inner section-shell__inner max-w-4xl mx-auto px-6 text-center">
          <h2 id="services-cta-title" className="text-[#1e3a8a] mb-6">Ready to Transform Your Practice?</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Whether you are an individual social worker or a large agency, we have a path forward for you. Let us build it together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 rounded-full bg-[#1e3a8a] text-white font-bold text-lg hover:bg-[#1e40af] transition-colors shadow-lg">
              Contact Us
            </Link>
            <Link to="/learn-ai" className="px-8 py-4 rounded-full bg-[#d97706] text-white font-bold text-lg hover:bg-[#b45309] transition-colors shadow-lg">
              Book a Learn AI Session
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { setPageMetadata } from '../config/pageMetadata.js';

const caseStudies = [
  {
    tag: 'Non-Profit Agency',
    title: 'Automating Intake Screening for a Regional Family Services Agency',
    challenge: 'Intake paperwork was slowing response times.',
    solution: 'We built an AI-assisted screening step that sorted referrals by urgency.',
    outcome: 'Intake processing time dropped 68%, and average wait time moved from 14 days to 4 days.',
    icon: '🏠',
    color: 'bg-blue-50 border-blue-200',
    tagColor: 'bg-[#1e3a8a] text-white',
  },
  {
    tag: 'Community Health',
    title: 'AI Literacy Program for Community Health Workers',
    challenge: 'Community health workers wanted a clearer way to talk about AI tools.',
    solution: 'We delivered a 6-session AI literacy curriculum with plain-language examples.',
    outcome: '92% of participants reported more confidence, and 3 additional networks adopted the curriculum.',
    icon: '🏥',
    color: 'bg-teal-50 border-teal-200',
    tagColor: 'bg-[#0f766e] text-white',
  },
  {
    tag: 'Government Agency',
    title: 'Equity Audit of a Predictive Risk Assessment Tool',
    challenge: 'A county child welfare agency wanted a review of a predictive risk tool.',
    solution: 'We ran a bias review, ethics review, and community impact check.',
    outcome: 'We identified three bias indicators and delivered a remediation roadmap before deployment.',
    icon: '⚖️',
    color: 'bg-amber-50 border-amber-200',
    tagColor: 'bg-[#d97706] text-white',
  },
  {
    tag: 'Education',
    title: 'Building an AI Mentor Matching System for Social Work Students',
    challenge: 'Field placement matching was manual and inconsistent.',
    solution: 'We built a recommendation system based on goals, practice areas, and geography.',
    outcome: 'First-round acceptance rose from 54% to 89%, and coordinators saved about 15 hours per semester.',
    icon: '🎓',
    color: 'bg-purple-50 border-purple-200',
    tagColor: 'bg-purple-700 text-white',
  },
];

export default function CaseStudies() {
  useEffect(() => {
    setPageMetadata({
      title: 'Case Studies',
      description: 'Read short case study summaries that show how 60 Watts of Clarity scopes and delivers AI projects.',
      path: '/services/case-studies',
    });
  }, []);

  return (
    <main id="main-content" className="case-studies-page site-main">
      <section className="case-studies-page__hero section-shell w-full bg-[#1e3a8a] text-white py-20 md:py-28" aria-labelledby="case-studies-hero-title">
        <div className="case-studies-page__hero-inner section-shell__inner max-w-7xl mx-auto px-6 text-center">
          <h1 id="case-studies-hero-title" className="text-white mb-6 max-w-3xl mx-auto">
            Case studies with clear scope and measurable outcomes.
          </h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto leading-relaxed">
            These examples show the kind of work we do and the kind of results that matter.
          </p>
        </div>
      </section>

      <section className="case-studies-page__list section-shell w-full bg-white py-20 md:py-28" aria-label="Case study outcomes">
        <div className="case-studies-page__list-inner section-shell__inner max-w-6xl mx-auto px-6 flex flex-col gap-16">
          {caseStudies.map(({ tag, title, challenge, solution, outcome, icon, color, tagColor }) => (
            <article
              key={title}
              className={`rounded-2xl border-2 ${color} overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start gap-6 mb-6">
                  <div className="text-5xl flex-shrink-0">{icon}</div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${tagColor}`}>
                      {tag}
                    </span>
                    <h2 className="text-[#1e3a8a] leading-tight">{title}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div>
                    <h4 className="text-gray-900 font-bold text-lg mb-2 uppercase tracking-wide text-sm">Challenge</h4>
                    <p className="text-gray-700 text-base leading-relaxed">{challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-lg mb-2 uppercase tracking-wide text-sm">Solution</h4>
                    <p className="text-gray-700 text-base leading-relaxed">{solution}</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-6 border border-current/10">
                    <h4 className="text-gray-900 font-bold text-lg mb-2 uppercase tracking-wide text-sm">Outcome</h4>
                    <p className="text-gray-800 text-base leading-relaxed font-medium">{outcome}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-studies-page__cta section-shell w-full bg-[#0f766e] text-white py-20" aria-labelledby="case-studies-cta-title">
        <div className="case-studies-page__cta-inner section-shell__inner max-w-4xl mx-auto px-6 text-center">
         <h2 id="case-studies-cta-title" className="text-white mb-6">Want a project scoped like this?</h2>
          <p className="text-teal-100 text-lg mb-10 max-w-xl mx-auto">
           Book a consultation and we will discuss your goals, audience, and next step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link to="/booking" className="px-8 py-4 rounded-full bg-white text-[#0f766e] font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg">
             Book a consultation
            </Link>
            <Link to="/services" className="px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-colors">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

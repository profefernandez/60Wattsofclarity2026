import { Link } from 'react-router-dom';

const caseStudies = [
  {
    tag: 'Non-Profit Agency',
    title: 'Automating Intake Screening for a Regional Family Services Agency',
    challenge: 'A multi-county family services agency was overwhelmed with intake paperwork, causing delays of up to two weeks in connecting families to critical services.',
    solution: '60 Watts of Clarity designed an AI-assisted intake screening tool that pre-sorted referrals by urgency and matched clients to appropriate service tiers automatically.',
    outcome: '68% reduction in intake processing time, enabling case workers to focus on high-complexity families and cutting average wait time from 14 days to 4 days.',
    icon: '🏠',
    color: 'bg-blue-50 border-blue-200',
    tagColor: 'bg-[#1e3a8a] text-white',
  },
  {
    tag: 'Community Health',
    title: 'AI Literacy Program for Community Health Workers',
    challenge: 'Community health workers lacked confidence in understanding AI tools increasingly being used in their clinics and felt unprepared to explain these tools to patients.',
    solution: 'We delivered a 6-session AI literacy curriculum co-designed with CHWs, focusing on real-world AI they encounter, plain-language explanations, and advocacy skills.',
    outcome: '92% of participants reported increased confidence in discussing AI with clients; the curriculum was adopted by 3 additional health networks in the region.',
    icon: '🏥',
    color: 'bg-teal-50 border-teal-200',
    tagColor: 'bg-[#0f766e] text-white',
  },
  {
    tag: 'Government Agency',
    title: 'Equity Audit of a Predictive Risk Assessment Tool',
    challenge: 'A county child welfare agency wanted to adopt a commercial predictive risk assessment tool but had concerns about potential racial and socioeconomic bias.',
    solution: '60 Watts of Clarity conducted a comprehensive equity review including algorithmic bias analysis, NASW ethics alignment assessment, and community impact evaluation.',
    outcome: 'Identified three significant bias indicators; provided a remediation roadmap that the vendor implemented before deployment, protecting thousands of families from discriminatory outcomes.',
    icon: '⚖️',
    color: 'bg-amber-50 border-amber-200',
    tagColor: 'bg-[#d97706] text-white',
  },
  {
    tag: 'Education',
    title: 'Building an AI Mentor Matching System for Social Work Students',
    challenge: 'A school of social work wanted to improve mentor-student matching for field placements — a notoriously time-intensive and inconsistent manual process.',
    solution: 'We built a lightweight AI recommendation system that matched students to field supervisors based on learning goals, practice areas, geography, and DEI factors.',
    outcome: 'First-round match acceptance rate rose from 54% to 89%; field coordinators saved an estimated 15 hours per semester; student satisfaction with placements increased significantly.',
    icon: '🎓',
    color: 'bg-purple-50 border-purple-200',
    tagColor: 'bg-purple-700 text-white',
  },
];

export default function CaseStudies() {
  return (
    <main id="main-content" className="case-studies-page site-main">
      <section className="case-studies-page__hero section-shell w-full bg-[#1e3a8a] text-white py-20 md:py-28" aria-labelledby="case-studies-hero-title">
        <div className="case-studies-page__hero-inner section-shell__inner max-w-7xl mx-auto px-6 text-center">
          <h1 id="case-studies-hero-title" className="text-white mb-6 max-w-3xl mx-auto">
            Real Impact. Real Communities.
          </h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto leading-relaxed">
            See how 60 Watts of Clarity has partnered with organizations across social work and human services to create meaningful, measurable outcomes through AI.
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
          <h2 id="case-studies-cta-title" className="text-white mb-6">Let Us Write Your Success Story</h2>
          <p className="text-teal-100 text-lg mb-10 max-w-xl mx-auto">
            Every organization faces unique challenges. We partner with you to design AI solutions that are ethical, equitable, and built for your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 rounded-full bg-white text-[#0f766e] font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg">
              Start a Conversation
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

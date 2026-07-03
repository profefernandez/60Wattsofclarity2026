import { Link } from 'react-router-dom';

const highlights = [
  {
    icon: '🤝',
    title: 'Community-Centered AI',
    desc: 'We design AI tools with and for social workers and the communities they serve — grounded in real needs, not just technology.',
  },
  {
    icon: '🎓',
    title: 'Learn by Doing',
    desc: 'Hands-on sessions that demystify AI, making it accessible for every skill level from beginner to advanced practitioner.',
  },
  {
    icon: '🚀',
    title: 'From Learning to Deployment',
    desc: 'We walk with you from first concept through live deployment, ensuring sustainable, ethical AI solutions.',
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="w-full bg-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-36 flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d97706]/20 border border-[#d97706]/40 text-[#fbbf24] text-sm font-semibold">
            Social Work &bull; Human Services &bull; AI Innovation
          </div>

          <h1 className="text-white max-w-4xl">
            Empowering Social Workers &amp; Communities with the Power of AI
          </h1>

          <p className="text-blue-200 text-xl max-w-2xl leading-relaxed">
            60 Watts of Clarity is a Social Work &amp; Human Services Agency helping professionals and communities learn, build, and deploy AI — ethically and effectively.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              to="/learn-ai"
              className="px-8 py-4 rounded-full bg-[#d97706] text-white font-bold text-lg hover:bg-[#b45309] transition-colors shadow-lg"
            >
              Start Learning AI
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-[#1e3a8a] transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why 60 Watts */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#1e3a8a] mb-4">Why 60 Watts of Clarity?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We bridge the gap between social work expertise and artificial intelligence, creating real impact for the people who need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-[#f0f9ff]"
              >
                <div className="text-5xl">{icon}</div>
                <h3 className="text-[#1e3a8a] text-2xl">{title}</h3>
                <p className="text-gray-600 text-base">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Special */}
      <section className="w-full bg-[#0f766e] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-8">
          <h2 className="text-white max-w-3xl">Learn AI — On Your Schedule &amp; Budget</h2>
          <p className="text-teal-100 text-lg max-w-xl">
            Our signature 1-on-1 sessions are designed to fit your life. Choose the format that works for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-4 w-full max-w-2xl">
            <div className="flex-1 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-6xl font-extrabold text-[#fbbf24] mb-2">$60</div>
              <div className="text-xl font-bold mb-2">60 Minutes</div>
              <p className="text-teal-100 text-sm">A full deep-dive session — explore tools, build skills, get hands-on with real AI workflows.</p>
            </div>
            <div className="flex-1 bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-6xl font-extrabold text-[#fbbf24] mb-2">$30</div>
              <div className="text-xl font-bold mb-2">30 Minutes</div>
              <p className="text-teal-100 text-sm">A focused sprint session — perfect for specific questions, tool demos, or a quick start.</p>
            </div>
          </div>

          <Link
            to="/learn-ai"
            className="mt-4 px-10 py-4 rounded-full bg-[#d97706] text-white font-bold text-lg hover:bg-[#b45309] transition-colors shadow-lg"
          >
            Book Your Session Now
          </Link>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="w-full bg-[#f0f9ff] py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-[#1e3a8a] mb-6">Our Mission</h2>
          <p className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto">
            We believe AI should amplify the work of social workers, not replace it. Our mission is to make AI education accessible, practical, and deeply human — so that every practitioner has the clarity and confidence to harness technology for good.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/case-studies" className="px-8 py-4 rounded-full bg-[#1e3a8a] text-white font-bold text-lg hover:bg-[#1e40af] transition-colors">
              Read Case Studies
            </Link>
            <Link to="/contact" className="px-8 py-4 rounded-full border-2 border-[#1e3a8a] text-[#1e3a8a] font-bold text-lg hover:bg-[#1e3a8a] hover:text-white transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

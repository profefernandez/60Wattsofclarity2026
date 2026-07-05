import { useState } from 'react';

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'hello@60wattsofclarity.com' },
  { icon: '📅', label: 'Book a Session', value: 'Schedule via our Learn AI page' },
  { icon: '⏰', label: 'Response Time', value: 'Within 1–2 business days' },
];

const interests = [
  'Learn AI (1-on-1 Session)',
  'Agency Training & Workshops',
  'AI Tool Building',
  'AI Ethics & Equity Review',
  'Organizational AI Strategy',
  'Community AI Literacy Program',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a production app this would call an API or form service
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="w-full bg-[#1e3a8a] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-white mb-6 max-w-3xl mx-auto">
            Let&apos;s Connect
          </h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you have a question, a project idea, or just want to learn more — we are here and we would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="text-[#1e3a8a] mb-4 text-3xl">Reach Out</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                We partner with social workers, community organizations, agencies, and schools of social work. No project is too small or too complex — let&apos;s talk.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {contactInfo.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0f9ff] flex items-center justify-center text-2xl flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm uppercase tracking-wide">{label}</div>
                    <div className="text-gray-600 text-base mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-[#f0f9ff] border border-blue-100">
              <div className="text-4xl mb-3">💡</div>
              <h4 className="text-[#1e3a8a] font-bold text-xl mb-2">Looking for a quick start?</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Book a 30-minute Learn AI session for just <strong>$30</strong> and get immediate clarity on your questions.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-6">
                <div className="text-7xl">🌟</div>
                <h2 className="text-[#1e3a8a]">Message Received!</h2>
                <p className="text-gray-600 text-lg max-w-md">
                  Thank you for reaching out to 60 Watts of Clarity. We will be in touch within 1–2 business days. We cannot wait to connect!
                </p>
                <button
                  className="mt-4 px-8 py-3 rounded-full bg-[#1e3a8a] text-white font-bold hover:bg-[#1e40af] transition-colors"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', organization: '', interest: '', message: '' }); }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold text-gray-800 text-sm">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20 outline-none text-gray-900 text-base transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold text-gray-800 text-sm">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20 outline-none text-gray-900 text-base transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="organization" className="font-semibold text-gray-800 text-sm">
                    Organization (optional)
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="Your agency, school, or organization"
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20 outline-none text-gray-900 text-base transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="interest" className="font-semibold text-gray-800 text-sm">
                    I am interested in <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    value={form.interest}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20 outline-none text-gray-900 text-base transition-colors bg-white"
                  >
                    <option value="">Select an option...</option>
                    {interests.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-semibold text-gray-800 text-sm">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals, questions, or how we can help..."
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20 outline-none text-gray-900 text-base transition-colors resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1e3a8a] text-white font-bold text-lg hover:bg-[#1e40af] transition-colors shadow-lg mt-2"
                >
                  Send Message →
                </button>

                <p className="text-gray-400 text-xs text-center">
                  We respect your privacy. Your information will never be sold or shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Values Banner */}
      <section className="w-full bg-[#1e3a8a] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: '🤝', title: 'Collaborative', desc: 'We work with you, not at you.' },
            { icon: '🛡️', title: 'Ethical', desc: 'Grounded in social work values and professional ethics.' },
            { icon: '🌍', title: 'Equitable', desc: 'Committed to justice, access, and community well-being.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <div className="text-5xl">{icon}</div>
              <h3 className="text-white text-2xl">{title}</h3>
              <p className="text-blue-200 text-base">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

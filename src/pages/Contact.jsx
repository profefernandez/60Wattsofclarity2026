import { useEffect, useMemo, useState } from 'react';
import { submitContactForm } from '../api/contactSubmission.js';
import { setPageMetadata } from '../config/pageMetadata.js';
import {
  getClientFingerprint,
  isBlockedEmailDomain,
  isRateLimited,
  normalizeEmail,
  registerSubmission,
  requiresCaptcha,
  sanitizeInput,
} from '../security/contactSecurity.js';

const INTERESTS = [
  'Free AI consultation',
  '60-minute AI lesson ($60)',
  '30-minute social AI session ($30)',
  'Website development (from $500)',
  'Keynote or workshop',
  'Faculty integration support',
];

const MAX_FIELD_LENGTH = {
  fullName: 80,
  email: 160,
  organization: 120,
  interest: 80,
  message: 1200,
  website: 120,
};

const CAPTCHA_PROMPT = 'What is two plus three?';
const CAPTCHA_ANSWER = '5';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form, shouldValidateCaptcha) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!emailPattern.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.interest) errors.interest = 'Select one service area.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  if (shouldValidateCaptcha && form.captcha.trim() !== CAPTCHA_ANSWER) {
    errors.captcha = 'Verification answer is incorrect.';
  }
  return errors;
}

export default function Contact() {
  useEffect(() => {
    setPageMetadata({
      title: 'Booking and consultation',
      description: 'Book a free consultation or request an AI lesson, website project, or workshop from 60 Watts of Clarity.',
      path: '/booking',
    });
  }, []);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    organization: '',
    interest: '',
    message: '',
    website: '',
    captcha: '',
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizedEmail = useMemo(() => normalizeEmail(form.email), [form.email]);
  const domainBlocked = normalizedEmail.length > 3 ? isBlockedEmailDomain(normalizedEmail) : false;
  const fingerprint = useMemo(() => getClientFingerprint(), []);
  const currentlyRateLimited = isRateLimited(fingerprint);
  const shouldShowCaptcha = requiresCaptcha({
    honeypot: form.website.trim().length > 0,
    isRateLimitedResult: currentlyRateLimited,
    domainBlocked,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const maxLength = MAX_FIELD_LENGTH[name];
    const nextValue = name === 'email' ? sanitizeInput(value, maxLength).toLowerCase() : sanitizeInput(value, maxLength);
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setStatusMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.website.trim().length > 0) {
      setStatusMessage('Submission blocked by spam filter.');
      return;
    }

    if (domainBlocked) {
      setStatusMessage('Disposable email domains are not accepted. Please use your organizational or personal email.');
      return;
    }

    if (currentlyRateLimited) {
      setStatusMessage('Too many submissions from this source. Try again in about 10 minutes.');
    }

    const nextErrors = validateForm(form, shouldShowCaptcha);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || currentlyRateLimited) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm(form, {
        source: 'contact-form',
        userAgent: navigator.userAgent,
        fingerprint,
      });
      registerSubmission(fingerprint);
      setSubmitted(true);
      setStatusMessage('Message submitted successfully.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to submit the contact form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="contact-page site-main">
      <section className="contact-page__hero section-shell" aria-labelledby="contact-heading">
        <div className="contact-page__hero-inner section-shell__inner">
          <p className="inline-flex rounded-full border border-[#2ec4b6] px-4 py-2 text-[#2ec4b6]">Booking and consultation</p>
          <h1 id="contact-heading" className="mt-6 max-w-4xl">
            Book a free consultation or choose a service.
          </h1>
          {/* QA reminder: verify zoom/reflow at 200%+ and ensure the heading/order remains logical with assistive tech. */}
          <p className="type-22 max-w-4xl text-[#d9d9d9] mt-4">
            Use this form for AI lessons, website projects, workshops, or organizational consultation. The PHP endpoint handles server-side validation and sends the message through Resend.
          </p>
        </div>
      </section>

      <section className="contact-page__form-section section-shell pt-0" aria-labelledby="contact-form-title">
        <div className="contact-page__form-inner section-shell__inner grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-6 lg:col-span-1">
            <h2 className="type-24 mb-4">What happens next</h2>
            <ol className="flex flex-col gap-4 text-[#dfdfdf]">
              <li>1. We review your request and confirm the right service.</li>
              <li>2. We respond within 1-2 business days.</li>
              <li>3. We send the next step or booking details.</li>
            </ol>
            <p className="security-note mt-6">
              Security controls: honeypot trap, disposable-domain blocklist, fingerprint-based rate limiting, and challenge verification fallback.
            </p>
          </aside>

          <div className="rounded-2xl border border-[#2f2f2f] bg-[#121212] p-6 lg:col-span-2">
            {submitted ? (
              <div role="status" aria-live="polite" className="py-12 text-center">
                <h2 className="mb-3">Message received</h2>
                <p className="text-[#d9d9d9] mb-6">
                  Thanks for contacting 60 Watts of Clarity. We will follow up soon.
                </p>
                <button
                  type="button"
                  className="cta-gold"
                  onClick={() => {
                    setSubmitted(false);
                    setErrors({});
                    setStatusMessage('');
                    setForm({
                      fullName: '',
                      email: '',
                      organization: '',
                      interest: '',
                      message: '',
                      website: '',
                      captcha: '',
                    });
                  }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form flex flex-col gap-5" noValidate>
                <h2 id="contact-form-title" className="type-24">Request a booking</h2>

                {/* QA reminder: test error messaging with keyboard navigation and screen readers after invalid submissions. */}
                {statusMessage && (
                  <p role="alert" className="rounded-xl border border-[#734f1a] bg-[#271a08] px-4 py-3 text-[#ffe2af]">
                    {statusMessage}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    Full name
                    <input
                      className="contact-form__field"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(errors.fullName)}
                    />
                    {errors.fullName && <span className="text-[#ffd2d2] text-sm">{errors.fullName}</span>}
                  </label>

                  <label className="flex flex-col gap-2">
                    Email
                    <input
                      className="contact-form__field"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <span className="text-[#ffd2d2] text-sm">{errors.email}</span>}
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  Organization (optional)
                  <input
                    className="contact-form__field"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    autoComplete="organization"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  Service area
                  <select
                    className="contact-form__select"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(errors.interest)}
                  >
                    <option value="">Select one</option>
                    {INTERESTS.map((interest) => (
                      <option key={interest} value={interest}>{interest}</option>
                    ))}
                  </select>
                  {errors.interest && <span className="text-[#ffd2d2] text-sm">{errors.interest}</span>}
                </label>

                <label className="flex flex-col gap-2">
                  Message
                  <textarea
                    className="contact-form__textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && <span className="text-[#ffd2d2] text-sm">{errors.message}</span>}
                </label>

                {/* Honeypot field for bot trapping. */}
                <label className="visually-hidden" htmlFor="website">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={form.website}
                  onChange={handleChange}
                  className="visually-hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {shouldShowCaptcha && (
                  <label className="flex flex-col gap-2">
                    Verification: {CAPTCHA_PROMPT}
                    <input
                      className="contact-form__field"
                      name="captcha"
                      value={form.captcha}
                      onChange={handleChange}
                      required
                      aria-invalid={Boolean(errors.captcha)}
                    />
                    {errors.captcha && <span className="text-[#ffd2d2] text-sm">{errors.captcha}</span>}
                  </label>
                )}

                <button type="submit" className="cta-gold type-20" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Request booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

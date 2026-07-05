CREATE TABLE IF NOT EXISTS contact_form_submissions (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  interest TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'contact-form',
  user_agent TEXT,
  fingerprint TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_form_submissions_submitted_at_idx
  ON contact_form_submissions (submitted_at DESC);

CREATE INDEX IF NOT EXISTS contact_form_submissions_email_idx
  ON contact_form_submissions (email);

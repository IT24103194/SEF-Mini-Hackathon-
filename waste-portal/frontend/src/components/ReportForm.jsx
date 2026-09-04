import { useState } from 'react';
import { COUNCILS, WASTE_TYPES } from '../data/schedules';

const INITIAL_FORM = {
  name: '',
  council: '',
  address: '',
  wasteType: '',
  description: '',
};

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name looks too short.';
  }

  if (!form.council) {
    errors.council = 'Please select your local council.';
  }

  if (!form.address.trim()) {
    errors.address = 'Please enter your street address.';
  } else if (form.address.trim().length < 10) {
    errors.address = 'Address must be at least 10 characters.';
  }

  if (!form.wasteType) {
    errors.wasteType = 'Please select a waste type.';
  }

  if (!form.description.trim()) {
    errors.description = 'Please describe the issue.';
  } else if (form.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters.';
  }

  return errors;
}

export default function ReportForm({ onReportSubmitted }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
    setSuccess(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          (data.errors && data.errors.join(', ')) || data.error || 'Submission failed.'
        );

      setSuccess(true);
      setForm(INITIAL_FORM);
      onReportSubmitted?.(data.data);

      // Scroll to feed
      setTimeout(() => {
        document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (err) {
      setSubmitError(err.message || 'Could not submit report. Is the backend running?');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (field) =>
    `mt-2 w-full rounded-xl border-2 bg-white px-4 py-3.5 font-body text-base text-ink placeholder:text-ink/40 transition-all focus:outline-none focus:ring-4 dark:bg-paper-dark dark:text-ink-light dark:placeholder:text-ink-light/40 dark:border-mist-dark ${
      errors[field]
        ? 'border-terracotta focus:border-terracotta focus:ring-terracotta/10'
        : 'border-mist focus:border-forest focus:ring-forest/10 dark:focus:border-forest-light dark:focus:ring-forest-light/10'
    }`;

  const labelClass = 'flex items-center gap-2 font-body text-sm font-semibold text-ink dark:text-ink-light';

  return (
    <section id="report" className="relative bg-gradient-to-br from-paper via-white to-paper py-16 sm:py-24 dark:from-paper-dark dark:via-paper-dark/95 dark:to-paper-dark transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#2A353220_1px,transparent_1px),linear-gradient(to_bottom,#2A353220_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border-2 border-mist bg-white shadow-2xl dark:border-mist-dark dark:bg-paper-dark">
          <div className="p-6 sm:p-10">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-terracotta to-turmeric text-3xl shadow-lg">
                🚨
              </div>
              <p className="font-body text-sm font-semibold uppercase tracking-wide text-turmeric-dark dark:text-turmeric-light">
                Truck skipped your street?
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink dark:text-ink-light sm:text-4xl">
                Report a missed pickup
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-body text-base text-ink/70 dark:text-ink-light/70">
                Your council receives every report instantly. We track it and keep everyone informed.
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mt-8 animate-slide-up rounded-xl border-2 border-forest/20 bg-forest/5 p-5 dark:bg-forest-light/10 dark:border-forest-light/30">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-xl dark:bg-forest-light">
                    ✓
                  </div>
                  <div>
                    <p className="font-body text-sm font-bold text-forest dark:text-forest-light">Report submitted successfully!</p>
                    <p className="mt-1 font-body text-sm text-forest/80 dark:text-forest-light/80">
                      Thank you for keeping our community informed. Check the feed below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>
                    <span className="text-base">👤</span>
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={inputClass('name')}
                    placeholder="Nimal Perera"
                  />
                  {errors.name && (
                    <p className="mt-2 flex items-center gap-1 font-body text-sm text-terracotta">
                      <span>⚠️</span> {errors.name}
                    </p>
                  )}
                </div>

                {/* Council */}
                <div>
                  <label htmlFor="council" className={labelClass}>
                    <span className="text-base">🏛️</span>
                    Local council
                  </label>
                  <select
                    id="council"
                    value={form.council}
                    onChange={(e) => handleChange('council', e.target.value)}
                    className={inputClass('council')}
                  >
                    <option value="">Select your council</option>
                    {COUNCILS.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.council && (
                    <p className="mt-2 flex items-center gap-1 font-body text-sm text-terracotta">
                      <span>⚠️</span> {errors.council}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className={labelClass}>
                  <span className="text-base">📍</span>
                  Street address
                </label>
                <input
                  id="address"
                  type="text"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={inputClass('address')}
                  placeholder="No. 24, Galle Road, Colombo 06"
                />
                {errors.address && (
                  <p className="mt-2 flex items-center gap-1 font-body text-sm text-terracotta">
                    <span>⚠️</span> {errors.address}
                  </p>
                )}
              </div>

              {/* Waste Type */}
              <div>
                <label htmlFor="wasteType" className={labelClass}>
                  <span className="text-base">🗑️</span>
                  Waste type
                </label>
                <select
                  id="wasteType"
                  value={form.wasteType}
                  onChange={(e) => handleChange('wasteType', e.target.value)}
                  className={inputClass('wasteType')}
                >
                  <option value="">Select waste type</option>
                  {WASTE_TYPES.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                {errors.wasteType && (
                  <p className="mt-2 flex items-center gap-1 font-body text-sm text-terracotta">
                    <span>⚠️</span> {errors.wasteType}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className={labelClass}>
                  <span className="text-base">📝</span>
                  What happened?
                </label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={5}
                  className={inputClass('description')}
                  placeholder="The collection truck did not stop on our street on the scheduled day. This is the second time this month..."
                />
                <div className="mt-2 flex items-center justify-between">
                  {errors.description ? (
                    <p className="flex items-center gap-1 font-body text-sm text-terracotta">
                      <span>⚠️</span> {errors.description}
                    </p>
                  ) : (
                    <p className="font-body text-xs text-ink/40 dark:text-ink-light/40">
                      {form.description.length}/500 characters
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Error */}
              {submitError && (
                <div className="rounded-xl border-2 border-terracotta/20 bg-terracotta/5 p-4 dark:bg-terracotta/10">
                  <div className="flex gap-3">
                    <span className="text-xl">⚠️</span>
                    <p className="font-body text-sm text-terracotta">{submitError}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setForm(INITIAL_FORM)}
                  className="rounded-xl border-2 border-mist px-6 py-3.5 font-body text-sm font-semibold text-ink/70 transition-all hover:border-ink/20 hover:bg-ink/5 dark:border-mist-dark dark:text-ink-light/70 dark:hover:border-ink-light/20 dark:hover:bg-ink-light/5"
                >
                  Clear form
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-forest to-forest-dark px-8 py-3.5 font-body text-sm font-bold text-paper shadow-lg shadow-forest/20 transition-all hover:shadow-glow-green hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 dark:from-forest-light dark:to-forest"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {submitting ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="text-base">📤</span>
                        Submit report
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
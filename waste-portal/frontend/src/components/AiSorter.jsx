import { useState } from 'react';

const CATEGORY_STYLES = {
  Recyclable: {
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    text: 'text-sky-700 dark:text-sky-400',
    ring: 'ring-sky-600/20 dark:ring-sky-400/20',
    icon: '♻️',
    gradient: 'from-sky-400 to-sky-600 dark:from-sky-500 dark:to-sky-700',
  },
  Organic: {
    bg: 'bg-forest/10 dark:bg-forest-light/10',
    text: 'text-forest dark:text-forest-light',
    ring: 'ring-forest/20 dark:ring-forest-light/20',
    icon: '🌱',
    gradient: 'from-green-400 to-forest dark:from-green-500 dark:to-forest-light',
  },
  'E-Waste/Hazardous': {
    bg: 'bg-terracotta/10 dark:bg-terracotta/20',
    text: 'text-terracotta dark:text-terracotta',
    ring: 'ring-terracotta/25 dark:ring-terracotta/30',
    icon: '⚠️',
    gradient: 'from-orange-400 to-terracotta dark:from-orange-500 dark:to-terracotta',
  },
  'General/Non-Recyclable': {
    bg: 'bg-ink/5 dark:bg-ink-light/10',
    text: 'text-ink/70 dark:text-ink-light/70',
    ring: 'ring-ink/10 dark:ring-ink-light/10',
    icon: '🗑️',
    gradient: 'from-gray-400 to-ink dark:from-gray-500 dark:to-ink-light',
  },
  Unclassified: {
    bg: 'bg-turmeric/10 dark:bg-turmeric/20',
    text: 'text-turmeric-dark dark:text-turmeric-light',
    ring: 'ring-turmeric/30 dark:ring-turmeric/40',
    icon: '❓',
    gradient: 'from-yellow-400 to-turmeric-dark dark:from-yellow-500 dark:to-turmeric',
  },
};

const EXAMPLES = [
  { text: 'old phone charger', icon: '🔌' },
  { text: 'banana peel', icon: '🍌' },
  { text: 'glass bottle', icon: '🍾' },
  { text: 'used batteries', icon: '🔋' },
];

export default function AiSorter() {
  const [item, setItem] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!item.trim()) {
      setError('Type an item first — e.g. "glass bottle".');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Could not reach the classifier. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  const categoryStyle = result
    ? CATEGORY_STYLES[result.category] || CATEGORY_STYLES.Unclassified
    : null;

  return (
    <section id="sorter" className="relative bg-white py-16 sm:py-24 dark:bg-paper-dark transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:bg-[radial-gradient(#2A3532_1px,transparent_1px)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border-2 border-mist bg-gradient-to-br from-white to-paper shadow-2xl dark:border-mist-dark dark:from-paper-dark dark:to-paper-dark/95">
          <div className="p-6 sm:p-10">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-forest to-turmeric text-3xl shadow-lg dark:from-forest-light dark:to-turmeric-light">
                🤖
              </div>
              <p className="font-body text-sm font-semibold uppercase tracking-wide text-turmeric-dark dark:text-turmeric-light">
                AI-Powered Sorting Assistant
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink dark:text-ink-light sm:text-4xl">
                Not sure which bin?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-body text-base text-ink/70 dark:text-ink-light/70">
                Describe your item and our AI will instantly tell you how to sort it correctly
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder='Try "expired medicine" or "coconut shell"'
                    className="w-full rounded-xl border-2 border-mist bg-white px-5 py-4 pl-12 font-body text-base text-ink placeholder:text-ink/40 shadow-sm transition-all focus:border-forest focus:outline-none focus:ring-4 focus:ring-forest/10 dark:border-mist-dark dark:bg-paper-dark dark:text-ink-light dark:placeholder:text-ink-light/40 dark:focus:border-forest-light dark:focus:ring-forest-light/10"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-forest to-forest-dark px-8 py-4 font-body text-sm font-bold text-paper shadow-lg shadow-forest/20 transition-all hover:shadow-glow-green hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 dark:from-forest-light dark:to-forest"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
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
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <span className="text-base">✨</span>
                        Sort it
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>

            {/* Example Tags */}
            <div className="mt-5">
              <p className="mb-3 font-body text-xs font-medium text-ink/50 dark:text-ink-light/50">Quick examples:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.text}
                    type="button"
                    onClick={() => setItem(ex.text)}
                    className="group inline-flex items-center gap-2 rounded-full border-2 border-mist bg-white px-4 py-2 font-body text-sm text-ink/60 transition-all hover:border-forest hover:bg-forest/5 hover:text-forest hover:scale-105 dark:border-mist-dark dark:bg-paper-dark dark:text-ink-light/60 dark:hover:border-forest-light dark:hover:bg-forest-light/5 dark:hover:text-forest-light"
                  >
                    <span className="transition-transform group-hover:scale-110">{ex.icon}</span>
                    {ex.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 animate-slide-up rounded-xl border-2 border-terracotta/20 bg-terracotta/5 p-4 dark:bg-terracotta/10">
                <div className="flex gap-3">
                  <span className="text-xl">⚠️</span>
                  <p className="font-body text-sm font-medium text-terracotta">{error}</p>
                </div>
              </div>
            )}

            {/* Result Card */}
            {result && categoryStyle && (
              <div className="mt-8 animate-slide-up">
                <div className={`overflow-hidden rounded-2xl border-2 ${categoryStyle.ring} shadow-lg dark:border-opacity-50`}>
                  {/* Result Header with Gradient */}
                  <div className={`bg-gradient-to-r ${categoryStyle.gradient} p-1`}>
                    <div className={`rounded-xl ${categoryStyle.bg} p-6`}>
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-3xl shadow-md dark:bg-paper-dark">
                          {categoryStyle.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-body text-xs font-semibold uppercase tracking-wide opacity-70 dark:opacity-80">
                            "{result.item}" is classified as
                          </p>
                          <p className={`mt-2 font-display text-2xl font-bold sm:text-3xl ${categoryStyle.text}`}>
                            {result.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tip Section */}
                  <div className="bg-white p-6 dark:bg-paper-dark">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-turmeric/20 text-base dark:bg-turmeric/30">
                        💡
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold text-ink dark:text-ink-light">How to dispose:</p>
                        <p className="mt-1 font-body text-sm leading-relaxed text-ink/70 dark:text-ink-light/70">
                          {result.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-ink/5 dark:bg-paper-dark dark:ring-ink-light/10">
            <div className="text-2xl">⚡</div>
            <p className="mt-2 font-body text-xs font-semibold text-ink/70 dark:text-ink-light/70">Instant Results</p>
          </div>
          <div className="rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-ink/5 dark:bg-paper-dark dark:ring-ink-light/10">
            <div className="text-2xl">🎯</div>
            <p className="mt-2 font-body text-xs font-semibold text-ink/70 dark:text-ink-light/70">95% Accuracy</p>
          </div>
          <div className="rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-ink/5 dark:bg-paper-dark dark:ring-ink-light/10">
            <div className="text-2xl">🌍</div>
            <p className="mt-2 font-body text-xs font-semibold text-ink/70 dark:text-ink-light/70">Eco-Friendly</p>
          </div>
        </div>
      </div>
    </section>
  );
}
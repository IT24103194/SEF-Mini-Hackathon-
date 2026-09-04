import { useMemo, useState } from 'react';
import { COUNCILS } from '../data/schedules';
import { getAllUpcoming, getSoonestPickup } from '../utils/countdown';

const TYPE_STYLES = {
  Organic: {
    dot: 'bg-forest dark:bg-forest-light',
    text: 'text-forest dark:text-forest-light',
    ring: 'ring-forest/20 dark:ring-forest-light/20',
    bg: 'bg-forest/5 dark:bg-forest-light/10',
    icon: '🌱',
  },
  Recyclable: {
    dot: 'bg-sky-600 dark:bg-sky-400',
    text: 'text-sky-700 dark:text-sky-400',
    ring: 'ring-sky-600/20 dark:ring-sky-400/20',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    icon: '♻️',
  },
  'E-Waste/Hazardous': {
    dot: 'bg-terracotta dark:bg-terracotta',
    text: 'text-terracotta dark:text-terracotta',
    ring: 'ring-terracotta/20 dark:ring-terracotta/30',
    bg: 'bg-terracotta/5 dark:bg-terracotta/10',
    icon: '⚠️',
  },
  'General/Non-Recyclable': {
    dot: 'bg-ink/60 dark:bg-ink-light/60',
    text: 'text-ink/70 dark:text-ink-light/70',
    ring: 'ring-ink/10 dark:ring-ink-light/10',
    bg: 'bg-ink/5 dark:bg-ink-light/10',
    icon: '🗑️',
  },
};

export default function ScheduleViewer() {
  const [councilId, setCouncilId] = useState(COUNCILS[0].id);

  const council = useMemo(() => COUNCILS.find((c) => c.id === councilId), [councilId]);
  const now = useMemo(() => new Date(), []);
  const soonest = useMemo(() => getSoonestPickup(council, now), [council, now]);
  const upcoming = useMemo(() => getAllUpcoming(council, now), [council, now]);

  return (
    <section id="schedule" className="relative overflow-hidden bg-gradient-to-br from-paper via-white to-paper dark:from-paper-dark dark:via-paper-dark/95 dark:to-paper-dark transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute -left-4 top-20 h-64 w-64 rounded-full bg-forest/10 blur-3xl dark:bg-forest-light/10" />
        <div className="absolute -right-4 top-40 h-96 w-96 rounded-full bg-turmeric/10 blur-3xl dark:bg-turmeric/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 xl:gap-20">
          {/* Hero Content */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-turmeric/10 px-4 py-2 ring-1 ring-turmeric/20 dark:bg-turmeric/20 dark:ring-turmeric/30">
              <span className="animate-pulse text-lg">✨</span>
              <span className="font-body text-sm font-semibold uppercase tracking-wide text-turmeric-dark dark:text-turmeric-light">
                Waste collection, made predictable
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink dark:text-ink-light sm:text-5xl lg:text-6xl">
              Know exactly when the{' '}
              <span className="relative inline-block">
                <span className="gradient-text">truck comes</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M1 5.5C50 2.5 150 2.5 199 5.5"
                    stroke="#E8A33D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              to your street.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-balance font-body text-lg leading-relaxed text-ink/70 dark:text-ink-light/70">
              Pick your local council below and we'll count down to your next organic, recyclable,
              and general collection — <strong className="font-semibold text-forest dark:text-forest-light">down to the hour</strong>.
            </p>

            {/* Council Selector */}
            <div className="mt-10">
              <label
                htmlFor="council"
                className="flex items-center gap-2 font-body text-sm font-semibold text-ink/80 dark:text-ink-light/80"
              >
                <span className="text-xl">📍</span>
                Your local council
              </label>
              <div className="relative mt-3">
                <select
                  id="council"
                  value={councilId}
                  onChange={(e) => setCouncilId(e.target.value)}
                  className="w-full max-w-md appearance-none rounded-xl border-2 border-mist bg-white px-5 py-4 pr-12 font-body text-base font-medium text-ink shadow-sm transition-all hover:border-forest/30 focus:border-forest focus:outline-none focus:ring-4 focus:ring-forest/10 dark:border-mist-dark dark:bg-paper-dark dark:text-ink-light dark:hover:border-forest-light/30 dark:focus:border-forest-light dark:focus:ring-forest-light/10"
                >
                  {COUNCILS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-ink/40 dark:text-ink-light/40"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Countdown Card */}
            {soonest && (
              <div className="group mt-8 animate-slide-up">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest to-forest-dark p-1 shadow-2xl shadow-forest/30 transition-all hover:shadow-glow-green dark:from-forest-light dark:to-forest">
                  <div className="rounded-xl bg-forest/95 px-6 py-8 sm:px-8 dark:bg-forest-dark/95">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{TYPE_STYLES[soonest.wasteType]?.icon}</span>
                          <p className="font-body text-xs font-semibold uppercase tracking-wider text-turmeric-light">
                            Next up · {soonest.wasteType}
                          </p>
                        </div>
                        <p className="mt-4 font-display text-5xl font-bold leading-none text-paper sm:text-6xl">
                          {soonest.countdownLabel}
                        </p>
                        <p className="mt-3 font-body text-sm text-paper/80 sm:text-base">
                          {soonest.fullLabel}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-turmeric/20 text-3xl transition-transform group-hover:scale-110 group-hover:rotate-12">
                          🚛
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-forest-dark dark:bg-forest">
                      <div className="h-full w-2/3 rounded-full bg-turmeric animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-ink/5 dark:bg-paper-dark dark:ring-ink-light/10">
                <p className="font-display text-2xl font-bold text-forest dark:text-forest-light">
                  {COUNCILS.length}
                </p>
                <p className="mt-1 font-body text-xs text-ink/60 dark:text-ink-light/60">Councils</p>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-ink/5 dark:bg-paper-dark dark:ring-ink-light/10">
                <p className="font-display text-2xl font-bold text-turmeric-dark dark:text-turmeric-light">
                  {upcoming.length}
                </p>
                <p className="mt-1 font-body text-xs text-ink/60 dark:text-ink-light/60">This Week</p>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-ink/5 dark:bg-paper-dark dark:ring-ink-light/10">
                <p className="font-display text-2xl font-bold text-ink dark:text-ink-light">24/7</p>
                <p className="mt-1 font-body text-xs text-ink/60 dark:text-ink-light/60">Tracking</p>
              </div>
            </div>
          </div>

          {/* Upcoming Schedule Card */}
          <div className="animate-slide-up lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border-2 border-mist bg-white shadow-xl dark:border-mist-dark dark:bg-paper-dark">
              {/* Header */}
              <div className="border-b border-mist bg-gradient-to-r from-forest/5 to-turmeric/5 px-6 py-5 dark:border-mist-dark dark:from-forest-light/5 dark:to-turmeric/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-xl dark:bg-forest-light">
                    📅
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink dark:text-ink-light">{council.name}</h2>
                    <p className="font-body text-xs text-ink/60 dark:text-ink-light/60">
                      {upcoming.length} upcoming collections
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule List */}
              <div className="max-h-[500px] overflow-y-auto p-4">
                <ul className="space-y-3">
                  {upcoming.map((u, idx) => {
                    const style = TYPE_STYLES[u.wasteType] ?? TYPE_STYLES['General/Non-Recyclable'];
                    return (
                      <li
                        key={idx}
                        className="group animate-slide-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div
                          className={`flex items-center justify-between rounded-xl border-2 border-mist p-4 ring-1 transition-all hover:scale-[1.02] hover:shadow-md ${style.ring} ${style.bg} dark:border-mist-dark`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm dark:bg-paper-dark">
                              {style.icon}
                            </div>
                            <div>
                              <p className={`font-body text-sm font-semibold ${style.text}`}>
                                {u.wasteType}
                              </p>
                              <p className="mt-0.5 font-body text-xs text-ink/50 dark:text-ink-light/50">{u.fullLabel}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-display text-base font-bold text-ink dark:text-ink-light">
                              {u.countdownLabel}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="mt-4 rounded-xl bg-turmeric/10 p-4 ring-1 ring-turmeric/20 dark:bg-turmeric/20 dark:ring-turmeric/30">
              <div className="flex gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="font-body text-sm font-semibold text-turmeric-dark dark:text-turmeric-light">
                    Pro tip
                  </p>
                  <p className="mt-1 font-body text-xs text-ink/70 dark:text-ink-light/70">
                    Set reminders the night before to never miss a collection day!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
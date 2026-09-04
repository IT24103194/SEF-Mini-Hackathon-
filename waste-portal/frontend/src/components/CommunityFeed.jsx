import { useEffect, useState } from 'react';
import StatusBadge from './StatusBadge';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const WASTE_ICONS = {
  Organic: '🌱',
  Recyclable: '♻️',
  'E-Waste/Hazardous': '⚠️',
  'General/Non-Recyclable': '🗑️',
};

export default function CommunityFeed({ refreshKey }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/reports');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not load reports.');
        if (!cancelled) setReports(data.data || []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not reach the server.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return (
    <section id="feed" className="bg-white py-16 sm:py-24 dark:bg-paper-dark transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-turmeric to-forest text-3xl shadow-lg dark:from-turmeric-light dark:to-forest-light">
            👥
          </div>
          <h2 className="font-display text-3xl font-bold text-ink dark:text-ink-light sm:text-4xl">Community Feed</h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-base text-ink/70 dark:text-ink-light/70">
            Live updates from your neighbors. Stay informed about collection issues in real-time.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-2 ring-1 ring-forest/20 dark:bg-forest-light/10 dark:ring-forest-light/20">
            <div className="h-2 w-2 animate-pulse rounded-full bg-forest dark:bg-forest-light" />
            <span className="font-body text-sm font-semibold text-forest dark:text-forest-light">
              {reports.length} active {reports.length === 1 ? 'report' : 'reports'}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-mist border-t-forest dark:border-mist-dark dark:border-t-forest-light" />
            <p className="mt-4 font-body text-sm text-ink/50 dark:text-ink-light/50">Loading community reports...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mx-auto max-w-md rounded-2xl border-2 border-terracotta/20 bg-terracotta/5 p-8 text-center dark:bg-terracotta/10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/20 text-2xl">
              ⚠️
            </div>
            <p className="font-body text-sm text-terracotta">{error}</p>
            <p className="mt-2 font-body text-xs text-ink/50 dark:text-ink-light/50">
              Start the backend and MongoDB to see live reports
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && reports.length === 0 && (
          <div className="mx-auto max-w-md rounded-3xl border-2 border-dashed border-mist bg-gradient-to-br from-white to-paper p-12 text-center dark:border-mist-dark dark:from-paper-dark dark:to-paper-dark/95">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-ink/5 text-4xl dark:bg-ink-light/10">
              📭
            </div>
            <p className="font-display text-xl font-semibold text-ink/70 dark:text-ink-light/70">No reports yet</p>
            <p className="mt-2 font-body text-sm text-ink/50 dark:text-ink-light/50">
              Be the first to report a missed pickup and help your community stay informed
            </p>
            <a
              href="#report"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-forest px-6 py-3 font-body text-sm font-semibold text-paper transition-all hover:bg-forest-dark hover:scale-105 dark:bg-forest-light dark:hover:bg-forest"
            >
              <span className="text-base">🚨</span>
              Create first report
            </a>
          </div>
        )}

        {/* Reports Grid */}
        {!loading && !error && reports.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((r, idx) => (
              <article
                key={r._id}
                className="group ticket-perforation relative overflow-hidden rounded-2xl border-2 border-mist bg-white pl-5 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] animate-slide-in dark:border-mist-dark dark:bg-paper-dark"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="border-l border-dashed border-mist/0 py-6 pr-5">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-forest/10 to-turmeric/10 text-xl dark:from-forest-light/10 dark:to-turmeric/20">
                        {WASTE_ICONS[r.wasteType] || '🗑️'}
                      </div>
                      <div>
                        <p className="font-display text-base font-bold text-ink dark:text-ink-light">{r.wasteType}</p>
                        <p className="mt-0.5 font-body text-xs text-ink/50 dark:text-ink-light/50">{r.council}</p>
                      </div>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm leading-relaxed text-ink/80 line-clamp-3 dark:text-ink-light/80">
                    {r.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 space-y-2 border-t border-dashed border-mist pt-4 dark:border-mist-dark">
                    <div className="flex items-center gap-2 text-ink/50 dark:text-ink-light/50">
                      <span className="text-sm">📍</span>
                      <p className="font-body text-xs line-clamp-1">{r.address}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-body text-xs font-semibold text-ink/60 dark:text-ink-light/60">— {r.name}</p>
                      <div className="flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1 dark:bg-ink-light/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-turmeric dark:bg-turmeric-light" />
                        <p className="font-body text-xs font-medium text-ink/40 dark:text-ink-light/40">
                          {timeAgo(r.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
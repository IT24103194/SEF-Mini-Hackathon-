import { useState } from 'react';
import Navbar from './components/Navbar';
import ScheduleViewer from './components/ScheduleViewer';
import AiSorter from './components/AiSorter';
import ReportForm from './components/ReportForm';
import CommunityFeed from './components/CommunityFeed';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div id="top" className="min-h-screen bg-paper">
      <Navbar />
      
      <main>
        <ScheduleViewer />
        
        <div className="relative py-8">
          <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-mist to-transparent" />
        </div>
        
        <AiSorter />
        
        <div className="relative py-8">
          <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-mist to-transparent" />
        </div>
        
        <ReportForm onReportSubmitted={() => setRefreshKey((k) => k + 1)} />
        
        <CommunityFeed refreshKey={refreshKey} />
      </main>

      <footer className="relative border-t-2 border-mist bg-gradient-to-br from-white to-paper dark:border-mist-dark dark:from-paper-dark dark:to-paper-dark/95">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
                  <rect width="64" height="64" rx="16" fill="#1F4B3F" />
                  <path d="M22 26h20l-2 26a3 3 0 0 1-3 3H27a3 3 0 0 1-3-3l-2-26z" fill="#F1F4EE" />
                  <rect x="19" y="20" width="26" height="5" rx="2" fill="#E8A33D" />
                  <rect x="28" y="14" width="8" height="6" rx="2" fill="#E8A33D" />
                </svg>
                <div>
                  <span className="font-display text-2xl font-bold text-forest dark:text-forest-light">Sahana</span>
                  <p className="font-body text-xs text-ink/60 dark:text-ink-light/60">Smart Waste Management</p>
                </div>
              </div>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ink/60 dark:text-ink-light/60">
                A community prototype for cleaner, more predictable municipal waste collection in Sri Lanka.
                Built with ❤️ for a sustainable future.
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-sm font-bold text-ink dark:text-ink-light">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {['Schedule', 'AI Sorter', 'Report', 'Community'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="font-body text-sm text-ink/60 transition-colors hover:text-forest dark:text-ink-light/60 dark:hover:text-forest-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-display text-sm font-bold text-ink dark:text-ink-light">Connect</h3>
              <div className="mt-4 flex gap-3">
                {['🐦', '📘', '📧'].map((icon, idx) => (
                  <button
                    key={idx}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-lg transition-all hover:bg-forest hover:scale-110 dark:bg-forest-light/10 dark:hover:bg-forest-light"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-mist pt-8 text-center dark:border-mist-dark">
            <p className="font-body text-xs text-ink/50 dark:text-ink-light/50">
              © 2024 Sahana. All rights reserved. Made with 🌱 for a cleaner Sri Lanka.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
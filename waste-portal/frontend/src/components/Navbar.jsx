import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#schedule', label: 'Schedule', icon: '📅' },
    { href: '#sorter', label: 'AI Sorter', icon: '🤖' },
    { href: '#report', label: 'Report', icon: '📋' },
    { href: '#feed', label: 'Community', icon: '👥' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-mist dark:bg-paper-dark/95 dark:border-mist-dark'
          : 'bg-paper/90 backdrop-blur-sm border-b border-mist/50 dark:bg-paper-dark/90 dark:border-mist-dark/50'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="relative">
              <svg
                width="36"
                height="36"
                viewBox="0 0 64 64"
                fill="none"
                className="transition-transform group-hover:rotate-12"
              >
                <rect width="64" height="64" rx="16" fill="#1F4B3F" />
                <path
                  d="M22 26h20l-2 26a3 3 0 0 1-3 3H27a3 3 0 0 1-3-3l-2-26z"
                  fill="#F1F4EE"
                />
                <rect x="19" y="20" width="26" height="5" rx="2" fill="#E8A33D" />
                <rect x="28" y="14" width="8" height="6" rx="2" fill="#E8A33D" />
              </svg>
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-turmeric animate-pulse" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-forest dark:text-forest-light sm:text-2xl">
                Sahana
              </span>
              <p className="hidden text-xs text-ink/50 dark:text-ink-light/50 sm:block">
                Smart Waste Management
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 font-body text-sm font-medium text-ink/70 transition-colors hover:text-forest dark:text-ink-light/70 dark:hover:text-forest-light"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base transition-transform group-hover:scale-110">
                    {link.icon}
                  </span>
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-forest transition-all group-hover:w-3/4 dark:bg-forest-light" />
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <a
              href="#report"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-forest to-forest-dark px-5 py-2.5 text-sm font-semibold text-paper shadow-lg shadow-forest/20 transition-all hover:shadow-glow-green hover:scale-105 dark:from-forest-light dark:to-forest"
            >
              <span className="text-base">🚨</span>
              Report Pickup
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative h-10 w-10 rounded-lg border border-mist bg-white text-ink transition-colors hover:bg-forest/5 dark:border-mist-dark dark:bg-paper-dark dark:text-ink-light"
              aria-label="Toggle menu"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`absolute h-0.5 w-5 bg-current transition-all ${
                    isOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current transition-all ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current transition-all ${
                    isOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <nav className="space-y-1 pb-4">
            {links.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-body text-sm font-medium text-ink/70 transition-all hover:bg-forest/5 hover:text-forest animate-slide-in dark:text-ink-light/70 dark:hover:bg-forest-light/5 dark:hover:text-forest-light"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </a>
            ))}
            <a
              href="#report"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-3 font-body text-sm font-semibold text-paper transition-all hover:bg-forest-dark dark:bg-forest-light dark:hover:bg-forest"
            >
              <span className="text-base">🚨</span>
              Report a Pickup
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
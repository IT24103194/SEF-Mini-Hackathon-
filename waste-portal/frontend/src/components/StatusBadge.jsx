const STATUS_STYLES = {
  Pending: 'border-turmeric text-turmeric-dark',
  'In Review': 'border-sky-600 text-sky-700',
  Resolved: 'border-forest text-forest',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Pending;
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide ${style}`}
      style={{ transform: 'rotate(-4deg)' }}
    >
      {status}
    </span>
  );
}

import { WEEKDAY_NAMES } from '../data/schedules';

/**
 * Given a route ({ wasteType, days, time }) and a reference "now" Date,
 * returns the next occurrence as a Date object, plus a human countdown.
 */
export function getNextPickup(route, now = new Date()) {
  const [hours, minutes] = route.time.split(':').map(Number);

  let best = null;

  // Look up to 8 days ahead (covers "today, later" through "next week, same day")
  for (let offset = 0; offset <= 8; offset++) {
    const candidate = new Date(now);
    candidate.setDate(now.getDate() + offset);
    candidate.setHours(hours, minutes, 0, 0);

    const dayOfWeek = candidate.getDay();
    if (!route.days.includes(dayOfWeek)) continue;
    if (candidate.getTime() <= now.getTime()) continue; // already passed

    best = candidate;
    break;
  }

  if (!best) return null;

  const diffMs = best.getTime() - now.getTime();
  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hoursLeft = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutesLeft = totalMinutes % 60;

  let label;
  if (days === 0) {
    label = hoursLeft > 0 ? `${hoursLeft}h ${minutesLeft}m` : `${minutesLeft}m`;
  } else {
    label = `${days} day${days > 1 ? 's' : ''}`;
  }

  const isToday = best.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = best.toDateString() === tomorrow.toDateString();

  const dayLabel = isToday ? 'Today' : isTomorrow ? 'Tomorrow' : WEEKDAY_NAMES[best.getDay()];
  const timeLabel = best.toLocaleTimeString('en-LK', { hour: 'numeric', minute: '2-digit' });

  return {
    date: best,
    countdownLabel: label,
    days,
    fullLabel: `${dayLabel} at ${timeLabel}`,
  };
}

/**
 * Given a full council object, returns the soonest-upcoming pickup across
 * all of its routes, annotated with wasteType.
 */
export function getSoonestPickup(council, now = new Date()) {
  const results = council.routes
    .map((route) => {
      const next = getNextPickup(route, now);
      return next ? { ...next, wasteType: route.wasteType } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date);

  return results[0] || null;
}

/**
 * Returns next pickup info for every route on a council, sorted by soonest.
 */
export function getAllUpcoming(council, now = new Date()) {
  return council.routes
    .map((route) => {
      const next = getNextPickup(route, now);
      return next ? { ...next, wasteType: route.wasteType } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date);
}

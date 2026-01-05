export default function formatDuration(ms) {
  if (ms <= 0) return "0 seconds";

  let totalSeconds = Math.floor(ms / 1000);

  const now = new Date();
  const currentMonth = now.getMonth();

  const DAYS_IN_MONTH = currentMonth <= 5 ? 31 : 30;

  const MONTH_SECONDS = DAYS_IN_MONTH * 24 * 60 * 60;
  const DAY_SECONDS = 24 * 60 * 60;
  const HOUR_SECONDS = 60 * 60;

  const months = Math.floor(totalSeconds / MONTH_SECONDS);
  totalSeconds %= MONTH_SECONDS;

  const days = Math.floor(totalSeconds / DAY_SECONDS);
  totalSeconds %= DAY_SECONDS;

  const hours = Math.floor(totalSeconds / HOUR_SECONDS);
  totalSeconds %= HOUR_SECONDS;


  const parts = [];

  if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);

  return parts.join(", ");
}

export function toDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
export function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = toDateOnly(a).getTime() - toDateOnly(b).getTime();
  return Math.floor(diff / msPerDay);
}
export function addOneMonthClamped(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const targetMonth = month + 1;
  const targetDate = new Date(year, targetMonth, 1);

  const lastDayOfTargetMonth = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    0,
  ).getDate();

  const clampedDay = Math.min(day, lastDayOfTargetMonth);

  return new Date(targetDate.getFullYear(), targetDate.getMonth(), clampedDay);
}

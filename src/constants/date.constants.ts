export const DAY_MAPPING = {
  mon: '월요웹툰',
  tue: '화요웹툰',
  wed: '수요웹툰',
  thu: '목요웹툰',
  fri: '금요웹툰',
  sat: '토요웹툰',
  sun: '일요웹툰',
} as const;

export type DayOfWeek = keyof typeof DAY_MAPPING;

export const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
export const UI_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

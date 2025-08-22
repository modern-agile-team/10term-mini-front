import { DAY_MAPPING } from '@/constants/date.constants';

export function useWeekdayLabel() {
  const getWeekdayLabel = (weekday: string[]) => {
    if (weekday.length === 1) {
      const key = weekday[0] as keyof typeof DAY_MAPPING;
      return DAY_MAPPING[key];
    } else {
      const weekKorean = weekday.map((day) => DAY_MAPPING[day as keyof typeof DAY_MAPPING][0]);
      return `${weekKorean.join(', ')} 연재`;
    }
  };

  return { getWeekdayLabel };
}

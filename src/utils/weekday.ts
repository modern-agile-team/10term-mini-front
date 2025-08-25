import { DAY_MAPPING } from '@/constants/date.constants';
import type { DayOfWeek } from '@/constants/date.constants';

export function getWeekdayLabel(weekday: DayOfWeek[]) {
  // 요일이 하나인 경우 '월요웹툰' 표시합니다.
  if (weekday.length === 1) {
    const day = weekday[0];
    return DAY_MAPPING[day];
  }

  // 요일이 여러 개인 경우 '월, 목 연재' 표시합니다.
  const weekKorean = weekday.map((day) => {
    return DAY_MAPPING[day][0];
  });

  return `${weekKorean.join(', ')} 연재`;
}

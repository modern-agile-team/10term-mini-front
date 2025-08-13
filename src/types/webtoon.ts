import type { DayOfWeek } from '@/constants/date.constants';

interface Webtoon {
  id: number;
  title: string;
  weekdays: DayOfWeek[];
  thumbnailUrl: string;
  averageRating?: number;
}

export type { Webtoon };

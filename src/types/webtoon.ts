import type { DayOfWeek } from '@/constants/date.constants';

interface Webtoon {
  id: number;
  title: string;
  weekdays: DayOfWeek[];
  thumbnailUrl: string;
  averageRating?: number;
}

interface FavoriteWebtoon {
  webtoonId: number;
  title: string;
  thumbnailUrl: string;
  writer: string;
  updatedAt: string;
}

export type { Webtoon, FavoriteWebtoon };

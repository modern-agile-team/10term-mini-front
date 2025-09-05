import type { DayOfWeek } from '@/constants';

interface Webtoon {
  id: number;
  title: string;
  weekday: DayOfWeek[];
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

interface SearchedWebtoon {
  id: number;
  title: string;
  writer: string;
  illustrator: string;
  weekdays: DayOfWeek[];
  description: string;
  thumbnailUrl: string;
  updatedAt: string;
}

export type { Webtoon, FavoriteWebtoon, SearchedWebtoon };

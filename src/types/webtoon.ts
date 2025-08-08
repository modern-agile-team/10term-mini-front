import type { DayOfWeek } from "@/constants/date.constants"

interface Webtoon {
  id: number;
  title: string;
  day_of_week: DayOfWeek;
  thumbnail_url: string;
  average_rating?: number;
}

export type { Webtoon };
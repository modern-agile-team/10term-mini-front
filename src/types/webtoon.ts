import { DAY_MAPPING } from "../constants/date.constants";

type DayOfWeek = keyof typeof DAY_MAPPING

interface Webtoon {
  id: number;
  title: string;
  day_of_week: DayOfWeek;
  thumbnail_url: string;
}

interface DaySectionProps {
  day: DayOfWeek;
  webtoons: Webtoon[];
}

interface WebtoonCardProps {
  id: number;
  title: string;
  thumbnail_url: string;
}

export type { DayOfWeek, Webtoon, DaySectionProps, WebtoonCardProps };
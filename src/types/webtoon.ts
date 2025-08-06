import { DAY_MAPPING } from "../constants/date.constants";
import { WEBTOON_SORT_OPTIONS } from "../constants/webtoon.constants";

type DayOfWeek = keyof typeof DAY_MAPPING
type WebtoonSortOption = typeof WEBTOON_SORT_OPTIONS[number];

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

export type { DayOfWeek, WebtoonSortOption, Webtoon, DaySectionProps, WebtoonCardProps };
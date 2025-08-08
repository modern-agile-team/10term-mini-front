import { DAY_MAPPING } from "../constants/date.constants";

type DayOfWeek = keyof typeof DAY_MAPPING

interface Webtoon {
  id: number;
  title: string;
  day_of_week: DayOfWeek;
  thumbnail_url: string;
  average_rating: number;
}

interface DaySectionGridProps {
  day?: DayOfWeek | null;   // 선택/nullable
  webtoons: Webtoon[];
}

interface DaySectionListProps {
  day: DayOfWeek;
  webtoons: Webtoon[];
}

interface WebtoonCardProps extends Omit<Webtoon, "day_of_week"> {}

export type { DayOfWeek, Webtoon, DaySectionGridProps, DaySectionListProps, WebtoonCardProps };
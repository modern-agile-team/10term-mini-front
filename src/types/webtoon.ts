type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
type MainSortOption = "like" | "updated" | "view" | "rate"

interface Webtoon {
  id: number;
  title: string;
  day_of_week: DayOfWeek;
  thumbnail_url: string;
  view_count: number;
  favorite_count: number;
  updated_at: string;
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

export type { DayOfWeek, MainSortOption, Webtoon, DaySectionProps, WebtoonCardProps };
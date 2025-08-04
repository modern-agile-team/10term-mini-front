type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

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
  thumbnail: string;
}

export type { DayOfWeek, Webtoon, DaySectionProps, WebtoonCardProps };
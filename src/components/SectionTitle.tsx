import { DAY_MAPPING } from "@/constants/date.constants";
import type { DayOfWeek } from "@/types/webtoon";

function SectionTitle({ day }: { day: string | null }) {
  const text =
    day && day in DAY_MAPPING
      ? `전체 ${DAY_MAPPING[day as DayOfWeek]}`
      : "요일별 전체 웹툰";

  return <span className="mr-4 text-xl font-semibold">{text}</span>;
}

export default SectionTitle;
  
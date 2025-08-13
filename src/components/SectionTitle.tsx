import { DAY_MAPPING } from "@/constants/date.constants";
import type { DayOfWeek } from "@/constants/date.constants";

function SectionTitle({ day }: { day: DayOfWeek | null }) {
  const text = day ? `전체 ${DAY_MAPPING[day]}` : "요일별 전체 웹툰";

  return <span className="mr-4 text-xl font-semibold">{text}</span>;
}

export default SectionTitle;

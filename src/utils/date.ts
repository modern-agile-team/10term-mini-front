import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const KOREA_TZ = 'Asia/Seoul';

// 기본: YY.MM.DD
export const formatDateShort = (isoDate: string) => {
  return dayjs.utc(isoDate).tz(KOREA_TZ).format('YY.MM.DD');
};

// 전체: YYYY-MM-DD HH:mm:ss
export const formatDateFull = (isoDate: string) => {
  return dayjs.utc(isoDate).tz(KOREA_TZ).format('YYYY-MM-DD HH:mm:ss');
};

// T만 뺀 버전: YYYY-MM-DD HH:mm
export const formatSimple = (isoDate: string) => {
  return dayjs.utc(isoDate).tz(KOREA_TZ).format('YYYY-MM-DD HH:mm');
};

// 시간만: HH:mm
export const formatTime = (isoDate: string) => {
  return dayjs.utc(isoDate).tz(KOREA_TZ).format('HH:mm');
};

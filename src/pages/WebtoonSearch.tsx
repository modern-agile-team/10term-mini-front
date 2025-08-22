import { Link, useSearchParams } from 'react-router';
import { Advertisement } from '@/components/Advertisement';
import { useAdvertisement } from '@/hooks/useAdvertisement';
import { useEffect, useState } from 'react';
import { instance } from '@/apis/axios';
import { DAY_MAPPING } from '@/constants/date.constants';
import { formatDateShort } from '@/utils/date';

export default function WebtoonSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { randomAdvertisementLarge, randomAdvertisementSmall } = useAdvertisement(null, keyword);

  const [searchedWebtoons, setSearchedWebtoons] = useState([]);

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await instance.get(`search/webtoons`, {
          params: { keyword },
        });
        console.log(response.data.data.content);
        setSearchedWebtoons(response.data.data.content);
      } catch (error) {
        console.error('Error fetching webtoons:', error);
      }
    };

    if (keyword) {
      fetchWebtoons();
    }
  }, [keyword]);

  function getWeekdayLabel(weekday: string[]) {
    if (weekday.length === 1) {
      const key = weekday[0] as keyof typeof DAY_MAPPING;
      return DAY_MAPPING[key];
    } else {
      const weekKorean = weekday.map((day) => DAY_MAPPING[day as keyof typeof DAY_MAPPING][0]);
      return `${weekKorean.join(', ')} 연재`;
    }
  }

  return (
    <div className="flex justify-between mt-[30px]">
      <div className="w-2/3">
        <div className="">
          <span className="mr-1 text-xl text-site-red font-semibold">'{keyword}'</span>
          <span className="text-xl font-semibold">에 대한 검색결과 입니다.</span>
        </div>
        <div className="pt-4 pb-5 border-b">
          <span className="mr-1 text-xl font-semibold">웹툰</span>
          <span>총 {searchedWebtoons.length}</span>
        </div>
        <div className="mt-[20px]">
          {searchedWebtoons.map((webtoon) => (
            <div key={webtoon.id} className="flex mb-4">
              <Link to={`/webtoon/${webtoon.id}`}>
                <div className="overflow-hidden">
                  <img
                    src={webtoon.thumbnailUrl}
                    alt={webtoon.title}
                    className="w-[120px] h-[156px] object-cover rounded border transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              <div className="ml-4">
                <Link to={`/webtoon/${webtoon.id}`}>
                  <h1 className="text-lg font-semibold hover:underline">{webtoon.title}</h1>
                </Link>

                <div className="text-sm font-semibold">
                  {webtoon.writer}
                  <span className="font-light"> · 글 / </span>
                  {webtoon.illustrator}
                  <span className="font-light"> · 그림 | </span>
                  <span className="font-light">{getWeekdayLabel(webtoon.weekdays)} | </span>
                  <span className="font-light">
                    최종 업데이트 {formatDateShort(webtoon.updatedAt)}
                  </span>
                </div>
                <span className="block mt-1 max-w-[630px] truncate text-sm">
                  {webtoon.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Advertisement largeAdSrc={randomAdvertisementLarge} smallAdSrc={randomAdvertisementSmall} />
    </div>
  );
}

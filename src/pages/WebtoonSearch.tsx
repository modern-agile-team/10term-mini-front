import { useSearchParams } from 'react-router';
import { Advertisement } from '@/components/Advertisement';
import { useAdvertisement } from '@/hooks/useAdvertisement';
import { useWebtoonSearch } from '@/hooks/useWebtoonSearch';
import { useWeekdayLabel } from '@/hooks/useWeekdayLabel';
import { SearchHeader } from '@/components/SearchHeader';
import { SearchedWebtoonItem } from '@/components/SearchedWebtoonItem';

export default function WebtoonSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') as string;
  const { randomAdvertisementLarge, randomAdvertisementSmall } = useAdvertisement(null, keyword);
  const { searchedWebtoons } = useWebtoonSearch(keyword);
  const { getWeekdayLabel } = useWeekdayLabel();

  return (
    <div className="flex justify-between mt-[30px]">
      <div className="w-2/3">
        <SearchHeader keyword={keyword} totalCount={searchedWebtoons.length} />
        <div className="mt-[20px]">
          {searchedWebtoons.length === 0 ? (
            <div className="text-center text-gray-500 py-10">검색 결과가 없습니다...</div>
          ) : (
            searchedWebtoons.map((webtoon) => (
              <SearchedWebtoonItem
                key={webtoon.id}
                webtoon={webtoon}
                getWeekdayLabel={getWeekdayLabel}
              />
            ))
          )}
        </div>
      </div>
      <Advertisement largeAdSrc={randomAdvertisementLarge} smallAdSrc={randomAdvertisementSmall} />
    </div>
  );
}

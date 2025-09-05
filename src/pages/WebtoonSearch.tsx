import { useSearchParams } from 'react-router';
import { Advertisement } from '@/components/Advertisement';
import { useAdvertisement, useWebtoonSearch } from '@/hooks';
import { getWeekdayLabel } from '@/utils/weekday';
import { SearchHeader } from '@/components/SearchHeader';
import { SearchedWebtoonItem } from '@/components/SearchedWebtoonItem';

import Spinner from '@/components/Spinner';

export default function WebtoonSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const { randomAdvertisementLarge, randomAdvertisementSmall } = useAdvertisement({
    day: null,
    keyword,
    isViewer: false,
  });

  const { searchedWebtoons, isLoading, error } = useWebtoonSearch(keyword);

  return (
    <div className="w-[1190px] mx-auto flex justify-between mt-[30px]">
      <div className="w-2/3">
        <SearchHeader keyword={keyword} totalCount={searchedWebtoons.length} />
        <div className="mt-[20px]">
          {isLoading ? (
            <Spinner message="검색 결과를 불러오는 중입니다..." />
          ) : (
            <>
              {error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
              ) : (
                <>
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
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Advertisement largeAdSrc={randomAdvertisementLarge} smallAdSrc={randomAdvertisementSmall} />
    </div>
  );
}

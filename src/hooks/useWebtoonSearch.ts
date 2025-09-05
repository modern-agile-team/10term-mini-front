import { useState, useEffect } from 'react';
import { requestSearchWebtoons } from '@/apis/webtoonSearch';
import type { SearchedWebtoon } from '@/types';

export function useWebtoonSearch(keyword: string) {
  const [searchedWebtoons, setSearchedWebtoons] = useState<SearchedWebtoon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!keyword) {
      setSearchedWebtoons([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const getSearchedWebtoons = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await requestSearchWebtoons(keyword);
        setSearchedWebtoons(result);
      } catch (err) {
        console.error('Error fetching webtoons:', err);
        setError('웹툰 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    getSearchedWebtoons();
  }, [keyword]);

  return { searchedWebtoons, isLoading, error };
}

export default useWebtoonSearch;

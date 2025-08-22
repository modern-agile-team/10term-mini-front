import { useState, useEffect } from 'react';
import { requestSearchWebtoons } from '@/apis/webtoonSearch';
import type { SearchedWebtoon } from '@/types/webtoon';

export function useWebtoonSearch(keyword: string) {
  const [searchedWebtoons, setSearchedWebtoons] = useState<SearchedWebtoon[]>([]);

  useEffect(() => {
    const getSearchedWebtoons = async () => {
      try {
        const searchedWebtoons = await requestSearchWebtoons(keyword);
        setSearchedWebtoons(searchedWebtoons);
      } catch (error) {
        console.error('Error fetching webtoons:', error);
      }
    };

    getSearchedWebtoons();
  }, [keyword]);

  return { searchedWebtoons };
}

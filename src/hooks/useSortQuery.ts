import { WEBTOON_SORT_OPTIONS } from "../constants/webtoon.constants";
import type { WebtoonSortOption } from "../types/webtoon";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export const useSortQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const rawSort = searchParams.get("sort");
  
  const sort: WebtoonSortOption = WEBTOON_SORT_OPTIONS.includes(
    rawSort as WebtoonSortOption
  )
  ? (rawSort as WebtoonSortOption)
  : "favorite";

  useEffect(() => {
    if (!rawSort) {
      searchParams.set("sort", "favorite");
      setSearchParams(searchParams);
    }
  }, [rawSort]);

  const setSort = (value: WebtoonSortOption) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  return { sort, setSort };
};
import { WEBTOON_SORT_OPTIONS } from "../constants/webtoon.constants";
import type { WebtoonSortOption } from "../types/webtoon";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { contains } from "@modern-kit/utils";

export const useSortQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const rawSort = searchParams.get("sort");
  
  const sort: WebtoonSortOption = contains(WEBTOON_SORT_OPTIONS, rawSort)
  ? rawSort
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
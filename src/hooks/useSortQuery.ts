import { WEBTOON_SORT_OPTIONS } from "../constants/webtoon.constants";
import type { WebtoonSortOption } from "../types/webtoon";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { contains } from "@modern-kit/utils";

export const useSortQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const rawSortParam = searchParams.get("sort");
  
  const sortParam: WebtoonSortOption = contains(WEBTOON_SORT_OPTIONS, rawSortParam)
  ? rawSortParam
  : "favorite";

  useEffect(() => {
    if (!rawSortParam) {
      setSortParam("favorite");
    }
  }, [rawSortParam]);

  const setSortParam = (sortOption: WebtoonSortOption) => {
    searchParams.set("sort", sortOption);
    setSearchParams(searchParams);
  };

  return { sortParam, setSortParam };
};
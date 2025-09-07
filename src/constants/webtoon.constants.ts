export const WEBTOON_SORT_OPTIONS = ['favorite', 'updated', 'view', 'rate'] as const;

export type WebtoonSortOption = (typeof WEBTOON_SORT_OPTIONS)[number];

export const BUTTON_INFOS: {
  type: WebtoonSortOption;
  content: string;
}[] = [
  { type: 'favorite', content: '인기순' },
  { type: 'updated', content: '· 업데이트순' },
  { type: 'view', content: '· 조회순' },
  { type: 'rate', content: '· 별점순' },
];

export const VALID_WEBTOON_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  29, 30, 31, 32, 33,
] as const;

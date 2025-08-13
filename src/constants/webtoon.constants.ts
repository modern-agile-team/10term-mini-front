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

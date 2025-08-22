export interface WebtoonDetailInfo {
  id: number;
  title: string;
  writer: string;
  illustrator: string;
  weekdays: string[];
  ageRating: string;
  description: string;
  thumbnailUrl: string;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface WebtoonEpisode {
  id: number;
  episodeNo: number;
  title: string;
  thumbnailUrl: string;
  postedTime: string;
  ratingAvg: number;
}

export interface WebtoonViewerEpisode {
  id: number;
  webtoonId: number;
  episodeNo: number;
  episodeTitle: string;
  fullImgUrl: string;
  webtoonTitle: string;
  hasRated: boolean | null;
  myRating: number | null;
}

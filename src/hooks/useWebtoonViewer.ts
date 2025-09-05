import { useState, useEffect } from 'react';
import { increaseViewCount, requestWebtoonEpisode } from '@/apis/webtoonViewer';
import type { WebtoonViewerEpisode } from '@/types/webtoonViewer';

export function useWebtoonViewer(episodeId: string | undefined) {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [episode, setEpisode] = useState<WebtoonViewerEpisode | null>(null);

  useEffect(() => {
    const getEpisode = async () => {
      if (!episodeId) return;
      setIsLoading(true);
      try {
        const data = await requestWebtoonEpisode(Number(episodeId));
        await increaseViewCount(Number(episodeId));
        setEpisode(data);
      } catch (error) {
        console.error('에피소드 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getEpisode();
  }, [episodeId]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return {
    isLoading,
    isImageLoading,
    episode,
    handleImageLoad,
  };
}

export default useWebtoonViewer;

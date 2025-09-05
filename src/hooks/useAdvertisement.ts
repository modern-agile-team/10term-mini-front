import { useState, useEffect } from 'react';
import type { DayOfWeek } from '@/constants';
import { getRandomAdImages } from '@/utils';

interface AdvertisementProps {
  day: DayOfWeek | null;
  keyword: string | null;
  isViewer: boolean | null;
}

export const useAdvertisement = ({ day, keyword, isViewer }: AdvertisementProps) => {
  const [randomAdvertisementLarge, setRandomAdvertisementLarge] = useState<string>('');
  const [randomAdvertisementSmall, setRandomAdvertisementSmall] = useState<string>('');

  useEffect(() => {
    if (day || keyword || isViewer) {
      const { large, small } = getRandomAdImages();
      setRandomAdvertisementLarge(large);
      setRandomAdvertisementSmall(small);
    }
  }, [day, keyword]);

  return {
    randomAdvertisementLarge,
    randomAdvertisementSmall,
  };
};

export default useAdvertisement;

import { useState, useEffect } from 'react';
import type { DayOfWeek } from '@/constants/date.constants';
import { getRandomAdImages } from '@/utils/advertisement';

export const useAdvertisement = (day: DayOfWeek | null, keyword?: string | null) => {
  const [randomAdvertisementLarge, setRandomAdvertisementLarge] = useState<string>('');
  const [randomAdvertisementSmall, setRandomAdvertisementSmall] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const { large, small } = getRandomAdImages();
      setRandomAdvertisementLarge(large);
      setRandomAdvertisementSmall(small);
    }, 100);

    return () => clearTimeout(timer);
  }, [day, keyword]);

  return {
    randomAdvertisementLarge,
    randomAdvertisementSmall,
  };
};

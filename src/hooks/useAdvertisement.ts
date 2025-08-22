import { useState, useEffect } from 'react';
import {
  LARGE_ADVERTISEMENT_IMAGES,
  SMALL_ADVERTISEMENT_IMAGES,
} from '@/constants/advertisement.constants';
import type { DayOfWeek } from '@/constants/date.constants';

export const useAdvertisement = (day: DayOfWeek | null, keyword?: string | null) => {
  const [randomAdvertisementLarge, setRandomAdvertisementLarge] = useState<string>('');
  const [randomAdvertisementSmall, setRandomAdvertisementSmall] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const largeIndex = Math.floor(Math.random() * LARGE_ADVERTISEMENT_IMAGES.length);
      const smallIndex = Math.floor(Math.random() * SMALL_ADVERTISEMENT_IMAGES.length);
      setRandomAdvertisementLarge(LARGE_ADVERTISEMENT_IMAGES[largeIndex]);
      setRandomAdvertisementSmall(SMALL_ADVERTISEMENT_IMAGES[smallIndex]);
    }, 100);

    return () => clearTimeout(timer);
  }, [day, keyword]);

  return {
    randomAdvertisementLarge,
    randomAdvertisementSmall,
  };
};

import {
  LARGE_ADVERTISEMENT_IMAGES,
  SMALL_ADVERTISEMENT_IMAGES,
} from '@/constants/advertisement.constants';

export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomAdImages() {
  return {
    large: pickRandom(LARGE_ADVERTISEMENT_IMAGES),
    small: pickRandom(SMALL_ADVERTISEMENT_IMAGES),
  };
}

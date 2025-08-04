import authHandlers from './authHandlers';
import webtoonHandlers from './webtoonHandlers';

export const handlers = [
  ...authHandlers,
  ...webtoonHandlers,
]
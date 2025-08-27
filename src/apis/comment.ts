// /apis/comment.ts

import { instance } from '@/apis/axios';
import type { ApiResponse } from '@/types/api';
import type { CommentContent } from '@/types/comment';

type CommentApiResponse = ApiResponse<CommentContent>;

export const requestGetComments = async (episodeId: number): Promise<CommentContent> => {
  const res = await instance.get<CommentApiResponse>(`episodes/${episodeId}/comments`);
  return res.data.data.content;
};

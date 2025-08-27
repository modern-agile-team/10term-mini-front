// /apis/comment.ts

import { instance } from '@/apis/axios';
import type { ApiResponse } from '@/types/api';
import type {
  CommentContent,
  NewCommentRequest,
  NewCommentResponse,
  Comment,
} from '@/types/comment';

type CommentApiResponse = ApiResponse<CommentContent>;
type CreateCommentApiResponse = ApiResponse<NewCommentResponse>;
type CommentReactionApiResponse = ApiResponse<{
  myReaction: 'like' | 'dislike' | null;
}>;
type UpdateCommentApiResponse = ApiResponse<Comment>;
type DeleteCommentApiResponse = ApiResponse<{
  message: string;
}>;

export const requestGetComments = async (episodeId: number): Promise<CommentContent> => {
  const res = await instance.get<CommentApiResponse>(`episodes/${episodeId}/comments`);
  return res.data.data.content;
};

export const requestCreateComment = async (
  episodeId: number,
  data: NewCommentRequest,
): Promise<NewCommentResponse> => {
  const res = await instance.post<CreateCommentApiResponse>(`episodes/${episodeId}/comments`, data);
  return res.data.data.content;
};

export const requestToggleCommentReaction = async (
  commentId: number,
  type: 'like' | 'dislike' | null,
): Promise<{ myReaction: 'like' | 'dislike' | null }> => {
  const res = await instance.put<CommentReactionApiResponse>(`comments/${commentId}/reaction`, {
    type,
  });
  return res.data.data.content;
};

export const requestUpdateComment = async (
  commentId: number,
  content: string,
): Promise<UpdateCommentApiResponse['data']['content']> => {
  const res = await instance.patch<UpdateCommentApiResponse>(`comments/${commentId}`, {
    content,
  });
  return res.data.data.content;
};

export const requestDeleteComment = async (commentId: number): Promise<string | undefined> => {
  const res = await instance.delete<DeleteCommentApiResponse>(`comments/${commentId}`);
  return res.data.data.message;
};

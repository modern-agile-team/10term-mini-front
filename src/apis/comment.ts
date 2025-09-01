import { instance } from '@/apis/axios';
import type { ApiResponse } from '@/types/api';
import type {
  CommentContent,
  NewCommentRequest,
  NewCommentResponse,
  Comment,
} from '@/types/comment';

export const requestGetComments = async (episodeId: number): Promise<CommentContent> => {
  const res = await instance.get<ApiResponse<CommentContent>>(`episodes/${episodeId}/comments`);
  return res.data.data.content;
};

export const requestCreateComment = async (
  episodeId: number,
  data: NewCommentRequest,
): Promise<NewCommentResponse> => {
  const res = await instance.post<ApiResponse<NewCommentResponse>>(
    `episodes/${episodeId}/comments`,
    data,
  );
  return res.data.data.content;
};

export const requestToggleCommentReaction = async (
  commentId: number,
  type: 'like' | 'dislike' | null,
): Promise<{ myReaction: 'like' | 'dislike' | null }> => {
  const res = await instance.put<ApiResponse<{ myReaction: 'like' | 'dislike' | null }>>(
    `comments/${commentId}/reaction`,
    { type },
  );

  return res.data.data.content;
};

export const requestUpdateComment = async (
  commentId: number,
  content: string,
): Promise<Comment> => {
  const res = await instance.patch<ApiResponse<Comment>>(`comments/${commentId}`, { content });
  return res.data.data.content;
};

export const requestDeleteComment = async (commentId: number): Promise<string | undefined> => {
  const res = await instance.delete<ApiResponse<{ message: string }>>(`comments/${commentId}`);
  return res.data.data.message;
};

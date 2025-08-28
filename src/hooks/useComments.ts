import { useState, useCallback } from 'react';
import {
  requestGetComments,
  requestCreateComment,
  requestUpdateComment,
  requestDeleteComment,
  requestToggleCommentReaction,
} from '@/apis/comment';
import type { CommentContent, NewCommentRequest } from '@/types/comment';

export const useComments = (episodeId: number) => {
  const [comments, setComments] = useState<CommentContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!episodeId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const data = await requestGetComments(episodeId);
      setComments(data);
    } catch (err) {
      console.error('댓글 데이터를 불러오는 중 오류 발생:', err);
      setError('댓글을 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [episodeId]);

  const addComment = useCallback(
    async (content: string, parentId: number | null = null) => {
      try {
        const newCommentData: NewCommentRequest = {
          content: content.trim(),
          parentId,
        };

        await requestCreateComment(episodeId, newCommentData);
        await fetchComments();
        return true;
      } catch (error) {
        console.error('댓글 작성 실패:', error);
        throw error;
      }
    },
    [episodeId, fetchComments],
  );

  const updateComment = useCallback(
    async (commentId: number, content: string) => {
      try {
        await requestUpdateComment(commentId, content);
        await fetchComments();
        return true;
      } catch (error) {
        console.error('댓글 수정 실패:', error);
        throw error;
      }
    },
    [fetchComments],
  );

  const deleteComment = useCallback(
    async (commentId: number) => {
      try {
        await requestDeleteComment(commentId);
        await fetchComments();
        return true;
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
        throw error;
      }
    },
    [fetchComments],
  );

  const toggleReaction = useCallback(
    async (
      commentId: number,
      currentReaction: 'like' | 'dislike' | null,
      type: 'like' | 'dislike',
      updateLocalReaction: (newReaction: 'like' | 'dislike' | null) => void,
    ) => {
      try {
        if (!localStorage.getItem('user')) {
          throw new Error('로그인이 필요합니다.');
        }

        // 서버로는 항상 'like' 또는 'dislike'만 전송
        const newType = type;

        // 낙관적 업데이트: UI에서 선택 취소 처리
        const optimisticReaction = currentReaction === type ? null : type;
        updateLocalReaction(optimisticReaction);

        // 서버에 요청 전송
        await requestToggleCommentReaction(commentId, newType);
      } catch (error) {
        console.error('댓글 반응 업데이트 실패:', error);
        // 실패 시 UI를 원래 상태로 복구
        updateLocalReaction(currentReaction);
        throw error;
      }
    },
    [],
  );

  return {
    comments,
    isLoading,
    error,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
    toggleReaction,
  };
};

export default useComments;

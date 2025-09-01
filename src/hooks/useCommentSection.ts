import { useState, useEffect, useCallback } from 'react';
import { requestGetComments } from '@/apis/comment';
import type { CommentContent } from '@/types/comment';

const useCommentSection = (episodeId: number) => {
  const [commentData, setCommentData] = useState<CommentContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

      // 로그인 상태 확인 후 reaction.userReaction 초기화
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user) {
        data.comments.forEach((comment) => {
          comment.reaction.userReaction = comment.reaction.userReaction || null;
          comment.children.forEach((child) => {
            child.reaction.userReaction = child.reaction.userReaction || null;
          });
        });
      }

      setCommentData(data);
    } catch (err) {
      console.error('댓글 데이터를 불러오는 중 오류 발생:', err);
      setError('댓글을 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [episodeId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { commentData, isLoading, error, fetchComments };
};

export default useCommentSection;

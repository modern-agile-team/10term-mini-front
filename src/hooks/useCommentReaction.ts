import { useState } from 'react';
import { requestToggleCommentReaction } from '@/apis/comment';
import type { Comment } from '@/types';

const useCommentReaction = (initialComment: Comment) => {
  const [optimisticComment, setOptimisticComment] = useState(initialComment);

  const handleReaction = async (type: 'like' | 'dislike', onFailure?: () => void) => {
    try {
      const currentReaction = optimisticComment.reaction.userReaction;

      const updateLocalReaction = (newReaction: 'like' | 'dislike' | null) => {
        setOptimisticComment((prev) => ({
          ...prev,
          reaction: {
            ...prev.reaction,
            userReaction: newReaction,
            likeCount:
              prev.reaction.likeCount +
              (newReaction === 'like' ? 1 : currentReaction === 'like' ? -1 : 0),
            dislikeCount:
              prev.reaction.dislikeCount +
              (newReaction === 'dislike' ? 1 : currentReaction === 'dislike' ? -1 : 0),
          },
        }));
      };

      await requestToggleCommentReaction(optimisticComment.id, type);
      updateLocalReaction(type);
    } catch (error) {
      console.error('댓글 반응 업데이트 실패:', error);
      alert('댓글 반응 업데이트에 실패했습니다.');
      onFailure?.();
    }
  };

  return { optimisticComment, handleReaction };
};

export default useCommentReaction;

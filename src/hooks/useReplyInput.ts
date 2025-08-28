import { useState } from 'react';
import { requestCreateComment } from '@/apis/comment';
import type { Comment, NewCommentRequest } from '@/types/comment';

const useReplyInput = (
  parentId: number,
  episodeId: number,
  currentUser: { username: string; nickname: string },
  onReplySuccess?: () => void,
) => {
  const [replyComment, setReplyComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 500) {
      alert('댓글은 500자까지 작성할 수 있습니다.');
      return;
    }
    setReplyComment(value);
  };

  const createTempComment = (content: string): Comment => ({
    id: Date.now(),
    content,
    parentId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      userId: -1,
      username: currentUser.username,
      nickname: currentUser.nickname,
    },
    reaction: {
      likeCount: 0,
      dislikeCount: 0,
      userReaction: null,
    },
    children: [],
  });

  const handleSubmitReply = async (
    onOptimisticUpdate: (tempComment: Comment) => void = () => {},
  ) => {
    const trimmed = replyComment.trim();
    if (!trimmed || isSubmitting) return;

    const tempComment = createTempComment(trimmed);

    try {
      setIsSubmitting(true);
      onOptimisticUpdate(tempComment);

      const newReplyData: NewCommentRequest = {
        content: trimmed,
        parentId,
      };

      await requestCreateComment(episodeId, newReplyData);
      setReplyComment('');
      onReplySuccess?.();
    } catch (error) {
      console.error('답글 작성 실패:', error);
      alert('답글 작성에 실패했습니다. 다시 시도해주세요.');
      onReplySuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { replyComment, handleChangeReply, handleSubmitReply, isSubmitting };
};

export default useReplyInput;

import { useState } from 'react';
import { requestUpdateComment } from '@/apis/comment';

const useCommentEdit = (initialContent: string) => {
  const [editContent, setEditContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 500) {
      alert('댓글은 500자까지 작성할 수 있습니다.');
      return;
    }
    setEditContent(value);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(initialContent);
  };

  const handleSubmitEdit = async (commentId: number, onSuccess: () => void = () => {}) => {
    try {
      if (!editContent.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }
      console.log('Submitting edit for commentId:', commentId, 'with content:', editContent);
      const updatedContent = await requestUpdateComment(commentId, editContent);
      console.log('Updated content:', updatedContent);
      setIsEditing(false);
      onSuccess();
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  return {
    editContent,
    isEditing,
    setIsEditing,
    handleEditContent,
    handleCancelEdit,
    handleSubmitEdit,
  };
};

export default useCommentEdit;

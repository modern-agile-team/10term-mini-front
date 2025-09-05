import { requestDeleteComment } from '@/apis/comment';

const useCommentDelete = () => {
  const handleDelete = async (commentId: number, onSuccess?: () => void) => {
    try {
      const confirmDelete = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
      if (!confirmDelete) return;

      await requestDeleteComment(commentId);
      onSuccess?.();
    } catch (error) {
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  return { handleDelete };
};

export default useCommentDelete;

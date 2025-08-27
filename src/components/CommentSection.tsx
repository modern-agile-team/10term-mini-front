import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { requestGetComments } from '@/apis/comment';
import type { CommentContent } from '@/types/comment';
import CommentCard from './CommentCard';

const CommentSection = ({ episodeId }: { episodeId: number }) => {
  const [commentInput, setCommentInput] = useState('');

  const [commentData, setCommentData] = useState<CommentContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!episodeId) {
      setIsLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await requestGetComments(episodeId);
        setCommentData(data);
      } catch (err) {
        console.error('댓글 데이터를 불러오는 중 오류 발생:', err);
        setError('댓글을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [episodeId]);

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 500) return;
    setCommentInput(value);
  };

  const handleSubmitComment = () => {
    const trimmed = commentInput.trim();
    if (!trimmed) return;
    console.log('댓글 전송됨.', trimmed);
    // TODO: 여기에 댓글 작성 API 호출 로직 추가
    setCommentInput('');
  };

  const maskUsername = (username: string) => {
    if (!username) return '***';
    return username.slice(0, 4) + '****';
  };

  if (isLoading) {
    return <div className="w-2/3">댓글을 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="w-2/3 text-red-500">{error}</div>;
  }

  return (
    <div className="w-2/3">
      {/* 댓글 수 동적 표시 */}
      <div className="flex items-center">
        <span className="text-2xl">댓글</span>
        <span className="ml-1 text-2xl text-site-red font-bold">
          {commentData?.totalCount ?? 0}
        </span>
        <button className="h-6 w-6rounded-full">
          <ArrowPathIcon className="h-5 w-5 ml-2 border rounded-full text-gray-400" />
        </button>
      </div>

      {/* 댓글 입력창 (기존 UI 재사용) */}
      <div className="w-full h-[200px] mt-4 p-4 rounded-md border-2">
        <div>
          <span>Lacryma</span> {/* 로그인된 사용자 정보로 변경 필요 */}
          <span>({'myid****'})</span>
        </div>
        <div className="py-2">
          <textarea
            className="w-full h-[80px] resize-none rounded-md overflow-y-scroll focus:outline-none"
            placeholder="주제와 무관한 내용 및 악플은 삭제될 수 있습니다"
            value={commentInput}
            onChange={handleChangeComment}
          />
        </div>
        <div className="flex justify-end items-center text-gray-500">
          <span className={`${commentInput.length >= 500 ? 'text-site-red' : ''}`}>
            {commentInput.length}
          </span>
          /500
          <button
            className={`h-8 w-8 ml-3 rounded-full flex items-center justify-center ${commentInput ? 'bg-site-red' : 'bg-gray-300'}`}
            onClick={handleSubmitComment}
          >
            <PaperAirplaneIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* 댓글 리스트 */}
      <div className="mt-20">
        <span className="font-semibold">전체댓글</span>
        <hr className="mt-2" />

        {/* 댓글 카드 컴포넌트 사용 */}
        {commentData?.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import type { Comment } from '@/types/comment';

interface ReplyCardProps {
  childComment: Comment;
  maskUsername: (username: string) => string;
}

const ReplyCard = ({ childComment, maskUsername }: ReplyCardProps) => {
  return (
    <div className="flex p-5 border-t border-b border-gray-300 bg-gray-200">
      <span className="text-gray-400">ㄴ</span>
      <div className="py-2 ml-2 w-full">
        <div className="flex flex-col">
          <div className="text-base">
            <span>{childComment.user.nickname}</span>
            <span>({maskUsername(childComment.user.username)})</span>
          </div>
          <span className="text-gray-500 text-sm">
            {new Date(childComment.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="my-3">
          <p className="whitespace-pre-wrap">{childComment.content}</p>
        </div>
        <div className="flex justify-end items-center mt-3">
          <div className="flex items-center">
            <button className="flex items-center px-2 py-1 ml-4 bg-gray-100">
              <HandThumbUpIcon
                className={`w-4 h-4 ${
                  childComment.reaction.userReaction === 'like' ? 'text-blue-500' : 'text-gray-300'
                }`}
              />
              <span className="ml-2 text-sm">{childComment.reaction.likeCount}</span>
            </button>
            <button className="flex items-center px-2 py-1 ml-4 bg-gray-100">
              <HandThumbDownIcon
                className={`w-4 h-4 ${
                  childComment.reaction.userReaction === 'dislike'
                    ? 'text-red-500'
                    : 'text-gray-300'
                }`}
              />
              <span className="ml-2 text-sm">{childComment.reaction.dislikeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;

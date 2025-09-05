import { useState } from 'react';

const useCommentInput = (initialValue: string, maxLength: number = 500) => {
  const [commentInput, setCommentInput] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > maxLength) {
      alert(`댓글은 ${maxLength}자까지 작성할 수 있습니다.`);
      return;
    }
    setCommentInput(value);
  };

  const resetInput = () => setCommentInput('');

  return { commentInput, handleChange, resetInput };
};

export default useCommentInput;

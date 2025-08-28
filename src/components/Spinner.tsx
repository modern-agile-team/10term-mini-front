import React from 'react';
import SpinnerIcon from '@/assets/spinner.svg';

const Spinner: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <img src={SpinnerIcon} alt="로딩 중" className="animate-spin h-8 w-8" />
      {message && <p className="mt-2 text-gray-500 text-sm">{message}</p>}
    </div>
  );
};

export default Spinner;

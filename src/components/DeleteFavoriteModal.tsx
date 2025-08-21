import { XMarkIcon } from '@heroicons/react/24/outline';

interface DeleteFavoriteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteFavoriteModal = ({ onConfirm, onCancel }: DeleteFavoriteModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-bold">
      <div className="bg-white p-6 rounded shadow-md w-[500px] relative">
        <div className="flex justify-end">
          <XMarkIcon onClick={onCancel} className="w-8 cursor-pointer" />
        </div>

        <p className="text-center text-lg mt-4">
          관심웹툰에서 <br /> 삭제하시겠습니까?
        </p>
        <div className="mt-8 text-lg font-md flex-wrap justify-end gap-2">
          <button
            onClick={onConfirm}
            className="bg-site-red text-white px-4 py-2 rounded w-[450px] h-[70px]"
          >
            삭제
          </button>
          <button
            onClick={onCancel}
            className="mt-2 bg-gray-100 text-gray-500 px-4 py-2 rounded w-[450px] h-[70px]"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFavoriteModal;

import { useEffect } from 'react';

type Props = {
  isModalOpen: boolean;
  selectedImage: string;
  closeModal: () => void;
};

export default function GaleriModal({
  isModalOpen,
  selectedImage,
  closeModal,
}: Props) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="animate-scaleIn relative max-h-[90vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={selectedImage}
          alt="Preview"
          className="h-full w-full rounded-lg object-contain shadow-2xl"
        />

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 rounded-full bg-white/90 p-3 text-gray-700 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white"
          title="Tutup (ESC)"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

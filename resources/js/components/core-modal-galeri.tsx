type Props = {
  isModalOpen: boolean;
  selectedImage: string;
  closeModal: () => void;
};

export default function GalleryModal({ isModalOpen, selectedImage, closeModal }: Props) {
  if (!isModalOpen) return null;

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black" onClick={closeModal}>
      <div className="relative flex h-full w-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img src={selectedImage} alt="Full Size" className="h-full w-full object-contain" />
        <button onClick={closeModal} className="absolute top-4 right-4">
          <img src="/images/icons/cancel.png" alt="cancel" className="h-10 w-10 rounded-full bg-white p-2" />
        </button>
      </div>
    </div>
  );
}

import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function useQrDeactivate(qrId?: number) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openModal = () => setShowConfirmModal(true);
  const closeModal = () => setShowConfirmModal(false);

  const confirmDeactivate = () => {
    closeModal();
    if (qrId) {
      router.post(
        route('qr.deactivate', { id: qrId }),
        {},
        {
          preserveScroll: true,
        },
      );
    }
  };

  return {
    showConfirmModal,
    openModal,
    closeModal,
    confirmDeactivate,
  };
}

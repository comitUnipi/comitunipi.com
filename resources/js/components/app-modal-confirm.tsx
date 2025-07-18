import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
    open: boolean;
    title?: string;
    description?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ModalConfirm({
    open,
    title = 'Konfirmasi Hapus',
    description = 'Apakah kamu yakin ingin menghapus data ini?',
    onCancel,
    onConfirm,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent className="mx-4 sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <p>{description}</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" onClick={onCancel}>
                        Batal
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Ya, Hapus
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

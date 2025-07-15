import { CheckCircle2, XCircle } from 'lucide-react';

interface Props {
    message: string;
    type?: 'success' | 'error';
    visible: boolean;
}

export default function ToastNotification({ message, type, visible }: Props) {
    if (!visible) return null;

    return (
        <div
            className={`fixed top-4 right-4 z-50 flex max-w-sm items-center gap-2 rounded-lg p-3 text-sm text-white shadow-lg sm:p-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-in fade-in slide-in-from-top-5`}
        >
            {type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            ) : (
                <XCircle className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            )}
            <span className="break-words">{message}</span>
        </div>
    );
}

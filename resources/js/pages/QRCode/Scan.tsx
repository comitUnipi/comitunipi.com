import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';

export default function Scan() {
    const html5QrCodeRef = useRef(null);
    const isScanningRef = useRef(false);

    const [scannerActive, setScannerActive] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [generalError, setGeneralError] = useState('');
    const { errors, flash } = usePage().props;

    const startScanner = async () => {
        setGeneralError('');
        setSuccessMessage('');

        try {
            const devices = await Html5Qrcode.getCameras();
            if (!devices || devices.length === 0) {
                setGeneralError('Tidak ada kamera yang tersedia.');
                return;
            }

            const selectedDevice =
                devices.find((device) => device.label.toLowerCase().includes('back') || device.label.toLowerCase().includes('rear')) || devices[0];

            const html5QrCode = new Html5Qrcode('reader');
            html5QrCodeRef.current = html5QrCode;

            await html5QrCode.start(selectedDevice.id, { fps: 10, qrbox: { width: 250, height: 250 } }, handleScanSuccess, handleScanError);

            isScanningRef.current = true;
            setScannerActive(true);
        } catch (e) {
            setGeneralError('Gagal mengakses kamera. Pastikan izin kamera sudah diberikan.');
        }
    };

    const stopScanner = async () => {
        try {
            await html5QrCodeRef.current?.stop();
            await html5QrCodeRef.current?.clear();
        } catch (_) {
            // ignore
        } finally {
            isScanningRef.current = false;
            setScannerActive(false);
        }
    };

    const handleScanSuccess = async (decodedText) => {
        if (!isScanningRef.current) return;

        await stopScanner();

        router.post(
            route('qr.scan.store'),
            {
                token: decodedText,
                status: 'masuk',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    const time = new Date().toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    });
                    setSuccessMessage(`✅ Scan berhasil pada ${time}`);
                },
                onError: () => {
                    setGeneralError('Terjadi kesalahan saat memproses scan.');
                },
            },
        );
    };

    const handleScanError = (errorMessage) => {
        if (!errorMessage.includes('NotFoundException')) {
            console.warn('Scan error:', errorMessage);
        }
    };

    useEffect(() => {
        return () => {
            stopScanner();
        };
    }, []);

    useEffect(() => {
        if (flash?.message) {
            setGeneralError(flash.message);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={[{ title: 'Scan QR Code', href: '/qr-code/scan' }]}>
            <Head title="Scan QR Code" />
            <div className="max-w-xl p-6">
                <h1 className="mb-4 text-2xl font-bold">Scan QR Code</h1>

                {successMessage && (
                    <div className="mb-4 rounded bg-green-100 p-3 text-green-800">
                        <div className="flex items-center space-x-2">
                            <span>✅</span>
                            <span>{successMessage}</span>
                        </div>
                    </div>
                )}

                {generalError && <div className="mb-4 rounded bg-red-100 p-3 text-red-800">{generalError}</div>}

                {errors && Object.keys(errors).length > 0 && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-800">
                        <ul className="list-inside list-disc">
                            {Object.values(errors).map((err, index) => (
                                <li key={index}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mb-4 space-x-2">
                    {!scannerActive && (
                        <button onClick={startScanner} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            {successMessage ? 'Scan Lagi' : 'Mulai Scan'}
                        </button>
                    )}
                    {scannerActive && <span className="text-sm text-green-600">✅ Scanner aktif. Arahkan kamera ke QR code.</span>}
                </div>

                <div className="relative mb-4">
                    <div id="reader" className="rounded border shadow-sm" />
                </div>
            </div>
        </AppLayout>
    );
}

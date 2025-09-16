export default function useQrPreview(qrCodeSvg?: string) {
  const previewQr = () => {
    if (!qrCodeSvg) return;

    const newWindow = window.open('', '_blank', 'width=300,height=300');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>QR Preview</title></head>
          <body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh">
            ${qrCodeSvg}
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return previewQr;
}

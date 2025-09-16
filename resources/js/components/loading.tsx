export default function Loading() {
  return (
    <div className="fixed top-0 left-0 z-[9999] flex h-full w-full items-center justify-center bg-white">
      <div className="absolute h-[250px] w-[250px] animate-spin rounded-full border-4 border-white/30 border-t-[#3498db]"></div>
      <img
        src="/images/logo/logo_black.png"
        alt=" "
        className="pointer-events-none absolute z-10 h-[150px] w-[150px]"
      />
    </div>
  );
}

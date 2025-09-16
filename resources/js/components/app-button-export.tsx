export default function ButtonExport({ exportUrl }: { exportUrl: string }) {
  return (
    <a
      href={exportUrl}
      className="flex items-center rounded-md bg-green-600 px-3 py-2 text-sm text-white shadow-lg hover:bg-green-700"
      download
    >
      <svg
        className="mr-2 h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span className="sm:inline">Export CSV</span>
    </a>
  );
}

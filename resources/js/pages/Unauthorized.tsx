import { Head } from '@inertiajs/react';

export default function Unauthorized() {
  return (
    <>
      <Head title="403 - Unauthorized" />
      <div className="bg-primary flex min-h-screen flex-col items-center justify-center px-4">
        <div className="bg-primary w-full max-w-md rounded-lg p-6 text-center shadow-lg">
          <div className="mb-4 flex justify-center">
            <svg
              className="h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            403 - Unauthorized
          </h1>
          <p className="mb-6 text-gray-600">
            You do not have permission to access this page.
          </p>
          <button
            onClick={() => window.history.back()}
            className="rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

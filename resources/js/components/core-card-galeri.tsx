import { useState } from 'react';

type Props = {
  item: {
    src: string;
    alt: string;
  };
  openModal: () => void;
  index?: number;
};

export default function GaleriCard({ item, openModal, index = 0 }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="group relative transform cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      onClick={openModal}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.src}
          alt={item.alt}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="scale-75 transform rounded-full bg-white/90 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100">
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="mt-3 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
}

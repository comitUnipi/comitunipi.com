type Props = {
  img: string;
  title: string;
  description: string;
};

export default function KegiatanCard({ img, title, description }: Props) {
  return (
    <article className="group mb-12 overflow-hidden">
      <div className="relative flex flex-col gap-8 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50/30 p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/30 md:flex-row md:items-center md:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative md:w-1/2">
          <div className="overflow-hidden rounded-xl shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-200/40">
            <img
              src={img}
              alt={title}
              className="h-64 w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 md:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className="absolute -top-3 -right-3 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-xl">
            <img
              src="/images/logo/logo_black.png"
              alt="logo comit"
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-700/10 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        </div>
        <div className="relative flex-1 space-y-4 md:pl-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 group-hover:w-16" />
              <span className="text-sm font-medium text-blue-600 transition-colors duration-300">Event</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800 md:text-3xl lg:text-4xl">
              {title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700 md:text-lg">{description}</p>
        </div>
        <div className="absolute -right-2 -bottom-2 h-20 w-20 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-70" />
        <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-gradient-to-br from-cyan-200/20 to-blue-200/20 blur-lg transition-all duration-700 group-hover:scale-125 group-hover:opacity-60" />
      </div>
    </article>
  );
}

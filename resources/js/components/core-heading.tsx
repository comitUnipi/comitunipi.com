export default function Heading({ img }: { img: string }) {
    return (
        <div className="relative z-0 w-full bg-black px-5 py-48">
            <div className="relative z-10 mx-auto max-w-xl text-center text-white">
                <h1 id="text" className="mb-4 text-5xl font-bold italic lg:text-7xl">
                    Community of Information Technology
                </h1>
                <p className="mb-3 text-lg">Semangat Comit, Salam Teknologi!!</p>
                <a href="/register" className="mt-3 inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg text-white">
                    Gabung Sekarang
                </a>
            </div>
            <img src={img} alt="background" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        </div>
    );
}

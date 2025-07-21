type Props = {
    img: string;
    title: string;
    description: string;
};

export default function KegiatanCard({ img, title, description }: Props) {
    return (
        <article>
            <div className="mb-10 flex flex-col items-center gap-6 md:flex-row md:items-start">
                <img src={img} alt="kegiatan" className="h-auto w-full rounded-md shadow-md md:w-1/2" />
                <div className="md:max-w-3xl">
                    <h2 className="mb-4 text-2xl text-black font-bold">{title}</h2>
                    <p className="text-md mb-4 text-justify text-gray-700">{description}</p>
                </div>
            </div>
        </article>
    );
}

type Props = {
    subtitle: string;
    title: string;
    description: string;
};

export default function SubHeading({ title, subtitle, description }: Props) {
    return (
        <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[620px] text-center">
                <span className="text-gray-700 mb-2 block text-lg font-semibold">{subtitle}</span>
                <h2 id="text-heading" className="mb-4 text-5xl font-bold md:text-[42px] text-black">
                    {title}
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 sm:text-xl sm:leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

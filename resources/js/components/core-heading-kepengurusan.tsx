export default function KepengurusanHeading({ jobdesk }: { jobdesk: string }) {
    return (
        <div className="container mx-auto mb-[100px] max-w-[620px] px-2 text-center">
            <span className="mb-2 block text-lg font-semibold text-black">Perkenalkan</span>
            <h2 id="text-heading" className="mb-4 text-5xl font-bold text-black md:text-[60px]">
                {jobdesk}
            </h2>
            <p className="text-md leading-relaxed text-gray-700 sm:text-xl sm:leading-relaxed">
                Kepengurusan COMIT 2024-2025 <br /> (Sahitya Arsa).
            </p>
        </div>
    );
}

import React from 'react';

interface Pengurus {
    id: number;
    nama: string;
    job: string;
    img: string;
}

interface Props {
    pengurus: Pengurus;
}

const KepengurusanCard: React.FC<Props> = ({ pengurus }) => {
    return (
        <div className="w-full px-4 sm:w-1/2 lg:w-1/3">
            <div className="mb-10 flex flex-col items-center">
                <div className="relative z-10 mx-auto mb-6 rounded-full">
                    <img src={pengurus.img} alt={pengurus.nama} className="h-[280px] w-[280px] rounded-full object-cover" />
                </div>
                <div className="text-center">
                    <h4 className="mb-2 text-3xl font-medium text-black">{pengurus.nama}</h4>
                    <p className="mb-5 text-lg font-medium text-gray-700">{pengurus.job}</p>
                    <div className="flex items-center justify-center">{/* Optional icons */}</div>
                </div>
            </div>
        </div>
    );
};

export default KepengurusanCard;

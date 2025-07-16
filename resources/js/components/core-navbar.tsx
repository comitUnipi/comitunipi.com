import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isKepengurusanOpen, setIsKepengurusanOpen] = useState(false);
    const [isMobileKepengurusanOpen, setIsMobileKepengurusanOpen] = useState(false);

    const { auth } = usePage<SharedData>().props;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleKepengurusan = () => {
        setIsKepengurusanOpen(!isKepengurusanOpen);
    };

    const toggleMobileKepengurusan = () => {
        setIsMobileKepengurusanOpen(!isMobileKepengurusanOpen);
    };

    const kepengurusan = [
        { label: 'Ketua & Wakil Ketua Umum', href: '#' },
        { label: 'Sekretaris', href: '#' },
        { label: 'Bendahara', href: '#' },
        { label: 'SDM', href: '#' },
        { label: 'Humas Internal', href: '#' },
        { label: 'Humas Eksternal', href: '#' },
        { label: 'Koordinator', href: '#' },
        { label: 'Kominfo', href: '#' },
        { label: 'Staff Design Grafis', href: '#' },
        { label: 'Staff Programming', href: '#' },
        { label: 'Staff Comp & Network', href: '#' },
        { label: 'Staff Microsoft Office', href: '#' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-blue-600 shadow-lg backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <a href="/" className="h-16 w-16 object-contain sm:h-20 sm:w-20">
                        <img className="h-16 w-16 object-contain sm:h-20 sm:w-20" src="/logo_white.png" alt="Logo" />
                    </a>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a
                                href="/visi-dan-misi"
                                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Visi dan Misi
                            </a>

                            <div className="relative">
                                <button
                                    onClick={toggleKepengurusan}
                                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    Kepengurusan
                                    <ChevronDown
                                        size={16}
                                        className={`ml-1 transform transition-transform ${isKepengurusanOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {isKepengurusanOpen && (
                                    <div className="ring-opacity-5 absolute left-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
                                        {kepengurusan.map((item, index) => (
                                            <a
                                                key={index}
                                                href={item.href}
                                                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <a
                                href="#"
                                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Mentor Kami
                            </a>
                            <a
                                href="#"
                                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Kegiatan
                            </a>
                            <a
                                href="#"
                                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Galeri
                            </a>
                        </div>
                    </div>

                    <div className="hidden items-center space-x-4 md:flex">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm leading-normal font-medium text-white transition-colors hover:bg-white/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-md border border-transparent px-4 py-2 text-sm leading-normal font-medium text-white transition-colors hover:bg-white/10"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm leading-normal font-medium text-white transition-colors hover:bg-white/20"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="rounded-md p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 border-t border-white/20 bg-blue-600/95 px-2 pt-2 pb-3 backdrop-blur-md sm:px-3">
                        <a
                            href="/visi-dan-misi"
                            className="block rounded-md px-3 py-2 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Visi dan Misi
                        </a>

                        <div>
                            <button
                                onClick={toggleMobileKepengurusan}
                                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Kepengurusan
                                <ChevronDown size={16} className={`transform transition-transform ${isMobileKepengurusanOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isMobileKepengurusanOpen && (
                                <div className="mt-1 ml-4 space-y-1">
                                    {kepengurusan.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Mentor Kami
                        </a>
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Kegiatan
                        </a>
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Galeri
                        </a>
                    </div>

                    <div className="border-t border-white/20 bg-blue-600/95 px-2 pt-2 pb-3 backdrop-blur-md">
                        <div className="flex items-center justify-around">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm leading-normal font-medium text-white transition-colors hover:bg-white/20"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-md border border-transparent px-4 py-2 text-sm leading-normal font-medium text-white transition-colors hover:bg-white/10"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm leading-normal font-medium text-white transition-colors hover:bg-white/20"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

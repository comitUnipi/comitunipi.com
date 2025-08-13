import { useState } from 'react';

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/comit.ipem/',
      icon: '/images/icons/instagram_2.png',
      color: 'from-pink-500 to-purple-600',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@comit_unipi',
      icon: '/images/icons/tiktok.png',
      color: 'from-gray-800 to-gray-900',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/comitUnipi',
      icon: '/images/icons/github.png',
      color: 'from-gray-700 to-gray-900',
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-blue-600">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 h-72 w-72 animate-pulse rounded-full bg-blue-500 mix-blend-multiply blur-xl filter"></div>
        <div className="absolute top-0 right-0 h-72 w-72 animate-pulse rounded-full bg-purple-500 mix-blend-multiply blur-xl filter delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 h-72 w-72 animate-pulse rounded-full bg-pink-500 mix-blend-multiply blur-xl filter delay-2000"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="animate-float absolute h-2 w-2 rounded-full bg-white opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20 lg:pt-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="mb-6 flex items-center gap-6">
                  <div className="group cursor-pointer">
                    <img
                      src="/images/logo/logo_white.png"
                      alt="logo"
                      className="max-w-[160px] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                  <a href="https://unipem.ac.id/" target="_blank" className="group block">
                    <img src="/images/logo/unipi.png" alt="unipi" className="max-w-[100px] transition-transform duration-300 group-hover:scale-105" />
                  </a>
                </div>

                <p className="mb-8 text-lg leading-relaxed text-blue-100">Pelajari lebih dalam tentang ilmu teknologi dan komputer bersama kami</p>

                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${social.color} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100`}
                      ></div>
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                        <img src={social.icon} alt={social.name} className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      {hoveredSocial === index && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform rounded bg-black/80 px-2 py-1 text-xs whitespace-nowrap text-white">
                          {social.name}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="relative mb-6 text-xl font-bold text-white">
                Tentang Kami
                <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { text: 'Visi dan Misi', href: '/visi-dan-misi' },
                  { text: 'Mentor Kami', href: '/mentor-kami' },
                  { text: 'Kegiatan Kami', href: '/kegiatan-kami' },
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="group flex items-center text-blue-100 transition-all duration-300 hover:text-white">
                      <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-all duration-300 group-hover:scale-125 group-hover:bg-white"></span>
                      <span className="relative">
                        {item.text}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="relative mb-6 text-xl font-bold text-white">
                Events
                <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-gradient-to-r from-blue-400 to-transparent"></div>
              </h4>
              <ul className="space-y-3">
                {['Workshop Data Analyst', 'Workshop Arduino', 'LDC - Latihan Dasar COMIT'].map((event, index) => (
                  <li key={index}>
                    <a className="group flex cursor-pointer items-center text-blue-100 transition-all duration-300 hover:text-white">
                      <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-all duration-300 group-hover:scale-125 group-hover:bg-white"></span>
                      <span className="relative">
                        {event}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 pb-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex flex-wrap gap-6">
                <a className="group relative text-blue-100 transition-colors duration-300 hover:text-white">
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a className="group relative text-blue-100 transition-colors duration-300 hover:text-white">
                  Terms of Service
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-blue-100">
                <span>© 2024 </span>
                <div className="flex items-center gap-2">
                  <img src="/images/icons/github.png" alt="github" className="h-5 w-5" />
                  <a
                    href="https://github.com/comitUnipi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-300 transition-colors duration-300 hover:text-white"
                  >
                    Community of Information Technology
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}
      </style>
    </footer>
  );
}

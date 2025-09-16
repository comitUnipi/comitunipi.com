type Sosmed = {
  id: number;
  link: string;
  icon: string;
};

type Mentor = {
  img: string;
  nama: string;
  job: string;
  sosmed: Sosmed[];
};

type Props = {
  mentor: Mentor;
};

export default function MentorCard({ mentor }: Props) {
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-1/4">
      <div className="mb-10">
        <div className="relative z-10 mx-auto mb-6 h-[170px] w-[170px] rounded-full">
          <img
            src={mentor.img}
            alt="image"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="text-center">
          <h4 className="mb-2 text-xl font-medium text-black">{mentor.nama}</h4>
          <p className="mb-5 text-sm font-medium text-gray-700">{mentor.job}</p>
          <div className="flex items-center justify-center">
            {mentor.sosmed.map((sosmed) => (
              <div
                key={sosmed.id}
                className="mr-3"
              >
                <a
                  href={sosmed.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={sosmed.icon}
                    alt="icon"
                    className="h-6 w-6 hover:scale-110"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

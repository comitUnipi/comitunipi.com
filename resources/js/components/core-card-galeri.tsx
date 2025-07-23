type Props = {
  item: {
    src: string;
    alt: string;
  };
  openModal: () => void;
};

export default function GaleriCard({ item, openModal }: Props) {
  return (
    <div className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg" onClick={openModal}>
      <img src={item.src} alt={item.alt} className="h-full w-full transform object-cover transition-transform hover:scale-110" />
    </div>
  );
}

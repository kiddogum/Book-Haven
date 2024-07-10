type HeroCardsProps = {
  img: string;
  title: string;
  author: string;
};

const HeroCards = ({ img, title, author }: HeroCardsProps) => {
  return (
    <div className=" w-[30%] flex flex-col gap-2">
      <img
        src={img}
        className="object-cover brightness-75 h-[350px] border-black border-2 rounded-t-full"
      />
      <h2 className="text-subtitle text-center">{title}</h2>
      <p className="text-desc text-center">{author}</p>
    </div>
  );
};

export default HeroCards;
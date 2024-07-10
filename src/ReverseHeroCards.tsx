type ReverseHeroCardsProps = {
  img: string;
  title: string;
  author: string;
};

const ReverseHeroCards = ({ img, title, author }: ReverseHeroCardsProps) => {
  return (
    <div className=" w-[30%] flex flex-col">
      <h2 className="text-subtitle text-center">{title}</h2>
      <p className="text-desc text-center">{author}</p>
      <img
        src={img}
        className="object-cover brightness-75 h-[350px] mt-2 border-black border-2 rounded-b-full sm:!h-[200px]"
      />
    </div>
  );
};

export default ReverseHeroCards;

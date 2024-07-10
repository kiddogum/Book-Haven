import HeroCards from "./HeroCards";
import ReverseHeroCards from "./ReverseHeroCards";

const BookCollection = () => {
  const cardCollections = [
    {
      id: 123,
      title: "lorem",
      author: "lorem",
    },
    {
      id: 421,
      title: "lorem",
      author: "lorem",
    },
    {
      id: 457,
      title: "lorem",
      author: "lorem",
    },
    {
      id: 127,
      title: "lorem",
      author: "lorem",
    },
    {
      id: 163,
      title: "lorem",
      author: "lorem",
    },
    {
      id: 742,
      title: "lorem",
      author: "lorem",
    },
    {
      id: 612,
      title: "lorem",
      author: "lorem",
    },
    {
      id: 363,
      title: "lorem",
      author: "lorem",
    },
    {
      id: 315,
      title: "lorem",
      author: "lorem",
    },
  ];
  return (
    <div className="absolute -top-1/2 -left-[10%] w-2/3 flex flex-wrap justify-between gap-y-6 rotate-[15deg] lg:w-1/2 md:hidden">
      {cardCollections.map((card, i) =>
        i % 2 === 0 ? (
          <ReverseHeroCards
            img={`https://picsum.photos/id/${card.id}/200`}
            title={card.title}
            author={card.author}
            key={i}
          />
        ) : (
          <HeroCards
            img={`https://picsum.photos/id/${card.id}/200`}
            title={card.title}
            author={card.author}
            key={i}
          />
        )
      )}
    </div>
  );
};

export default BookCollection;

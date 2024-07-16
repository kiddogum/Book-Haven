import notFound from "./assets/notfound.png";

type BookCardsProps = {
  img: string | undefined;
  retailPrice: RetailPrice;
  title: string;
  authors: string[];
};

type RetailPrice = {
  amount: number;
  currencyCode: string;
};

const BookCards = ({ img, retailPrice, title, authors }: BookCardsProps) => {
  return (
    <a className="min-w-[200px] bg-white p-4 flex flex-col cursor-pointer hover:bg-primary lg:min-w-[180px] md:!p-1 sm:!min-w-[120px]">
      <img
        src={img ? img : notFound}
        className="object-cover w-full aspect-[1/1.5] border-2 border-black"
      />
      <h2 className="text-sm font-bold">{title}</h2>{" "}
      <h2 className="text-base sm:text-sm ">
        {retailPrice
          ? `${new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(retailPrice.amount)}`
          : `Unknown Price`}
      </h2>
      <p className="text-sm">By: {authors ? authors[0] : `Unknown Author`}</p>
      <button className="black-button mt-2 text-sm ">Add</button>
    </a>
  );
};

export default BookCards;

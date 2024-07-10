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
  const newTitle = title.length > 30 ? `${title.substring(0, 30)}...` : title;

  return (
    <div className=" bg-white p-8 flex flex-col hover:bg-primary lg:p-4 md:!p-1">
      <div className="book-card w-[250px] h-[300px] lg:w-[200px] sm:!w-[150px] sm:!h-[200px]">
        <img
          src={img}
          className="object-cover w-full h-full border-2 border-black"
        />
      </div>
      <div className="mt-2 flex justify-between items-center md:flex-col md:items-start">
        <h2 className="text-sm font-bold">{newTitle}</h2>{" "}
        <h2 className="text-base sm:text-sm ">
          {retailPrice
            ? `${new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(retailPrice.amount)}`
            : `Unknown Price`}
        </h2>
      </div>
      <p className="text-sm">By: {authors ? authors[0] : `Unknown Author`}</p>
      <button className="black-button mt-2 text-sm ">Add</button>
    </div>
  );
};

export default BookCards;

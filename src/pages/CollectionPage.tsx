import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ImSpinner } from "react-icons/im";
import BookCards from "../BookCards";

const CollectionPage = ({ books, isLoading, sendDataToApp }: any) => {
  const [titleSearch, setTitleSearch] = useState<string>("");
  const [authorSearch, setAuthorSearch] = useState<string>("");
  const [orderBy, setOrderBy] = useState("relevance");
  const [printType, setPrintType] = useState("all");
  const [startIndex, setStartIndex] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const searchQueries = {
      titleSearch: titleSearch,
      authorSearch: authorSearch,
      orderBy: orderBy,
      printType: printType,
      startIndex: startIndex,
    };
    sendDataToApp(searchQueries);
  };

  const pagination = Math.ceil(books.totalItems / 20);

  return (
    <div className="responsive-container flex">
      <form
        className="fixed h-dvh w-1/5 p-2 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="title" className="text-subtitle">
            Book Title:
          </label>
          <input
            id="title"
            type="text"
            className="collection-input"
            placeholder="search book title here..."
            onChange={(e) => {
              setTitleSearch(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="author" className="text-subtitle">
            Book Author:
          </label>
          <input
            id="author"
            type="text"
            className="collection-input"
            placeholder="search book author here..."
            onChange={(e) => setAuthorSearch(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sorting" className="text-subtitle">
            Order by:
          </label>
          <div className="relative">
            <select
              name="sorting"
              id="sorting"
              onChange={(e) => setOrderBy(e.target.value)}
              className="collection-select"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
            </select>
            <IoIosArrowDown className="absolute top-1/2 -translate-y-1/2 right-[3%] text-secondary text-2xl" />
          </div>
        </div>
        <div>
          <label htmlFor="type" className="text-subtitle">
            Print Type:
          </label>
          <div className="relative">
            <select
              name="type"
              id="type"
              className="collection-select"
              onChange={(e) => setPrintType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="book">Book</option>
              <option value="magazine">Magazine</option>
            </select>
            <IoIosArrowDown className="absolute top-1/2 -translate-y-1/2 right-[3%] text-secondary text-2xl" />
          </div>
        </div>
        <button type="submit" className="black-button items-center">
          Search
        </button>
      </form>

      <div className="ml-[25%] grid grid-cols-3">
        {isLoading ? (
          <ImSpinner className="w-full flex items-center text-9xl animate-spin" />
        ) : (
          books?.items.map((book: any) => (
            <BookCards
              img={book.volumeInfo.imageLinks?.thumbnail}
              retailPrice={book.saleInfo.retailPrice}
              title={book.volumeInfo.title}
              authors={book.volumeInfo.authors}
              key={book.id}
            />
          ))
        )}
        <div className="flex grid-span-full">
          {Array.from({ length: pagination }).map((_, i) => {
            const pageNumber = i + 1;
            const currentPage = startIndex + 1;

            if (
              pageNumber <= 3 || // First 3 pages
              pageNumber > pagination - 3 || // Last 3 pages
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) // 1 page before and after current page
            ) {
              return (
                <button
                  key={i}
                  className={`px-1 bg-slate-50 border-2 border-black border-solid ${[
                    currentPage === pageNumber && `!bg-slate-400`,
                  ]}`}
                  onClick={() => setStartIndex(pageNumber - 1)}
                >
                  {pageNumber}
                </button>
              );
            } else if (pageNumber === 4 || pageNumber === pagination - 3) {
              return <span key={i}>...</span>;
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;

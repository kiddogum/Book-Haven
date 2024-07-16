import { useState, useEffect } from "react";
import { ImSpinner } from "react-icons/im";
import BookCards from "../BookCards";

const CollectionPage = ({ books, isLoading, sendDataToApp, queries }: any) => {
  const [startIndex, setStartIndex] = useState(0);
  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    if (books) {
      console.log(books);
      setPagination(Math.ceil(books.totalItems / 24));
      setStartIndex(0);
    }
  }, [queries.titleSearch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const searchQueries = {
      titleSearch: queries.titleSearch,
      authorSearch: queries.authorSearch,
      orderBy: queries.orderBy,
      printType: queries.printType,
      startIndex: startIndex,
    };

    sendDataToApp(searchQueries);
  };

  return (
    <div className="responsive-container pt-24">
      {isLoading && <ImSpinner className="spinner" />}
      {books && books.items && (
        <>
          <p className="text-subtitle">Books found: {books.totalItems}</p>
          <div className=" grid grid-cols-6 lg:grid-cols-4 sm:!grid-cols-2">
            {books?.items.map((book: any) => (
              <BookCards
                img={book.volumeInfo.imageLinks?.thumbnail}
                retailPrice={book.saleInfo.retailPrice}
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors}
                key={book.id}
              />
            ))}
            <form
              className="w-full mt-12 flex col-span-full gap-1 justify-center "
              onSubmit={handleSubmit}
            >
              {Array.from({ length: pagination }).map((_, i) => {
                const pageNumber = i + 1;
                const currentPage = startIndex + 1;

                if (
                  pageNumber <= 3 ||
                  pageNumber >= pagination - 2 ||
                  (pageNumber >= currentPage - 3 &&
                    pageNumber <= currentPage + 3)
                ) {
                  return (
                    <button
                      type="submit"
                      key={i}
                      className={`px-2 bg-slate-50 border-2 border-black border-solid ${[
                        currentPage === pageNumber && `!bg-slate-400`,
                      ]}`}
                      onClick={() => setStartIndex(pageNumber - 1)}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                if (
                  (pageNumber >= 3 && pageNumber <= 4) ||
                  (pageNumber <= pagination - 2 && pageNumber >= pagination - 3)
                ) {
                  return (
                    <button
                      type="submit"
                      key={i}
                      className={`px-2 bg-slate-50 border-2 border-black border-solid ${[
                        currentPage === pageNumber && `!bg-slate-400`,
                      ]}`}
                    >
                      ...
                    </button>
                  );
                }
              })}
            </form>
          </div>{" "}
        </>
      )}
      {!isLoading && (!books || !books.items) && (
        <h1 className="text-title2 text-center">No books found</h1>
      )}
    </div>
  );
};

export default CollectionPage;

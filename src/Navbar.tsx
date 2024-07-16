import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

const Navbar = ({ sendDataToApp }: any) => {
  const location = useLocation();
  const [Expand, setExpand] = useState(false);
  const [queries, setQueries] = useState("");
  const [author, setAuthor] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");
  const [printType, setPrintType] = useState("all");
  const [advanceExpand, setAdvanceExpand] = useState(false);

  const handleQueries = (e: React.FormEvent) => {
    e.preventDefault();
    const searchQueries = {
      titleSearch: queries,
      authorSearch: author,
      orderBy: orderBy,
      printType: printType,
      startIndex: 0,
    };
    console.log(searchQueries);
    sendDataToApp(searchQueries);
  };

  return (
    <section className="fixed w-full z-10 navbar bg-primary">
      <div className="responsive-container min-h-0 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-logo">Book Haven</h2>
            {location.pathname === "/Book-Haven/collection" ? (
              <form
                onSubmit={handleQueries}
                className="relative flex items-center gap-2"
              >
                <div className="relative sm:hidden">
                  <input
                    type="text"
                    className="ghost-input"
                    placeholder="search..."
                    onChange={(e) => setQueries(e.target.value)}
                  />
                  <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-2xl " />
                </div>
                <div className="relative">
                  <button
                    className="text-desc flex gap-1"
                    type="button"
                    onClick={() => setAdvanceExpand((prev) => !prev)}
                  >
                    Advanced{" "}
                    <RiArrowDownSLine className="mt-1 text-secondary text-xl" />
                  </button>

                  {advanceExpand && (
                    <div className="absolute top-14 right-0 bg-white p-4 z-[999] border-solid border-secondary sm:-right-10">
                      <label className="text-desc">Book Search: </label>
                      <input
                        type="text"
                        placeholder="search..."
                        className="line-input"
                        onChange={(e) => setQueries(e.target.value)}
                      />
                      <label className="text-desc">Author Search: </label>
                      <input
                        type="text"
                        placeholder="search..."
                        className="line-input"
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                      <label className="text-desc">Order By: </label>
                      <select
                        className="navbar-select"
                        onChange={(e) => setOrderBy(e.target.value)}
                      >
                        <option value="relevance">relevance</option>
                        <option value="newest">newest</option>
                      </select>
                      <label className="text-desc">Print Type: </label>
                      <select
                        className="navbar-select"
                        onChange={(e) => setPrintType(e.target.value)}
                      >
                        <option value="all">all</option>
                        <option value="books">books</option>
                        <option value="magazines">magazines</option>
                      </select>
                      <button
                        type="submit"
                        className="black-button block mx-auto mt-2"
                      >
                        Search
                      </button>
                    </div>
                  )}
                </div>
              </form>
            ) : (
              ""
            )}
          </div>

          <ul className="nav-list ">
            <li className="text-nav-item">
              <Link to="/Book-Haven/">Home</Link>
            </li>
            <li className="text-nav-item">
              <Link to="/Book-Haven/collection">Collection</Link>
            </li>
            <li className="text-nav-item">
              <Link to="/Book-Haven/wishlist">Wishlist</Link>
            </li>
          </ul>

          <IoMenuSharp
            className="hidden text-2xl cursor-pointer md:block"
            onClick={() => setExpand(true)}
          />

          {Expand && (
            <ul className="mobile-nav">
              <BiX
                className="collapse-mobile"
                onClick={() => setExpand(false)}
              />
              <li className="text-mobile">
                <Link to="/Book-Haven/">Home</Link>
              </li>
              <li className="text-mobile">
                <Link to="/Book-Haven/collection">Collection</Link>
              </li>
              <li className="text-mobile">
                <Link to="/Book-Haven/wishlist">Wishlist</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;

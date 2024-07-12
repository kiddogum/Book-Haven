import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [Expand, setExpand] = useState(false);
  return (
    <section className="fixed w-full z-10 navbar bg-primary">
      <div className="responsive-container min-h-0 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-logo">Book Haven</h2>

          <ul className="nav-list sm:hidden">
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
            className="hidden text-2xl cursor-pointer sm:block"
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

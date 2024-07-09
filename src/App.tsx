import { useEffect, useState, useRef } from "react";
import BookCards from "./BookCards";
import { motion, useMotionValue } from "framer-motion";
import { ImSpinner } from "react-icons/im";

interface VolumeList {
  kind: string;
  totalItems: number;
  items: Volume[];
}

interface Volume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

interface VolumeInfo {
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  pageCount?: number;
  categories?: string[];
  imageLinks?: ImageLinks;
  language: string;
  // Add other properties as needed
}

interface IndustryIdentifier {
  type: string;
  identifier: string;
}

interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  // Add other image sizes as needed
}

interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  retailPrice: RetailPrice;
  // Add other sale info properties as needed
}

interface RetailPrice {
  amount: number;
  currencyCode: string;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  // Add other access info properties as needed
}

interface SearchInfo {
  textSnippet?: string;
}

const App = () => {
  const [books, setBooks] = useState<VolumeList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const categories = [
    "romance",
    "mystery",
    "pirate",
    "think",
    "space",
    "earth",
    "first",
    "children",
    "haunted",
  ];
  const x = useMotionValue(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scrollWidth = sliderRef.current?.scrollWidth;
  const offsetWidth = sliderRef.current?.offsetWidth;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const randomCategories =
        categories[Math.floor(Math.random() * categories.length)];

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${randomCategories}&projection=lite&printType=books&key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
      console.log(data!.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-dvh">
      <section className="navbar bg-primary">
        <div className="responsive-container min-h-0 py-4">
          <div className="flex justify-between">
            <h2 className="text-logo">Book Haven</h2>

            <ul className="nav-list">
              <li className="text-nav-item">
                <a href="">Home</a>
              </li>
              <li className="text-nav-item">
                <a href="">Collection</a>
              </li>
              <li className="text-nav-item">
                <a href="">Wishlist</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="hero bg-primary">
        <div className="responsive-container">
          <div className="flex items-center justify-between mt-6  ">
            <div className="w-1/2 self-center flex flex-col gap-6">
              <h1 className="text-title">Find Your Next Book</h1>
              <p className="w-3/4 text-desc">
                Discover Your Next Favorite Read with Personalized
                Recommendations, Curated Collections, and a Vibrant Community of
                Book Lovers.
              </p>
              <button className="black-button">Explore Now</button>
            </div>
            {isLoading ? (
              <ImSpinner className="w-1/2 flex items-center text-9xl animate-spin" />
            ) : (
              <div className="w-1/2 flex justify-between">
                <div className=" w-[30%] flex flex-col gap-2">
                  <img
                    src={books?.items[0].volumeInfo.imageLinks?.thumbnail}
                    className="object-cover brightness-75 h-[350px] border-black border-2 rounded-t-full"
                  />
                  <h2 className="text-subtitle text-center">
                    {books?.items[0].volumeInfo.title}
                  </h2>
                  <p className="text-desc text-center">
                    {books?.items[0].volumeInfo.authors
                      ? books?.items[0].volumeInfo.authors[0]
                      : ""}
                  </p>
                </div>
                <div className="w-[30%] flex flex-col gap-2">
                  <h2 className="text-subtitle text-center">
                    {books?.items[1].volumeInfo.title}
                  </h2>
                  <p className="text-desc text-center">
                    {books?.items[1].volumeInfo.authors
                      ? books?.items[1].volumeInfo.authors[0]
                      : "Unknown Author"}
                  </p>
                  <img
                    src={books?.items[1].volumeInfo.imageLinks?.thumbnail}
                    className="object-cover brightness-75 h-[350px] border-black border-2 rounded-b-full"
                  />
                </div>
                <div className=" w-[30%] flex flex-col gap-2">
                  <img
                    src={books?.items[2].volumeInfo.imageLinks?.thumbnail}
                    className="object-cover brightness-75 h-[350px] border-black border-2 rounded-t-full"
                  />
                  <h2 className="text-subtitle text-center">
                    {books?.items[2].volumeInfo.title}
                  </h2>
                  <p className="text-desc text-center">
                    {books?.items[2].volumeInfo.authors
                      ? books?.items[2].volumeInfo.authors[0]
                      : ""}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="discover bg-white">
        <div className="responsive-container">
          <div className="flex justify-between items-center">
            <h1 className="text-title2">Discover</h1>
            <p className="text-nav-item">See More</p>
          </div>
          <motion.div
            className="flex gap-12 mt-8"
            drag="x"
            dragConstraints={{ left: -(scrollWidth! - offsetWidth!), right: 0 }}
            style={{ x }}
            ref={sliderRef}
          >
            {isLoading ? (
              <ImSpinner className="w-full flex items-center text-9xl animate-spin" />
            ) : (
              books?.items.map((book) => (
                <BookCards
                  img={book.volumeInfo.imageLinks?.thumbnail}
                  retailPrice={book.saleInfo.retailPrice}
                  title={book.volumeInfo.title}
                  authors={book.volumeInfo.authors}
                  key={book.id}
                />
              ))
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default App;

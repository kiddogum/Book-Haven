import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ImSpinner } from "react-icons/im";
import rowling from "./assets/author_rowling.jpg";
import orwell from "./assets/author_orwell.jpg";
import austen from "./assets/author_austen.jpg";
import bird from "./assets/book_bird.jpg";
import eightyFour from "./assets/book_1984.jpg";
import gatsby from "./assets/book_gatsby.jpg";
import AuthorCards from "./AuthorCards";
import BookCards from "./BookCards";
import HeroCards from "./HeroCards";
import ReverseHeroCards from "./ReverseHeroCards";
import BookCollection from "./BookCollection";

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
  const y = useMotionValue(0);
  const discoverSliderRef = useRef<HTMLDivElement | null>(null);
  const discoverScrollWidth = discoverSliderRef.current?.scrollWidth;
  const discoverOffsetWidth = discoverSliderRef.current?.offsetWidth;

  const authorSliderRef = useRef<HTMLDivElement | null>(null);
  const authorScrollWidth = authorSliderRef.current?.scrollWidth;
  const authorOffsetWidth = authorSliderRef.current?.offsetWidth;

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
    <div className="relative w-full min-h-dvh overflow-x-hidden">
      <section className="fixed w-full z-10 navbar bg-primary">
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
          <div className="flex items-center justify-between pt-24  ">
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
                <HeroCards
                  img={bird}
                  title={`To Kill a Mockingbird`}
                  author={`Harper Lee`}
                />
                <ReverseHeroCards
                  img={eightyFour}
                  title={`1984`}
                  author={`George Orwell`}
                />
                <HeroCards
                  img={gatsby}
                  title={`The Great Gatsby`}
                  author={`F. Scott Fitzgerald`}
                />
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
          <div className="book-slider">
            <motion.div
              className=" flex mt-8"
              drag="x"
              dragConstraints={{
                left: -(discoverScrollWidth! - discoverOffsetWidth!),
                right: 0,
              }}
              style={{ x }}
              ref={discoverSliderRef}
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
        </div>
      </section>

      <section className="author relative">
        <div className="responsive-container">
          <div className="flex justify-between items-center">
            <h1 className="text-title2">Get to Know</h1>
            <p className="text-nav-item">See More</p>
          </div>

          <div className="author-slider bg-secondary">
            <motion.div
              className=" relative h-[350px] mt-8 flex "
              drag="x"
              dragConstraints={{
                left: -(authorScrollWidth! - authorOffsetWidth!),
                right: 0,
              }}
              style={{ y }}
              ref={authorSliderRef}
            >
              <AuthorCards
                img={rowling}
                name={`J.K. Rowling`}
                about={`Joanne Rowling, better known by her pen name J.K. Rowling, is a British author best known for creating the Harry Potter series. Born on July 31, 1965, Rowling's journey to fame is a true rags-to-riches story, as she wrote the first book as a single mother living on welfare.`}
              />
              <AuthorCards
                img={orwell}
                name={`George Orwell`}
                about={`Eric Arthur Blair, known by his pen name George Orwell, was an English novelist, essayist, journalist, and critic. Born on June 25, 1903, Orwell is best known for his allegorical novella "Animal Farm" and his dystopian novel "1984".`}
              />
              <AuthorCards
                img={austen}
                name={`Jane Austen`}
                about={`Jane Austen was an English novelist known for her keen observations of domestic life and social manners. Born on December 16, 1775, her novels, including "Pride and Prejudice", "Sense and Sensibility", and "Emma", offer a critique of the British landed gentry at the end of the 18th century.`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative event bg-secondary overflow-y-hidden">
        <BookCollection />
        <div className="responsive-container min-h-[450px] flex items-center justify-end ">
          <div className="w-1/3 pt-12 pr-12 text-primary text-center border-solid border-b-0 border-l-0 border-primary lg:w-1/2">
            <h2 className="text-title2">Online Book Fairs 2024</h2>
            <p className="text-desc mt-4">
              Explore a world of literature from the comfort of your home with
              Online Book Fairs 2024. This year's virtual book fairs bring
              together readers, authors, and publishers from around the globe to
              celebrate the joy of reading.
            </p>
            <button className="outline-button mt-4">Explore Now</button>
          </div>
        </div>
      </section>

      <section className="footer bg-white">
        <div className="responsive-container min-h-max">
          <div className="flex justify-between">
            <ul className=" flex flex-col gap-3">
              <h2 className="footer-subtitle">Company</h2>
              <li className="text-desc">
                <a href="#">About Us</a>
              </li>
              <li className="text-desc">
                <a href="#">Contact Us</a>
              </li>
              <li className="text-desc">
                <a href="#">Company</a>
              </li>
            </ul>

            <ul className=" flex flex-col gap-3">
              <h2 className="footer-subtitle">Help</h2>
              <li className="text-desc">
                <a href="#">Help Center</a>
              </li>
              <li className="text-desc">
                <a href="#">Problem with the Website</a>
              </li>
            </ul>

            <ul className=" flex flex-col gap-3">
              <h2 className="footer-subtitle">Follow Us</h2>
              <li className="text-desc">
                <a href="#">Instagram</a>
              </li>
              <li className="text-desc">
                <a href="#">Facebook</a>
              </li>
              <li className="text-desc">
                <a href="#">Twitter</a>
              </li>
            </ul>

            <div className="w-1/4 flex flex-col gap-3">
              <h2 className="footer-subtitle">Contact Us</h2>
              <form action="POST" className="flex flex-col gap-3">
                <input
                  type="text"
                  className="outline-input"
                  placeholder="enter your email here..."
                />
                <button className="footer-button" type="submit">
                  Send Email
                </button>
              </form>
            </div>
          </div>

          <hr className="mt-12 border-secondary border-solid opacity-10" />

          <h2 className="text-logo mt-8  text-center">Book Haven</h2>
        </div>
      </section>
    </div>
  );
};

export default App;

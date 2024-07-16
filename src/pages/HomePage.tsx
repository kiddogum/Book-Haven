import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ImSpinner } from "react-icons/im";
import rowling from "../assets/author_rowling.jpg";
import orwell from "../assets/author_orwell.jpg";
import austen from "../assets/author_austen.jpg";
import bird from "../assets/book_bird.jpg";
import eightyFour from "../assets/book_1984.jpg";
import gatsby from "../assets/book_gatsby.jpg";
import AuthorCards from "../AuthorCards";
import BookCards from "../BookCards";
import HeroCards from "../HeroCards";
import ReverseHeroCards from "../ReverseHeroCards";
import BookCollection from "../BookCollection";

const HomePage = ({ books, isLoading }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const discoverSliderRef = useRef<HTMLDivElement | null>(null);
  const discoverScrollWidth = discoverSliderRef.current?.scrollWidth;
  const discoverOffsetWidth = discoverSliderRef.current?.offsetWidth;

  const authorSliderRef = useRef<HTMLDivElement | null>(null);
  const authorScrollWidth = authorSliderRef.current?.scrollWidth;
  const authorOffsetWidth = authorSliderRef.current?.offsetWidth;

  return (
    <div className="relative w-full min-h-dvh overflow-x-hidden">
      <section className="hero bg-primary">
        <div className="responsive-container">
          <div className="flex items-center justify-between pt-24 lg:pt-16 md:flex-col md:text-center sm:pt-0">
            <div className="w-1/2 self-center flex flex-col md:w-full">
              <h1 className="text-title">Find Your Next Book</h1>
              <p className="text-desc w-3/4 mt-2 md:w-full">
                Discover Your Next Favorite Read with Personalized
                Recommendations, Curated Collections, and a Vibrant Community of
                Book Lovers.
              </p>
              <button className="black-button mt-6 md:mx-auto">
                Explore Now
              </button>
            </div>

            <div className="w-1/2 flex justify-between md:w-full md:mt-12">
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
              className=" flex mt-8 md:mt-4"
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

          <div className="author-slider bg-secondary h-[350px] md:h-[400px] sm:!h-max sm:!py-6 sm:mt-4">
            <motion.div
              className=" relative mt-8 flex gap-12 md:mt-6 sm:!mt-0 "
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
        <div className="responsive-container min-h-[450px] flex items-center justify-end md:min-h-max ">
          <div className="w-1/3 pt-12 pr-12 text-primary text-center border-solid border-b-0 border-l-0 border-primary lg:w-1/2 md:min-w-full sm:px-4 sm:pt-4">
            <h2 className="text-title2">Online Book Fairs 2024</h2>
            <p className="text-desc mt-2  ">
              Explore a world of literature from the comfort of your home with
              Online Book Fairs 2024. This year's virtual book fairs bring
              together readers, authors, and publishers from around the globe to
              celebrate the joy of reading.
            </p>
            <button className="outline-button mt-6">Explore Now</button>
          </div>
        </div>
      </section>

      <section className="footer bg-white">
        <div className="responsive-container min-h-max">
          <div className="flex justify-between md:flex-wrap sm:gap-6">
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

            <div className="footer-contact w-1/4 flex flex-col gap-3 md:w-full md:mt-12">
              <h2 className="footer-subtitle">Contact Us</h2>
              <form action="POST" className="relative flex md:w-1/2 sm:!w-full">
                <input
                  type="email"
                  className="outline-input"
                  placeholder="email..."
                />
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

export default HomePage;

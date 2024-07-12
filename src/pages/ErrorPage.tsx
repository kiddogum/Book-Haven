import { IoIosWarning } from "react-icons/io";

const ErrorPage = () => {
  return (
    <div className="responsive-container flex flex-col items-center justify-center text-center sm:pt-32">
      <IoIosWarning className="text-9xl mx-auto" />
      <h1 className="text-title2">Page not found</h1>
      <p className="text-subtitle mt-2">please use the correct url</p>
    </div>
  );
};

export default ErrorPage;

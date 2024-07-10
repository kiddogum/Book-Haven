type AuthorCardsProps = {
  img: string;
  name: string;
  about: string;
};

const AuthorCards = ({ img, name, about }: AuthorCardsProps) => {
  return (
    <div className=" flex">
      <div className=" h-max m-12 pb-4 pl-4 border-primary border-solid border-t-0 border-r-0 border-b-2 border-l-2">
        <p className="text-desc text-primary">Name:</p>
        <h2 className="text-subtitle text-primary">{name}</h2>
        <p className="text-desc mt-2 text-primary">About the Author:</p>
        <p className="w-[500px] text-desc text-primary">{about}</p>
      </div>

      <div className="w-[300px] h-[450px]">
        <img
          src={img}
          className="object-cover w-full h-full rounded-b-full border-secondary border-8"
        />
      </div>
    </div>
  );
};

export default AuthorCards;
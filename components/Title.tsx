import { TitleProps } from "../model/bookModel";

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="flex justify-center items-center text-lg md:text-2xl font-bold ">
      <h1>{title}</h1>
    </div>
  );
};

export default Title;

import { TitleProps } from "../model/bookModel";

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="flex justify-center items-center text-2xl font-bold bg-red-300">
      <h1>{title}</h1>
    </div>
  );
};

export default Title;

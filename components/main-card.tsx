import { IWord } from "@/interfaces";

interface IProps {
  word: IWord;
}

const MainCard = ({ word }: IProps) => {
  return (
    <div className="shadow-md border border-gray-100 p-4 rounded-md space-y-4">
      <h3 className="text-2xl font-bold">{word.word}</h3>
      <p className="text-base">{word.diacritic}</p>
      <p className="text-lg"> {word.meaning}</p>
      <p>
        مثال: <span className="italic text-sm">{word.example}</span>
      </p>
      <p className="bg-muted text-muted-foreground rounded-full px-2 py-1 w-fit m-auto text-sm">
        من الكلمات قليلة الاستخدام في عصرنا
      </p>
    </div>
  );
};

export default MainCard;

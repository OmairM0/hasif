import { IWord } from "@/interfaces";
import { ChevronLeft } from "lucide-react";

interface IProps {
  word: IWord;
}

export default function WordCard({ word }: IProps) {
  const { word: name, meaning } = word;
  return (
    <div className="border border-border rounded-lg px-2 py-3 flex justify-between items-center cursor-pointer">
      <div>
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="text-sm">{meaning}</p>
      </div>
      <ChevronLeft />
    </div>
  );
}

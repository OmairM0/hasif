import { Input } from "./ui/input";

interface IProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchWord = ({ value, onSearch }: IProps) => {
  return (
    <div className="my-2">
      <Input
        type="text"
        placeholder="ابحث عن كلمة او معناها"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchWord;

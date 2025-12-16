import { Settings } from "lucide-react";
import Logo from "./logo";
import { ReactNode } from "react";

interface IProps {
  title: ReactNode;
  icon?: ReactNode;
}

const Header = ({ title, icon }: IProps) => {
  return (
    <header className="flex justify-between items-center">
      {title}
      {icon}
    </header>
  );
};

export default Header;

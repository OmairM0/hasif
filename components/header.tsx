import { ReactNode } from "react";

interface IProps {
  title: ReactNode;
  icon?: ReactNode;
}

const Header = ({ title, icon }: IProps) => {
  return (
    <header className="flex justify-between items-center">
      {title}

      {icon && (
        <button aria-label="settings" tabIndex={0}>
          {icon}
        </button>
      )}
    </header>
  );
};

export default Header;

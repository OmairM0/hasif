import { ReactNode } from "react";
import ThemeSwitcher from "./theme-switcher";

interface IProps {
  title: ReactNode;
  icon?: ReactNode;
}

const Header = ({ title, icon }: IProps) => {
  return (
    <header className="flex justify-between items-center">
      {title}

      <div className="flex gap-2 items-center">
        <ThemeSwitcher />
        {icon && (
          <button aria-label="settings" tabIndex={0}>
            {icon}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

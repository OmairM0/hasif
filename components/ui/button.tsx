import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type buttonVariant = "primary" | "secondary" | "outline" | "destructive";
type buttonSizes = "sm" | "md" | "lg";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: buttonVariant;
  size?: buttonSizes;
  icon?: ReactNode; // icon on the left
  rightIcon?: ReactNode; // optional: icon on the right
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  rightIcon,
  isLoading = false,
  className,
  ...props
}: IProps) => {
  const variantStyles = {
    primary: "bg-foreground text-white hover:bg-foreground/90",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      )}

      {/* Left Icon */}
      {!isLoading && icon && <span>{icon}</span>}

      {/* Text */}
      <span>{children}</span>

      {/* Right Icon */}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;

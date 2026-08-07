import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  tone?: "dark" | "light";
};

export function Button({ children, className = "", tone = "dark", ...props }: ButtonProps) {
  return <button className={`button button-${tone} ${className}`.trim()} {...props}>{children}</button>;
}

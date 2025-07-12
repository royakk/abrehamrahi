import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";

export interface LinkPropsType {
  children?: ReactNode;
  to: string;
  classsname?: string;
}
export const Link = ({ to, children, classsname }: LinkPropsType) => {
  return (
    <NavLink
      className={twMerge("text-sm text-primaryMain", classsname)}
      to={to}
    >
      {children}
    </NavLink>
  );
};

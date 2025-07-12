import type { LinkPropsType } from "@/Forms";
import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

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

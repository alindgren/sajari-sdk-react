import * as React from "react";

export interface IconProps {
  size?: number | string;
  color?: string;
}

export const SearchIcon: React.SFC<IconProps> = ({ color, size, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

SearchIcon.defaultProps = {
  size: "1.5rem",
  color: "currentcolor"
};

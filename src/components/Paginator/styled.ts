import idx from "idx";
import * as React from "react";
import {
  IStyledProps,
  ITheme,
  override,
  strip,
  styled,
  StyledComponent
} from "../styles";

export const Container = styled("div")({
  margin: "1em 0",
  textAlign: "center"
});

export interface IPageNumberProps {
  isCurrent?: boolean;
}

export const PageNumber = styled<IPageNumberProps, "div">("div")(
  {
    display: "inline",
    padding: 10,
    fontWeight: "bold",
    cursor: "pointer",
    userSelect: "none"
  },
  ({ isCurrent: curr, theme }) => ({
    // @ts-ignore: idx
    color: curr ? idx(theme, _ => _.colors.brand.primary) || "#333" : "#777"
  }),
  override
);

export interface IPageButtonProps {
  isDisabled?: boolean;
}

export const PageButton = styled<IPageButtonProps, "div">("div")(
  {
    display: "inline",
    padding: 10,
    fontWeight: "bold",
    cursor: "pointer",
    userSelect: "none"
  },
  props => ({ color: props.isDisabled ? "#aaa" : "#777" })
);

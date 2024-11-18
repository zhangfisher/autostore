/**
 *  
 */

import React, { forwardRef } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { ReactFC } from "./types";

export type BoxProps = React.PropsWithChildren<{
  visible?: boolean;
  title?: string;
  enable?: boolean;
  ref?:any
}>;

export const Box: ReactFC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { title, enable = true, visible = true } = props;
  return (
    <div
      ref={ref}
      style={{
        display: visible ? 'flex' : 'none',
        position: "relative",
        flexDirection: 'column',
        padding: "16px",
        margin: "16px 8px 8px 8px",
        boxSizing: "border-box",
        border: `1px solid #ccc`,
      }}
    >
      <span
        style={{
          position: 'absolute',
          padding: "2px 4px 2px 4px",
          top: "-16px",
          background: 'white',
          left: "8px",
          color: enable ? '#999' : 'gray'
        }}
      >
        {title || ''}
      </span>
      {props.children}
    </div>
  );
});
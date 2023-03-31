import React from "react";

type Props = {
  type?: any;
  onClick?: any;
  children: any;
  style?: Object;
  variant?: string;
  className?: string;
};

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      style={props.style}
      type={props.type}
      className={`${
        props.variant === "danger"
          ? "bg-red-500 hover:bg-red-700"
          : "bg-blue-500 hover:bg-blue-700"
      } text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline ${
        props.className
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;

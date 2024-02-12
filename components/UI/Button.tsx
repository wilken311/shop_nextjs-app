import React, { ReactElement } from "react";
import Spinner from "./Spinner";

interface IButtonProps {
  black?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
  loading?: boolean;
  onClick?:  React.MouseEventHandler<HTMLButtonElement>;
  
}

const Button: React.FunctionComponent<IButtonProps> = ({
  black,
  children,
  loading,
  onClick
}): ReactElement => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={
        (loading ? "bg-gray-600" : "bg-gray-900") +
        " text-white active:bg-gray-700 disabled text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
      }
      style={{ transition: "all .15s ease" }}
    >
      {loading ? <Spinner /> : <span>{children}</span>}
    </button>
  );
};

export default Button;

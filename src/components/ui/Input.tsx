import React from "react";

const Input = ({ ...rest  }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className=" text-md h-10 w-full rounded-lg border border-gray-300 p-[10px]  shadow-md placeholder:capitalize focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500  "
      {...rest}
    />
  );
};

export default Input;

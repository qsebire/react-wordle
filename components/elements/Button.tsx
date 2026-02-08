import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export function Button({ label, ...props }: ButtonProps) {
  return (
    <button
      className="border border-white rounded-2xl cursor-pointer p-1"
      {...props}
    >
      <div className="text-background bg-white rounded-xl py-2 px-4 font-semibold hover:bg-background hover:text-white transition duration-500 ease-in-out">
        {label}
      </div>
    </button>
  );
}

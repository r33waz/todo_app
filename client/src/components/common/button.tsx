import { ButtonInterface } from "../../interface/buttonInterface";

export const Button = ({ children, className, type }: ButtonInterface) => {
  return (
    <button className={className} type={type} >
      {children}
    </button>
  );
};

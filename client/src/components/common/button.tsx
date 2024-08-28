import { ButtonInterface } from "../../interface/buttonInterface";

export const Button = ({ children, className, type,onClick }: ButtonInterface) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

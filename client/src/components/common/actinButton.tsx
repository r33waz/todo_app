import { Action_Button } from "../../interface/buttonInterface";

export const ActionButton = ({ children, className, type,onClick }: Action_Button) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { ForgetPassword } from "../rtk/authThunk/authThunk";
import { ActionButton } from "../components/common/actinButton";

const Forgetpasword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  const handleSubmit = () => {
    const email = emailRef.current?.value;
    if (!email) {
      setError("Email address is required.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      // Proceed with form submission

      // You can send an email or perform any other action here
      dispatch(ForgetPassword(email));
    }
  };
  return (
    <div className="flex justify-center md:mt-20 items-center md:h-fit h-screen px-2">
      <div className="flex flex-col  p-3 rounded-lg shadow-[0px_2px_9px_3px_#00000024] gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-bold md:text-4xl text-sm">Create new password</h1>
          <p className="text-xs">
            Please enter your email or mobile number to search for your account.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="md:text-lg text-sm">
            Email Address*
          </label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            placeholder="Enter your email"
            className="border border-zinc-500 p-1 rounded-md placeholder:text-sm"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <p className="text-xs text-zinc-400 ">
          Remebered your password?{" "}
          <Link to="/signin" className="text-black">
            Login
          </Link>
        </p>
        <ActionButton
          onClick={handleSubmit}
          className="bg-btn_bg text-white p-2 rounded-md"
        >
          Reset Password
        </ActionButton>
      </div>
    </div>
  );
};

export default Forgetpasword;

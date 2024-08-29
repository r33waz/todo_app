import { Button } from "../components/common/button";

const Forgetpasword = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border  p-2 rounded-lg flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl tracking-wide font-semibold">
            Forgetpasword
          </h1>
          <small>
            Enter your email and we will send you a link to reset your password
          </small>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-1 rounded-lg"
        />
        <Button className=" text-white bg-btn_bg  rounded-lg py-2 px-5 hover:scale-95  duration-300 text-lg w-full" type="button">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Forgetpasword;

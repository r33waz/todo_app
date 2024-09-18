import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../components/common/button";
import {  useNavigate } from "react-router-dom";
import LoginPng from "../assets/gif/Sign up.gif";
import { useEffect, useState } from "react";
import { RegisterInterface } from "../interface/authInterface";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RegisterThunk } from "../rtk/authThunk/authThunk";
import { ActionButton } from "../components/common/actinButton";

function Signup() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showconfirmPass, setShowconfirmPass] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  //schema fro the login page
  const LoginSchema = yup.object({
    email: yup
      .string()
      .required("Email is a required field")
      .email("Enter valid email"),
    username: yup.string().required("Username is a required field"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^[a-zA-Z0-9!@#$%^&*]{8,}$/,
        "Password can only contain letters, numbers, and special characters"
      ),
    confirmPassword: yup
      .string()
      .required("ConfirmPassword is a required field")
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const OnSubmit = (data: RegisterInterface) => {
    dispatch(RegisterThunk(data));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
      <div className="bg-[#ffc897] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Signup</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you not a member, easily register in now.
          </p>

          <form
            onSubmit={handleSubmit(OnSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <input
                id="username"
                className="p-2 mt-8 rounded-lg border text-sm"
                placeholder="Username"
                {...register("username")}
              />
              <small className="text-xs text-red-500">
                {errors.username && errors.username.message}
              </small>
            </div>
            <div className="flex flex-col gap-1">
              <input
                id="email"
                className="p-2  rounded-lg border text-sm"
                placeholder="Email"
                {...register("email")}
              />
              <small className="text-xs text-red-500">
                {errors.email && errors.email.message}
              </small>
            </div>
            <div className="relative">
              <div className="flex flex-col gap-1">
                <input
                  className="p-2 rounded-lg border w-full text-xs"
                  type={showPass ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <small className="text-xs text-red-500">
                  {errors?.password?.message}
                </small>
              </div>
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  className=" absolute top-2 right-3  cursor-pointer z-20 opacity-100"
                  onClick={() => setShowPass(!showPass)}
                >
                  <path
                    fill="currentColor"
                    d="M226 171.47a3.9 3.9 0 0 1-2 .53a4 4 0 0 1-3.47-2l-21.15-37a120 120 0 0 1-41.91 19.53l6.53 38.81a4 4 0 0 1-3.29 4.6a4 4 0 0 1-.67.06a4 4 0 0 1-3.94-3.34l-6.41-38.5a128.2 128.2 0 0 1-43.28 0l-6.41 38.5a4 4 0 0 1-4 3.34a4 4 0 0 1-.67-.06a4 4 0 0 1-3.29-4.6l6.48-38.83A120 120 0 0 1 56.62 133l-21.15 37a4 4 0 0 1-3.47 2a3.9 3.9 0 0 1-2-.53a4 4 0 0 1-1.47-5.47l21.68-37.94a148.2 148.2 0 0 1-21.32-21.56a4 4 0 1 1 6.22-5C52.25 122.71 82.29 148 128 148s75.75-25.29 92.89-46.51a4 4 0 1 1 6.22 5a148.2 148.2 0 0 1-21.32 21.56L227.47 166a4 4 0 0 1-1.47 5.47"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  className=" absolute top-2 right-3  cursor-pointer z-20 opacity-100"
                  onClick={() => setShowPass(!showPass)}
                >
                  <path
                    fill="currentColor"
                    d="M243.66 126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87 72.22 170.7 52 128 52S56.13 72.22 39.17 89.18c-18.31 18.31-26.49 36.44-26.83 37.2a4.08 4.08 0 0 0 0 3.25c.34.77 8.52 18.89 26.83 37.2c17 17 46.14 37.17 88.83 37.17s71.87-20.21 88.83-37.17c18.31-18.31 26.49-36.43 26.83-37.2a4.08 4.08 0 0 0 0-3.25m-32.7 35c-23.07 23-51 34.62-83 34.62s-59.89-11.65-83-34.62A135.7 135.7 0 0 1 20.44 128A135.7 135.7 0 0 1 45 94.62C68.11 71.65 96 60 128 60s59.89 11.65 83 34.62A135.8 135.8 0 0 1 235.56 128A135.7 135.7 0 0 1 211 161.38ZM128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 80a36 36 0 1 1 36-36a36 36 0 0 1-36 36"
                  />
                </svg>
              )}
            </div>
            <div className="relative">
              <div className="flex flex-col gap-1">
                <input
                  className="p-2 rounded-lg border w-full text-xs"
                  type={showconfirmPass ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="confirmPassword"
                  {...register("confirmPassword")}
                />
                <small className="text-xs text-red-500">
                  {errors?.confirmPassword?.message}
                </small>
              </div>
              {showconfirmPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  className=" absolute top-2 right-3  cursor-pointer z-20 opacity-100"
                  onClick={() => setShowconfirmPass(!showconfirmPass)}
                >
                  <path
                    fill="currentColor"
                    d="M226 171.47a3.9 3.9 0 0 1-2 .53a4 4 0 0 1-3.47-2l-21.15-37a120 120 0 0 1-41.91 19.53l6.53 38.81a4 4 0 0 1-3.29 4.6a4 4 0 0 1-.67.06a4 4 0 0 1-3.94-3.34l-6.41-38.5a128.2 128.2 0 0 1-43.28 0l-6.41 38.5a4 4 0 0 1-4 3.34a4 4 0 0 1-.67-.06a4 4 0 0 1-3.29-4.6l6.48-38.83A120 120 0 0 1 56.62 133l-21.15 37a4 4 0 0 1-3.47 2a3.9 3.9 0 0 1-2-.53a4 4 0 0 1-1.47-5.47l21.68-37.94a148.2 148.2 0 0 1-21.32-21.56a4 4 0 1 1 6.22-5C52.25 122.71 82.29 148 128 148s75.75-25.29 92.89-46.51a4 4 0 1 1 6.22 5a148.2 148.2 0 0 1-21.32 21.56L227.47 166a4 4 0 0 1-1.47 5.47"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  className=" absolute top-2 right-3  cursor-pointer z-20 opacity-100"
                  onClick={() => setShowconfirmPass(!showconfirmPass)}
                >
                  <path
                    fill="currentColor"
                    d="M243.66 126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87 72.22 170.7 52 128 52S56.13 72.22 39.17 89.18c-18.31 18.31-26.49 36.44-26.83 37.2a4.08 4.08 0 0 0 0 3.25c.34.77 8.52 18.89 26.83 37.2c17 17 46.14 37.17 88.83 37.17s71.87-20.21 88.83-37.17c18.31-18.31 26.49-36.43 26.83-37.2a4.08 4.08 0 0 0 0-3.25m-32.7 35c-23.07 23-51 34.62-83 34.62s-59.89-11.65-83-34.62A135.7 135.7 0 0 1 20.44 128A135.7 135.7 0 0 1 45 94.62C68.11 71.65 96 60 128 60s59.89 11.65 83 34.62A135.8 135.8 0 0 1 235.56 128A135.7 135.7 0 0 1 211 161.38ZM128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 80a36 36 0 1 1 36-36a36 36 0 0 1-36 36"
                  />
                </svg>
              )}
            </div>
            <Button
              className="bg-btn_bg text-white py-2 rounded-lg hover:scale-105 duration-300 hover:bg-btn_bg/80 font-medium flex justify-center"
              type="submit"
            >
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="3" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle0"
                      attributeName="r"
                      begin="0;svgSpinners6DotsScaleMiddle2.end-0.5s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="16.5" cy="4.21" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle1"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddle0.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="7.5" cy="4.21" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle2"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddle4.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="19.79" cy="7.5" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle3"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddle1.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="4.21" cy="7.5" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle4"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddle6.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="21" cy="12" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle5"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddle3.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="3" cy="12" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle6"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddle8.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="19.79" cy="16.5" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle7"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddle5.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="4.21" cy="16.5" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle8"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddlea.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="16.5" cy="19.79" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddle9"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddle7.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="7.5" cy="19.79" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddlea"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddleb.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                  <circle cx="12" cy="21" r="0" fill="currentColor">
                    <animate
                      id="svgSpinners6DotsScaleMiddleb"
                      attributeName="r"
                      begin="svgSpinners6DotsScaleMiddle9.begin+0.1s"
                      calcMode="spline"
                      dur="0.6s"
                      keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                      values="0;2;0"
                    />
                  </circle>
                </svg>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
          <hr className="border-gray-300" />
          {/* <Button
            className="bg-white border py-2 w-full rounded-lg mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300  font-medium"
            type="button"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Login with Google
          </Button> */}
          <div className="mt-4 text-xs flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0 text-btn_bg">
              Already have an account..
            </p>
            <ActionButton
              className="r text-white bg-btn_bg  rounded-lg py-2 px-5 hover:scale-110   duration-300 text-xs"
              onClick={() => navigate("/")}
            >
              Login
            </ActionButton>
          </div>
        </div>
        <div className="md:block hidden w-1/2  h-[500px]">
          <img
            className="rounded-2xl h-[500px] object-cover"
            src={LoginPng}
            alt="login form image"
          />
        </div>
      </div>
    </section>
  );
}

export default Signup;

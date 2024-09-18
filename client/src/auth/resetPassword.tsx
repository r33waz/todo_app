import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../components/common/button";
import { useAppDispatch } from "../hooks/hooks";
import { Resetpassword } from "../rtk/authThunk/authThunk";
// import { Resetpassword } from "../../../rtk/authrtk/authThunk";
function ResetPassword() {
  const { id, token } = useParams();
  console.log(id, token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const newPasswordSchema = yup.object({
    createpassword: yup
      .string()
      .required("Create your password")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number"
      ),
    confirmPassword: yup
      .string()
      .required("Re-type your password")
      .oneOf([yup.ref("createpassword")], "Passwords must match"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
  });



  const onSubmit = (data: {
    confirmPassword: string;
    createpassword: string;
  }) => {
    console.log(data);
    dispatch(Resetpassword({ id: id ?? "", token: token ?? "", data: data }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <div className="flex justify-center mt-20 items-center md:h-fit  px-2 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-96">
        <div className="flex flex-col  p-3 rounded-lg shadow-[0px_2px_9px_3px_#00000024] gap-3 ">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-bold md:text-4xl text-sm">Forget password ?</h1>
            <p className="text-xs">Enter your new password</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="createpassword" className="md:text-sm text-xs">
              Create New Password*
            </label>
            <input
              type="text"
              id="createpassword"
              placeholder=""
              className="border border-zinc-500 p-1 rounded-md placeholder:text-sm"
              {...register("createpassword")}
            />
            {errors?.createpassword && (
              <small className="text-xs text-start text-red-500">
                {errors?.createpassword?.message}
              </small>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="md:text-sm text-xs">
              Re-type New Password*
            </label>
            <input
              type="text"
              id="confirmPassword"
              placeholder=""
              className="border border-zinc-500 p-1 rounded-md placeholder:text-sm"
              {...register("confirmPassword")}
            />
            {errors?.confirmPassword && (
              <small className="text-xs text-start text-red-500">
                {errors?.confirmPassword?.message}
              </small>
            )}
          </div>
          {/* {resetPasswordLoading ? (
        <Button className="bg-black w-full" loading>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="text-white"
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
        </Button>
      ) : ( */}
          <Button type="submit" className="bg-btn_bg text-white p-2 rounded-md">
            Confirm Password
          </Button>
          {/* )} */}
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;

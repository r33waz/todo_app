import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { SingleUser, UpdateUser } from "../rtk/authThunk/authThunk";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useForm } from "react-hook-form";
import { Button } from "../components/common/button";
import { UpdateData } from "../interface/authInterface";

function ProfileEidit() {
  const dispatch = useAppDispatch();
  const { user, updateLoading, updateSuccess } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(SingleUser(user?._id));
    }
  }, [dispatch, user?._id]);

  const { register, handleSubmit } = useForm<UpdateData>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: "",
      newpassword: "",
    },
  });

  const OnSubmit = async (data: UpdateData) => {
    const userId = user?._id || "";

    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    try {
      await dispatch(UpdateUser({ id: userId, data }));
      dispatch(SingleUser(userId));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center md:h-screen h-96">
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className="flex flex-col md:w-96 w-full bg-[#ffc897] rounded-2xl p-4 shadow-[0px_0px_2px_3px_#00000024]"
      >
        <p className="text-3xl flex items-center gap-3 font-semibold">
          <span>Edit Profile</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 640 512"
          >
            <path
              fill="currentColor"
              d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h293.1c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1h-91.4zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4l71 71l29.4-29.4c15.6-15.6 15.6-40.9 0-56.6zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5.2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4l129.2-129.3l-71-71z"
            />
          </svg>
        </p>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-btn_bg">
              Update Basic Profile
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <input
                id="username"
                className="p-2  rounded-lg border text-sm"
                placeholder="Username"
                defaultValue={user?.username}
                {...register("username")}
              />
              <input
                id="email"
                className="p-2  rounded-lg border text-sm"
                placeholder="Email"
                defaultValue={user?.email}
                {...register("email")}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-btn_bg">
              Update password
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <input
                id="password"
                className="p-2  rounded-lg border text-sm"
                placeholder="Old password"
                {...register("password")}
              />
              <input
                id="newpassword"
                className="p-2  rounded-lg border text-sm"
                placeholder="Create new password"
                {...register("newpassword")}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button
          className="bg-btn_bg text-white py-2 rounded-lg hover:scale-95 duration-300 hover:bg-btn_bg/80 flex justify-center"
          type="submit"
        >
          {updateLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
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
            </svg>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </div>
  );
}

export default ProfileEidit;

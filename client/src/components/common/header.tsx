import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Button } from "../common/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { logout } from "../../rtk/authThunk/authSlice";
import { SuccessToast } from "./toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateTodoInterface } from "../../interface/todoInterface";
import { CreateTodo, GetAllTodo } from "../../rtk/todoThunk/toodoThunk";
import {TimeConverter} from "../../hooks/timeConverter";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
    SuccessToast({ message: "Logout successfully" });
    navigate("/");
  };

  const path = useLocation();

  const editProfile = () => {
    navigate(`/profile`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoInterface>();

  const OnSubmit = async (data: CreateTodoInterface) => {
    try {
      if (user?._id) {
        console.log("Raw Time:", data.time); // Debugging
        const formattedTime = TimeConverter(data.time ?? "");
        console.log("Formatted Time:", formattedTime); // Debugging

        await dispatch(
          CreateTodo({
            data: { ...data, time: formattedTime },
            userId: user._id,
          })
        );
        reset(); // Reset form fields
        setIsDialogOpen(false); // Close the dialog
        dispatch(
          GetAllTodo({
            userId: user?._id,
            data: {},
          })
        );
      } else {
        console.error("User ID is undefined");
        // Optionally, show an error toast
      }
    } catch (error) {
      console.error("Failed to create todo:", error);
      // Optionally, show an error toast
    }
  };

  return (
    <header className="flex justify-between w-full">
      <h3 className="text-3xl font-bold">
        {path.pathname.replace("/", "").toUpperCase()}
      </h3>
      <div className="flex items-center gap-2">
        {/* Dialog Component */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-btn_bg text-white text-xs p-1 rounded-md hover:scale-95 duration-500">
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
              <DialogDescription>
                Turn your tasks into achievements—one to-do at a time!
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex gap-1 flex-col"
              onSubmit={handleSubmit(OnSubmit)}
            >
              <div className="grid flex-1 gap-2">
                <div className="flex flex-col gap-1">
                  <input
                    id="title"
                    className="p-2 rounded-lg border w-full text-xs"
                    type="text"
                    placeholder="Title*"
                    {...register("title", { required: "Title is required" })}
                  />
                  <small className="text-red-500">
                    {errors.title && errors.title.message}
                  </small>
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    id="description"
                    className="p-2 rounded-lg border w-full text-xs"
                    type="text"
                    placeholder="Description*"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  <small className="text-red-500">
                    {errors.description && errors.description.message}
                  </small>
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    id="date"
                    className="p-2 rounded-lg border w-full text-xs"
                    type="date"
                    {...register("date")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    id="time"
                    className="p-2 rounded-lg border w-full text-xs"
                    type="time"
                    {...register("time")}
                  />
                </div>
                {/* dropdown to select the important of not */}
                <div className="flex flex-col gap-1">
                  <select
                    id="important"
                    className="p-2 rounded-lg border w-full text-xs"
                    {...register("important")}
                    defaultValue="false"
                  >
                    <option value="">Select an option</option>
                    <option value="false">Not Important</option>
                    <option value="true">Important</option>
                  </select>
                </div>
              </div>
              <DialogFooter className="mt-2">
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-red-500 text-white rounded-lg p-1.5 text-sm"
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-btn_bg text-white rounded-lg p-1.5 text-sm"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.196 17.485q1.275-.918 2.706-1.451Q10.332 15.5 12 15.5t3.098.534t2.706 1.45q.99-1.025 1.593-2.42Q20 13.667 20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.667.603 3.064q.603 1.396 1.593 2.42m5.805-4.984q-1.264 0-2.133-.868T9 9.501t.868-2.133T12 6.5t2.132.868T15 9.5t-.868 2.132t-2.131.868M12 21q-1.883 0-3.525-.701t-2.858-1.916t-1.916-2.858T3 12t.701-3.525t1.916-2.858q1.216-1.215 2.858-1.916T12 3t3.525.701t2.858 1.916t1.916 2.858T21 12t-.701 3.525t-1.916 2.858q-1.216 1.215-2.858 1.916T12 21m0-1q1.383 0 2.721-.484q1.338-.483 2.313-1.324q-.974-.783-2.255-1.237T12 16.5t-2.789.445t-2.246 1.247q.975.84 2.314 1.324T12 20m0-8.5q.842 0 1.421-.579T14 9.5t-.579-1.421T12 7.5t-1.421.579T10 9.5t.579 1.421T12 11.5m0 6.75"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <p>{user?.username}</p>
                <small className="font-medium">{user?.email}</small>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button className="" onClick={editProfile}>
                Edit Profile
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className="bg-btn_bg text-white py-2 rounded-lg hover:scale-95 w-full duration-300 hover:bg-btn_bg/80 font-medium flex justify-center"
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;

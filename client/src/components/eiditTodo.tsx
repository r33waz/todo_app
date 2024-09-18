import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./common/button";
import { TimeConverter, TimeConverter24to12 } from "../hooks/timeConverter";
import { useAppDispatch } from "../hooks/hooks";
import { UpdateTodo } from "../rtk/todoThunk/toodoThunk";
import { useEffect } from "react";
import { ActionButton } from "./common/actinButton";

function EditTodo({
  task,
  refreshTodos,
}: {
  task: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    important: boolean;
    date: string;
    time: string;
  };
  refreshTodos: () => void;
}) {
  const dispatch = useAppDispatch();
  const { _id } = task;

  const formattedDate = task.date.split("T")[0];
  const formattedTime = TimeConverter(task.time);

  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      date: formattedDate,
      time: formattedTime, // Use formattedTime here
      completed: task.completed,
    },
  });

  useEffect(() => {
    setValue("time", formattedTime);
  }, [setValue, formattedTime]);

  const watchedCompleted = watch("completed");

  const OnSubmit = async (data: {
    title: string;
    description: string;
    completed: boolean;
    date: string;
    time: string;
  }) => {
    const formattedTime = TimeConverter24to12(data.time);
    const newTask = {
      ...data,
      time: formattedTime,
    };
    await dispatch(UpdateTodo({ id: _id, data: newTask }));
    refreshTodos();
  };

  const toggleCompletion = async () => {
    const updatedCompleted = !watchedCompleted;
    setValue("completed", updatedCompleted);
    const { title, description, date } = getValues();
    await dispatch(
      UpdateTodo({
        id: _id,
        data: { title, description, date, completed: updatedCompleted },
      })
    );
    refreshTodos();
  };

  return (
    <div className="flex items-center gap-1 ">
      <ActionButton
        className={` md:p-3 rounded-lg text-white`}
        onClick={toggleCompletion}
      >
        {/* Text for medium and larger screens */}
        <span
          className={`hidden sm:inline p-1 rounded-md text-xs  ${
            watchedCompleted ? "bg-green-500 " : "bg-gray-500"
          }`}
        >
          {watchedCompleted ? "Mark as Incomplete" : "Mark as Completed"}
        </span>

        {/* Icon for small screens */}
        <span className="inline sm:hidden">
          {watchedCompleted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-green-500"
            >
              <path
                fill="currentColor"
                d="m10.562 15.908l6.396-6.396l-.708-.708l-5.688 5.688l-2.85-2.85l-.708.708zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709"
              />
            </svg> // Icon for incomplete
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-gray-500"
            >
              <path fill="currentColor" d="M4 20V4h16v16zm1-1h14V5H5z" />
            </svg> // Icon for completed
          )}
        </span>
      </ActionButton>
      <Dialog>
        <DialogTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="text-green-500"
          >
            <path
              fill="currentColor"
              d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h7.178q.25 0 .375.159q.125.158.125.341t-.128.341T12.79 5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h12.77q.23 0 .423-.192t.192-.423V11.11q0-.25.159-.375q.158-.125.341-.125t.341.125t.159.375v7.275q0 .69-.462 1.153T18.384 20zM10 13.192v-1.136q0-.323.13-.628q.132-.305.349-.522l8.465-8.465q.166-.166.348-.23t.385-.063q.189 0 .368.064t.326.21L21.483 3.5q.16.166.242.365t.083.4t-.061.382q-.06.18-.226.345l-8.523 8.524q-.217.217-.522.35q-.305.134-.628.134h-1.04q-.349 0-.578-.23t-.23-.578m10.814-8.907l-1.112-1.17zM11 13h1.092l6.666-6.666l-.546-.546l-.61-.584L11 11.806zm7.212-7.211l-.61-.585zl.546.546z"
            />
          </svg>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Edit Todo
              </DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="flex  gap-4 flex-col">
                <input
                  type="text"
                  id="title"
                  className="p-2 rounded-lg border w-full text-xs border-gray-400 outline-none"
                  {...register("title")}
                />
                <input
                  type="text"
                  id="description"
                  className="p-2 rounded-lg border w-full text-xs border-gray-400"
                  {...register("description")}
                />
                <input
                  type="date"
                  id="date"
                  className="p-2 rounded-lg border w-full text-xs border-gray-400"
                  {...register("date")}
                />
                <input
                  type="time"
                  id="time"
                  className="p-2 rounded-lg border w-full text-xs border-gray-400"
                  {...register("time")}
                />
              </div>
            </DialogHeader>
            <Button
              className="text-white bg-btn_bg rounded-lg py-2 px-5 hover:scale-95 duration-300 text-lg w-full mt-2"
              type="submit"
            >
              Edit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}

export default EditTodo;

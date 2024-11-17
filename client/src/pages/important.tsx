import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  DeleteTodo,
  ImportantTodo,
  TogleImportant,
} from "../rtk/todoThunk/toodoThunk";
import { Loading } from "../components/common/loading";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/common/button";
import EiditTodo from "../components/eiditTodo";
import { ActionButton } from "../components/common/actinButton";
function ImportantTask() {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { important, loading } = useAppSelector((state) => state.todo);

  const [filters, setFilters] = useState({
    title: "",
    completed: false,
    date: "",
  });

  useEffect(() => {
    if (user?._id) {
      dispatch(
        ImportantTodo({
          userId: user._id,
          data: filters,
        })
      );
    }
  }, [dispatch, filters, user]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const deleteTodo = async (id: string) => {
    if (id && user) {
      await dispatch(DeleteTodo({ id }));
      dispatch(
        ImportantTodo({
          userId: user._id,
          data: filters,
        })
      );
      setIsDialogOpen(false);
    }
  };

  const handleToggleImportant = async (id: string) => {
    await dispatch(TogleImportant({ id }));
    if (user?._id) {
      dispatch(
        ImportantTodo({
          userId: user._id,
          data: filters,
        })
      );
    }
  };

  const refreshTodos = () => {
    if (user?._id) {
      dispatch(
        ImportantTodo({
          userId: user._id,
          data: filters,
        })
      );
    }
  };

  return (
    <div className="md:h-[90vh] overflow-y-scroll custom-scrollbar">
      <div className="pt-5 flex flex-col gap-5 relative">
        <div className="flex  gap-4 sticky top-0 md:flex-nowrap flex-wrap">
          <input
            type="text"
            name="title"
            placeholder="Search by title"
            onChange={handleFilterChange}
            className="border rounded-lg p-2 outline-none text-sm"
          />
          <input
            type="date"
            name="date"
            onChange={handleFilterChange}
            className="border rounded-lg p-2 outline-none text-sm"
          />
          <select
            name="completed"
            onChange={handleFilterChange}
            className="border rounded-lg p-2 text-sm outline-none"
          >
            <option value="">All Completion</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
        </div>
        <div>
          {loading ? (
            <div className="flex flex-col min-h-screen items-center justify-center">
              <Loading className="text-btn_bg h-96" width={100} height={100} />
            </div>
          ) : (
            <>
              {important?.list?.length > 0 ? (
                important?.list?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col mt-8 border p-3 rounded-xl hover:shadow-[0px_1px_2px_1px_#00000024] duration-500 hover:scale-100 md:gap-5 gap-2 relative bg-white w-full`}
                  >
                    <span
                      className={`md:w-24 rounded-t-lg px-2 py-0.5 text-sm font-light text-white text-center absolute right-2 -top-6  z-10 duration-500 ${
                        item?.completed === true
                          ? "bg-green-500"
                          : item?.upcomming === false
                          ? "bg-blue-500"
                          : "bg-orange-400"
                      } hover:-top-7`}
                    >
                      {item?.completed === true
                        ? "Completed"
                        : item?.upcomming === false
                        ? "Pending"
                        : "Upcoming"}
                    </span>
                    <div className="flex md:items-center w-full md:justify-between md:flex-row flex-col items-start gap-2.5">
                      <div className="flex flex-col gap ">
                        <h1 className=" font-medium md:text-lg text-sm">
                          {item?.title}
                        </h1>
                        <p className="md:text-base text-xs">
                          {item?.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2   justify-center">
                        <EiditTodo task={item} refreshTodos={refreshTodos} />
                        <span
                          className="cursor-pointer"
                          onClick={() => handleToggleImportant(item?._id)}
                        >
                          {item?.important ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="red"
                                d="m8.125 7.092l2.608-3.47q.238-.322.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.605q.289.426.289.94q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.564 20l-.454-.056L12 18.733l-4.11 1.211q-.124.05-.24.053q-.117.003-.214.003q-.665 0-1.15-.483t-.459-1.188l.1-3.856l-2.629-3.548q-.159-.217-.229-.453Q3 10.236 3 10q0-.506.297-.942q.296-.435.828-.618z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentcolor"
                                d="M8.125 7.092L12 1.937l3.875 5.155l6.139 2.07l-3.941 5.336l.156 6.056L12 18.733l-6.229 1.82l.156-6.08l-3.915-5.312zm.629.86l-5.1 1.735l3.292 4.494l-.138 5.006L12 17.697l5.192 1.534l-.138-5.05l3.292-4.444l-5.1-1.785L12 3.616zM12 11.423"
                              />
                            </svg>
                          )}
                        </span>
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={setIsDialogOpen}
                        >
                          <DialogTrigger className="outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              className="text-red-500"
                            >
                              <path
                                fill="currentColor"
                                d="M14.885 17.5v-1h3v1zm0-8v-1h6v1zm0 4v-1h5v1zM4.115 8h-1V7h3.731v-.885h2.538V7h3.732v1h-1v8.385q0 .69-.463 1.153T10.5 18H5.73q-.69 0-1.152-.462t-.462-1.153zm1 0v8.385q0 .23.193.423T5.73 17h4.77q.23 0 .423-.192q.193-.193.193-.424V8zm0 0v9z"
                              />
                            </svg>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your task and remove your
                                data from our servers.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <div className="flex gap-1">
                                  <Button className="rounded-lg px-2 py-0.5 bg-gray-500 text-white text-sm font-light">
                                    Cancel
                                  </Button>
                                  <ActionButton
                                    type="button"
                                    className="btn bg-red-500 hover:bg-red-600 text-white rounded-lg px-2 py-0.5 text-sm font-light"
                                    onClick={() => deleteTodo(item?._id)}
                                  >
                                    Delete
                                  </ActionButton>
                                </div>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <div className="flex gap-4 md:items-center md:justify-normal justify-between w-full md:mt-0 mt-2.5">
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V3.308q0-.233.153-.386t.385-.153t.386.153t.153.386V5h7.154V3.27q0-.214.143-.358t.357-.143t.356.143t.144.357V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192M5 9.615h14v-3q0-.23-.192-.423T18.384 6H5.616q-.231 0-.424.192T5 6.616zm0 0V6zm7 4.539q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23m-4 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23m8 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23M12 18q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.54T12 18m-4 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.54T8 18m8 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.54T16 18"
                          />
                        </svg>
                        <p className="text-sm font-light">
                          {item?.date ? item?.date?.split("T")[0] : "Completed"}
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12.5 12.792V8.5q0-.213-.143-.357T12 8t-.357.143t-.143.357v4.379q0 .162.056.3q.056.14.186.271l3.05 3.05q.14.14.345.15t.363-.15t.16-.354t-.16-.354zM12 21q-1.664 0-3.118-.626T6.34 18.66t-1.714-2.542T4 13t.626-3.118T6.34 7.34t2.542-1.714T12 5t3.118.626T17.66 7.34t1.714 2.542T20 13t-.626 3.118t-1.714 2.543t-2.542 1.713T12 21M2.78 7.262q-.159-.16-.159-.354t.16-.354L5.554 3.78q.14-.14.344-.15t.364.15t.16.353q0 .195-.16.354L3.489 7.262q-.141.141-.345.15t-.363-.15m18.438 0q-.16.16-.353.16q-.195 0-.354-.16L17.738 4.49q-.14-.141-.15-.345t.15-.363t.354-.16t.354.16l2.773 2.773q.14.14.15.344t-.15.364M12 20q2.906 0 4.953-2.047T19 13t-2.047-4.953T12 6T7.047 8.047T5 13t2.047 4.953T12 20"
                          />
                        </svg>
                        <p className="text-sm font-light">{item?.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xl font-light text-gray-400 text-center">
                  No important Task's
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImportantTask;

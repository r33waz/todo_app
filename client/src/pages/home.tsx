import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { GetAllTodo } from "../rtk/todoThunk/toodoThunk";

function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.todo);
  useEffect(() => {
    if (user?._id) {
      dispatch(GetAllTodo({ userId: user._id }));
    }
  }, [dispatch, user]);

  console.log("data", data);

  return (
    <div className=" flex-flex-col w-full">
      <h1 className="text-3xl font-bold">Home</h1>
      <div>
        {data?.list?.map((item, idx) => (
          <div key={idx}>{item?.title}</div>
        ))}
      </div>
    </div>
  );
}

export default Home;

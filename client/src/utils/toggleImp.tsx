import { FilterTodoInterface } from "../interface/todoInterface";
import { TogleImportant } from "../rtk/todoThunk/toodoThunk"; // Import your thunks
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from "../store/rootReducer";

type DispatchWithThunk = ThunkDispatch<RootState, void, any>; 

export const toggleImportantTask = async (
  dispatch: DispatchWithThunk,
  id: string,
  userId: string,
  // filters: Partial<FilterTodoInterface>,
  // fetchAction: FetchActionType 
) => {
  if (id && userId) {
    await dispatch(TogleImportant({ id }));
  }
};

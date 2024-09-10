import { FilterTodoInterface } from "../interface/todoInterface";
import { TogleImportant } from "../rtk/todoThunk/toodoThunk"; // Import your thunks
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from "../store/rootReducer";

type DispatchWithThunk = ThunkDispatch<RootState, void, any>; 

export const toggleImportantTask = async (
  dispatch: DispatchWithThunk,
  id: string,
  userId: string,
  filters: Partial<FilterTodoInterface>,
  fetchAction: FetchActionType 
) => {
  if (id && userId) {
    await dispatch(TogleImportant({ id }));

    const filledFilters: FilterTodoInterface = {
      title: filters.title ?? "", 
      completed: filters.completed ?? false, 
      date: filters.date ?? "", 
      important: filters.important ?? false,
    };

    await dispatch(fetchAction({ userId, data: filledFilters }));
  }
};

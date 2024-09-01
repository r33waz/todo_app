export interface CreateTodoInterface {
  title: string;
  description: string;
  date?: string;
  time?: string;
  userId: string;
}

export interface TodoInterface {
  loading: boolean;
  error: boolean;
  data: {
    list: Todoinfo[] ;
  };
}

export interface Todoinfo {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  userId: string;
}

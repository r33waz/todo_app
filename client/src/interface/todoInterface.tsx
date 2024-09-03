export interface CreateTodoInterface {
  title: string;
  description: string;
  date?: string;
  time?: string;
}

export interface TodoInterface {
  loading: boolean;
  error: boolean;
  data: {
    list: Todoinfo[];
  };
  completed: {
    list: Todoinfo[];
  };
  //important task
  important: {
    list: Todoinfo[];
  };
}

export interface Todoinfo {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  userId: string;
  important: boolean;
  completed: boolean;
}

export interface UpdateTodoInterface {
  title: string;
  description: string;
  date?: string;
  time?: string;
  _id: string;
}

//filter todo

export interface FilterTodoInterface {
  title?: string;
  important: boolean;
  completed: boolean;
  date: string;
}

//colpleted task interface
export interface CompletedTaskInterface {
  title?: string;
  important: boolean;
  date: string;
}

export interface ImportantTaskInterface {
  title?: string;
  date: string;
  completed: boolean
}

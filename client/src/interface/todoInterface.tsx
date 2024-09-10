export interface CreateTodoInterface {
  title: string;
  description: string;
  date?: string;
  time?: string;
  important: boolean;
  upcomming: boolean;
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

  //upcomming task
  upcomming: {
    list: Todoinfo[];
  };

  //today task
  todays: {
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
  upcomming: boolean;
}

export interface UpdateTodoInterface {
  title: string;
  description: string;
  date?: string;
  time?: string;
  completed: boolean;
}

//filter todo

export interface FilterTodoInterface {
  title?: string;
  important?: boolean;
  completed?: boolean;
  date?: string;
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
  completed: boolean;
}

export interface UmcomminginfoInterface {
  title: string;
  date: string;
  important: boolean;
}

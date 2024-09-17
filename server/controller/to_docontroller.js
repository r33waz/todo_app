import ToDo from "../model/todo.model.js";

export const CreateTodo = async (req, res) => {
  try {
    const { userId, title, description, date, time, important } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please try again",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Provide the title of todo",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Provide the description of todo",
      });
    }

    // Get today's date (with time reset to midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison

    // Set 'upcoming' to true if the provided 'date' is greater than today's date, otherwise false
    const upcoming = date && new Date(date) > today ? true : false;

    // Create new todo, including the 'upcoming' field
    const newTodo = new ToDo({
      userId,
      title,
      description,
      date: date || undefined,
      time: time || undefined,
      important,
      upcoming, // true if the date is in the future, otherwise false
    });

    await newTodo.save();

    res.status(200).json({
      success: true,
      message: "Todo created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const DeleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTodo = await ToDo.findById({ _id: id });
    if (!existingTodo) {
      return res.status(400).json({
        success: false,
        message: "Todo not found",
      });
    }
    await ToDo.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all todo according to the user
export const GetAllTodo = async (req, res) => {};

//completed task

//update todo
export const UpdateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, date, time } = req.body;

    // Find the existing task in the database
    const existingTodo = await ToDo.findById(id);

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    // Get the date of the existing task
    const taskDate = new Date(existingTodo.date); // Date from the existing task
    taskDate.setHours(0, 0, 0, 0); // Normalize time to midnight

    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Define fields to be updated
    const updateFields = {
      title,
      description,
      completed,
      date,
      time,
    };

    if (inputDate.getTime() > today.getTime()) {
      updateFields.upcomming = true; // Future task
    } else if (inputDate.getTime() === today.getTime()) {
      updateFields.upcomming = false; // Pending task
    } else {
      updateFields.upcomming = false; // Past task
    }
    // Update the task in the database with the new fields
    const updatedTodo = await ToDo.findByIdAndUpdate(
      { _id: id },
      updateFields,
      {
        new: true, // Return the updated document
      }
    );

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//find single todo
export const FindSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await ToDo.findById({ _id: id });
    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "Todo not found",
      });
    }
    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//filter todo
export const FilterTodo = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { userId, title, date, completed, important } = req.query;
    console.log(userId, title, date, completed, important);

    // Ensure the userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let query = { userId };

    if (date) {
      query.date = new Date(date);
    }

    if (completed) {
      query.completed = completed === "true";
    }

    if (important) {
      query.important = important === "true";
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    let todos = await ToDo.find(query);
    if (!todos || todos.length === 0) {
      console.log("No todos found");
      return res.status(400).json({
        status: 404,
        json: { success: false, message: "No todos found" },
      });
    }
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const updatedTodos = await Promise.all(
      todos.map(async (todo) => {
        const todoDate = new Date(todo.date);
        todoDate.setHours(0, 0, 0, 0);
        const isUpcoming = todoDate > currentDate;
        if (todo.upcomming !== isUpcoming) {
          todo.upcomming = isUpcoming;
          try {
            await todo.save();
          } catch (saveError) {
            console.error(`Error saving todo with id ${todo._id}:`, saveError);
          }
        } else {
          console.log(`No update needed for todo with id ${todo._id}`);
        }
        return todo;
      })
    );
    res.status(200).json({
      success: true,
      data: updatedTodos,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving todos" });
  }
};

export const CompletedTask = async (req, res) => {
  try {
    const { userId, title, date, important } = req.query;
    console.log(userId, title, date, important);

    // Ensure the userId is valid before proceeding
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Build the query
    let query = {
      userId,
      completed: true,
    };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (date) {
      const exactDate = new Date(date);
      exactDate.setUTCHours(0, 0, 0, 0);
      query.date = exactDate;
    }

    if (important) {
      query.important = important === "true";
    }

    // Execute the query
    const todo = await ToDo.find(query);

    // Send response
    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Error in CompletedTask:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//important task
export const ImportantTask = async (req, res) => {
  try {
    const { title, date, userId, completed } = req.query;

    // Define the query for finding todos
    let query = {
      userId: userId,
      $or: [{ important: true }],
    };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (date) {
      const exactDate = new Date(date);
      exactDate.setUTCHours(0, 0, 0, 0);
      query.date = exactDate;
    }

    if (completed) {
      query.completed = completed === "true";
    }

    // If postId is not provided, return the filtered list of tasks
    const todos = await ToDo.find(query);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const updatedTodos = await Promise.all(
      todos.map(async (todo) => {
        const todoDate = new Date(todo.date);
        todoDate.setHours(0, 0, 0, 0);
        const isUpcoming = todoDate > currentDate;
        if (todo.upcomming !== isUpcoming) {
          todo.upcomming = isUpcoming;
          try {
            await todo.save();
          } catch (saveError) {
            console.error(`Error saving todo with id ${todo._id}:`, saveError);
          }
        } else {
          console.log(`No update needed for todo with id ${todo._id}`);
        }
        return todo;
      })
    );
    res.status(200).json({
      success: true,
      data: updatedTodos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//todays todo
export const GetTodayTodo = async (req, res) => {
  try {
    const { title, userId, completed } = req.query;

    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    const query = {
      userId,
      date: { $gte: startOfDay, $lt: endOfDay }, 
    };

    if (title) {
      query.title = { $regex: title, $options: "i" }; 
    }

    if (completed) {
      query.completed = completed === "true"; 
    }

    const todo = await ToDo.find(query);

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//up coming task

export const UpComingTask = async (req, res) => {
  try {
    const { title, date, userId, important } = req.query;
    let query = {
      userId,
      $or: [{ upcomming: true }],
    };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (date) {
      query.date = date;
    }

    if (important) {
      query.important = important === "true";
    }

    const todos = await ToDo.find(query);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const updatedTodos = await Promise.all(
      todos.map(async (todo) => {
        const todoDate = new Date(todo.date);
        todoDate.setHours(0, 0, 0, 0);
        const isUpcoming = todoDate > currentDate;
        if (todo.upcomming !== isUpcoming) {
          todo.upcomming = isUpcoming;
          try {
            await todo.save();
          } catch (saveError) {
            console.error(`Error saving todo with id ${todo._id}:`, saveError);
          }
        } else {
          console.log(`No update needed for todo with id ${todo._id}`);
        }
        return todo;
      })
    );
    res.status(200).json({
      success: true,
      data: updatedTodos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const toggleImportantTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "postId is required",
      });
    }

    // Find the specific todo by its ID
    const todo = await ToDo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Toggle the "important" status
    todo.important = !todo.important;
    const updatedTodo = await todo.save(); // Save the updated document

    const message = todo.important
      ? "Task added to important"
      : "Task removed from important";

    // Send response
    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

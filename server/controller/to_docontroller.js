import ToDo from "../model/todo.model.js";

export const CreateTodo = async (req, res) => {
  try {
    const { userId, title, description, date, time } = req.body;

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

    // Only include date and time if they are provided
    const newTodo = new ToDo({
      userId,
      title,
      description,
      date: date || undefined,
      time: time || undefined,
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
export const GetAllTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date } = req.body;

    // Build the query object based on the provided filters
    let query = { userId: id };

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive title search
    }

    if (date) {
      const exactDate = new Date(date);

      query.date = exactDate; // Filter by exact date
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

//completed task

//update todo
export const UpdateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, completed, important } = req.body;
    const updateData = await ToDo.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        status,
        completed,
        important,
      },
      {
        new: true,
      }
    );
    if (!updateData) {
      return res.status(400).json({
        success: false,
        message: "Todo not found",
      });
    }

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
    const todos = await ToDo.find(query);
    res.status(200).json({
      success: true,
      data: todos,
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
    const { postId } = req.body;
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

    // If postId is provided, toggle the important status of the task
    if (postId) {
      const updatedTodo = await ToDo.findById(postId);

      if (updatedTodo) {
        // Toggle the "important" status
        updatedTodo.important = !updatedTodo.important;
        await updatedTodo.save(); // Save the updated document

        // Send response
        return res.status(200).json({
          success: true,
          message: "Important task updated successfully",
          updatedTodo,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
    }

    // If postId is not provided, return the filtered list of tasks
    const todos = await ToDo.find(query);

    res.status(200).json({
      success: true,
      data:todos,
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
    const { userId } = req.body;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const query = {
      userId,
      date: { $gte: today },
    };

    const todo = await ToDo.find(query);

    res.status(200).json({
      success: true,
      todo,
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
    const { id } = req.params;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setUTCHours(0, 0, 0, 0);

    const query = {
      userId: id,
      date: { $gte: tomorrow },
    };

    const todo = await ToDo.find(query);
    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

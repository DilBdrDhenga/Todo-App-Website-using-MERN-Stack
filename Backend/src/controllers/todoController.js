import expressAsyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.js";
import Todo from "../models/todoModel.js";

// CREATE TODO LIST
const createTodo = expressAsyncHandler(async (req, res, next) => {
  try {
    const { title, description, createdBy } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json(new ApiResponse(400, "Title is required"));
    }
    if (!description || description.trim() === "") {
      return res
        .status(400)
        .json(new ApiResponse(400, "Description is required"));
    }
    // if (!createdBy || createdBy.trim() === "") {
    //   return res
    //     .status(400)
    //     .json(new ApiResponse(400, "Please specify the User"));
    // }

    // creating new Todo task
    const todo = await Todo.create({
      title,
      description,
      createdBy,
    });
    /* 
      const todo = new Todo({
      title, description, createdBy
      });
      const result = await todo.save()
              return res
            .status(201)
            .json(new ApiResponse(201, "New Todo-List created successfully.", todo));
    */

    if (!todo) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error creating Todo-list."));
    }
    return res
      .status(201)
      .json(new ApiResponse(201, "New Todo-list created successfully.", todo));
  } catch (error) {
    console.log(error.message);
    // Handle Mongoose ValidationError
    if (error.name === "ValidationError") {
      // Collect only the error messages from Mongoose
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({
        isSuccess: false,
        message: errorMessages[0], // You can also join them if you want to show multiple messages
      });
    }

    res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
});

// GET TODO LIST
const readTodo = expressAsyncHandler(async (req, res, next) => {
  try {
    // getting userId
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(404)
        .json(new ApiResponse(404, "No User found with this Id"));
    }
    // finding todo-task by the user
    const todos = await Todo.find({ createdBy: userId });
    if (!todos) {
      return res.status(404).json(new ApiResponse(404, "You have no tasks"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Your tasks are: ", { todo_tasks: todos }));
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
});

// UPDATE TODO LIST
const updateTodo = expressAsyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Please provide todo-task Id"));
    }
    const data = req.body;

    const todo = await Todo.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Your todo-task has been updated", todo));
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
});

// DELETE TODO LIST
const deleteTodo = expressAsyncHandler(async (req, res, next) => {
  try {
    const todos = await Todo.findByIdAndDelete(req.params.id);
    if (!todos) {
      return res
        .status(404)
        .json(new ApiResponse(404, "No any todo-tasks found by this Id"));
    }
    return res.json(
      new ApiResponse(200, "Your todo-task has been deleted successfully")
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
});

export { createTodo, readTodo, updateTodo, deleteTodo };

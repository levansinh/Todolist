import { TodoModel } from "../models/Todo.js";
import md5 from "md5";
export const todoController = {
  //GET TODO
  getAllTodoById: async (req, res) => {
    try {
      const todo = await TodoModel.find({ id_user: req.params.id_user });
      res.status(200).json(todo);
    } catch (error) {
      console.log(error);
    }
  },
  getOneTodo: async (req, res) => {},
  createTodo: async (req, res) => {
    try {
      const newTodo = await TodoModel(req.body);
      const todo = await newTodo.save();
      res
        .status(200)
        .json({ todo: todo, message: "Created todo successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateByIdUser: async (req, res) => {
    try {
      const todo = await TodoModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json(todo);
    } catch (error) {
      console.log(error);
    }
  },
  deleteTodo: async (req, res) => {
    TodoModel.findByIdAndRemove(req.params.id)
      .then((data) => {
        if (data) {
          res.status(200).json({
            message: "Todo deleted successfully",
            todo: data,
          });
        } else {
          res.status(403).json({
            message: "Todo deleted failed",
          });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

import { Request, Response } from "express";
import { TodoModel } from "../models/TodoModel";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { id, title, content } = req.body;

    const newTodo = await TodoModel.create({
      id,
      title,
      content,
    });

    console.log("New todo created:", newTodo.toJSON());

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Failed to create todo:", error);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Todo ID is required" });
  }

  try {
    const deletedTodo = await TodoModel.destroy({ where: { id } });
    if (deletedTodo) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Error deleting todo" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!id || !title || !content) {
      return res
        .status(400)
        .json({ error: "Todo ID, title, and content are required" });
    }

    const [updatedTodoCount, updatedTodo] = await TodoModel.update(
      { title, content },
      { where: { id }, returning: true }
    );

    if (updatedTodoCount > 0) {
      res.json(updatedTodo[0]);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Error updating todo" });
  }
};

import Task from "../models/Task";
import { Request, Response } from "express";
import { Op } from "sequelize";
const { v4: uuidv4 } = require("uuid");

export const getAllTasks = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;
  const title = req.query.title as string | undefined;

  const where: any = {};
  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }

  try {
    const { rows: tasks, count } = await Task.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    res.json({
      message: "All Tasks",
      tasks,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
};

export const getTaskById = (req: Request, res: Response) => {
  const taskId = req.params.id;
  Task.findByPk(taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.json({ message: "Task found", task });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error fetching task", error: err });
    });
};

export const createTask = (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  Task.create({
    id: uuidv4(),
    title,
    description,
    status: status || "PENDING",
  })
    .then((task) => {
      res.json({ message: "Task saved", task });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating task", error: err });
    });
};

export const updateTask = (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;
  Task.findByPk(taskId)
    .then((task) => {
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return null;
      }
      return task.update({
        title,
        description,
        status: status || "PENDING",
      });
    })
    .then((updatedTask) => {
      if (updatedTask) {
        res.json({ message: "Task updated", task: updatedTask });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating task", error: err });
    });
};

export const deleteTask = (req: Request, res: Response) => {
  const taskId = req.params.id;
  Task.destroy({ where: { id: taskId } })
    .then((deleted) => {
      if (deleted) {
        res.json({ message: "Task deleted" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting task", error: err });
    });
};

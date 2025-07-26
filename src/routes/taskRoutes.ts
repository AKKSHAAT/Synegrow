import { Router } from "express";
import { Task } from "../types/tasks";
const { v4: uuidv4 } = require("uuid");

const router = Router();

let tasks: Task[] = [];

/*
    GET /tasks: Retrieve all tasks
    POST /tasks: Create a new task
    GET /tasks/:id: Retrieve a task by ID
    PUT /tasks/:id: Update a task by ID
    DELETE /tasks/:id: Delete a task by ID
*/

router.get("/", (req, res) => {
  res.json({ message: "All Tasks", tasks });
});

router.get("/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.json({ message: "Task found", tasks });
});

router.post("/", (req, res) => {
  const newTask = req.body;
  const now = new Date().toISOString();
  const taskWithId = {
    id: uuidv4(),
    title: newTask.title,
    description: newTask.description,
    status: newTask.status || "PENDING",
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(taskWithId);
  res.json({ message: "Task saved", tasks });
});

router.put("/:id", (req, res) => {
  const taskId = req.params.id;

  const now = new Date().toISOString();
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  const updatedTask = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || "PENDING",
    updatedAt: now,
  };
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  res.json({ message: "Task updated", task: tasks[taskIndex] });
});

router.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter((t) => t.id !== taskId);
  res.json({ message: "Task deleted", tasks });
});

export default router;

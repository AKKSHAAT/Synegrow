import { Router } from "express";
const { v4: uuidv4 } = require("uuid");

const router = Router();

let tasks: any[] = [];

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
  const taskWithId = { ...newTask, id: uuidv4() };
  tasks.push(taskWithId);
  res.json({ message: "Task saved", tasks });
});

router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
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

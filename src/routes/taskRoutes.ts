import { Router } from "express";
import Task from "../models/Task";
const { v4: uuidv4 } = require("uuid");

const router = Router();

/*
    GET /tasks: Retrieve all tasks
    POST /tasks: Create a new task
    GET /tasks/:id: Retrieve a task by ID
    PUT /tasks/:id: Update a task by ID
    DELETE /tasks/:id: Delete a task by ID
*/

router.get("/", (req, res) => {
  Task.findAll()
    .then((tasks) => {
      res.json({ message: "All Tasks", tasks });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error fetching tasks", error: err });
    });
});

router.get("/:id", (req, res) => {
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
});

router.post("/", (req, res) => {
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
});

router.put("/:id", (req, res) => {
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
});

router.delete("/:id", (req, res) => {
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
});

export default router;

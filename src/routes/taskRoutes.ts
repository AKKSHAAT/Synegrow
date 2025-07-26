import { Router } from "express";
import * as taskController from "../controller/taskController";

const router = Router();

/*
    GET /tasks: Retrieve all tasks
    POST /tasks: Create a new task
    GET /tasks/:id: Retrieve a task by ID
    PUT /tasks/:id: Update a task by ID
    DELETE /tasks/:id: Delete a task by ID
*/

router.get("/", taskController.getAllTasks);

router.get("/:id", taskController.getTaskById);

router.post("/", taskController.createTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

export default router;

import express from "express";
import taskRoutes from "./routes/taskRoutes";
import sequelize from './db';
import Task from './models/Task';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// -------routes--------
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  sequelize.sync();
  console.log(`Server is running on http://localhost:${PORT}`);
});

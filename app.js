import express from "express";
import morgan from "morgan";
import { projectRouter } from "./routes/projectRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { teamRouter } from "./routes/teamRoutes.js";
import { taskRouter } from "./routes/taskRoutes.js";
import errorController from "./controllers/errorController.js";
import AppErrors from "./utils/appError.js";
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.set("query parser", "extended");
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
////////middleware های بالا برای مسیر های زیر اجرا میشه////////////

app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/tasks", taskRouter);
app.use((req, res, next) => {
  const err = new AppErrors(`Not Found this ${req.originalUrl}`, 404);

  next(err);
});
app.use(errorController);
export default app;

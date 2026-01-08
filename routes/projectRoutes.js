import express from "express";
import {
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  createProject,
  getProjectStats,
} from "../controllers/projectController.js";
import { protect, restrict } from "../controllers/authController.js";
export const projectRouter = express.Router();
projectRouter.route("/projects_stats").get(getProjectStats);
projectRouter
  .route("/")
  .get(protect, restrict(["admin"]), getAllProjects)
  .post(protect, restrict(["admin"]), createProject);
projectRouter
  .route("/:id")
  .get(protect, restrict(["admin"]), getProject)
  .patch(protect, restrict(["admin"]), updateProject)
  .delete(protect, restrict(["admin"]), deleteProject);

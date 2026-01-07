import express from "express";
import {
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  createProject,
  getProjectStats,
} from "../controllers/projectController.js";
import { protect } from "../controllers/authController.js";
export const projectRouter = express.Router();
projectRouter.route("/projects_stats").get(getProjectStats);
projectRouter.route("/").get(protect, getAllProjects).post(createProject);
projectRouter
  .route("/:id")
  .get(getProject)
  .patch(updateProject)
  .delete(deleteProject);

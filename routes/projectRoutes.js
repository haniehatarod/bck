import express from "express";
import {
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  createProject,
  getProjectStats,
} from "../controllers/projectController.js";
import { protectRoutes } from "../controllers/authController.js";
export const projectRouter = express.Router();
projectRouter.route("/projects_stats").get(protectRoutes, getProjectStats);
projectRouter
  .route("/")
  .get(protectRoutes, getAllProjects)
  .post(protectRoutes, createProject);
projectRouter
  .route("/:id")
  .get(protectRoutes, getProject)
  .patch(protectRoutes, updateProject)
  .delete(protectRoutes, deleteProject);

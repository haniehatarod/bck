import express from "express";
import {
  getAllTeams,
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/teamcontroller.js";

export const teamRouter = express.Router();
teamRouter.route("/").get(getAllTeams).post(createTeam);
teamRouter.route("/:id").get(getTeam).patch(updateTeam).delete(deleteTeam);

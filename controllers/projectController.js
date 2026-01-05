import ProjectModel from "../models/projectModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
export const getAllProjects = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(ProjectModel.find(), req.query)
    .filter()
    .sort()
    .pagination()
    .limit();
  const projects = await features.query;

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: { projects },
  });
});
export const createProject = catchAsync(async (req, res, next) => {
  const newProject = await ProjectModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newProject,
    },
  });
});
export const getProject = catchAsync(async (req, res, next) => {
  const project = await ProjectModel.findById(req.params.id);
  if (!project) {
    return next(new AppError(`Not Found this ID`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});
export const deleteProject = catchAsync(async (req, res, next) => {
  const project = await ProjectModel.findByIdAndDelete(req.params.id);
  if (!project) {
    return next(new AppError(`Not Found this id=${req.params.id}`, 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
    message: "Project deleted successfully",
  });
});
export const updateProject = catchAsync(async (req, res, next) => {
  const updatedProject = await ProjectModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedProject,
    },
  });
});
export const getProjectStats = catchAsync(async (req, res, next) => {
  const stats = await ProjectModel.aggregate([
    {
      $match: { progress: { $gt: 20 } },
    },
    {
      $group: {
        _id: "$status",
        numProjects: { $sum: 1 },
        avgProgress: { $avg: "$progress" },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

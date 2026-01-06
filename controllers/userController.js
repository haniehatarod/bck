import UsersModel from "../models/usersModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await UsersModel.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});
export const createUser = (req, res) => {};
export const getUser = (req, res) => {};
export const deleteUser = (req, res) => {};
export const updateUser = (req, res) => {};

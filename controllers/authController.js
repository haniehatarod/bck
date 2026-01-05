import usersModel from "../models/usersModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
export const signup = catchAsync(async (req, res, next) => {
  const newUser = await usersModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.SECRET_JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});
export const login = catchAsync(async (req, res, next) => {
    console.log('');
    
});

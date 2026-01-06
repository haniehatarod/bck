import AppErrors from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import UserModel from "../models/usersModel.js";
import { signToken } from "../utils/createToken.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
export const signup = catchAsync(async (req, res, next) => {
  const newUser = await UserModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppErrors("Please provide email and password", 400));
  }
  const user = await UserModel.findOne({ email }).select("+password");

  const isCorrectPassword = await user.correctPassword(password, user.password);
  if (!user || !isCorrectPassword) {
    return next(new AppErrors("Incorrect email or password", 401));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppErrors("You are not login ,please login to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT);
  const freshUser = await UserModel.findById(decoded.id);
  console.log(freshUser);
  if (!freshUser) {
    return new AppErrors("The user belonging to this token does no exist", 401);
  }
  freshUser.changedPasswordAfter(decoded.iat);
  next();
});

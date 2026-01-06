import jwt from "jsonwebtoken";

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

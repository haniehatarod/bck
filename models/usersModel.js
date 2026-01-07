import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide your username"],
    trim: true,
  },
  // role: {
  //   type: String,
  //   enum: ["admin", "user"],
  //   default: "user",
  // },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  // expertise: {
  //   type: String,
  //   trim: true,
  // },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  // photo: {
  //   type: String,
  //   default: "default.jpg",
  // },
  passwordChangedAt: {
    type: Date,
  },
});
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});
userSchema.methods.correctPassword = async function (newPassword, oldPassword) {
  return await bcrypt.compare(newPassword, oldPassword);
};
<<<<<<< HEAD
userSchema.methods.changedPassAfterLogin = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    console.log(JWTTimestamp < changedTimestamp);
    return JWTTimestamp < changedTimestamp;
=======
userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    console.log(this);
>>>>>>> 72a7a4c25f409fafb5e5b0db0c9996e4e0254a04
  }
  return false;
};
export default mongoose.model("User", userSchema);

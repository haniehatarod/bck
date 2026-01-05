import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A project must have a title"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A project must have a description"],
    trim: true,
  },
  start_Date: {
    type: Date,
    required: [true, "A project must have a start date"],
  },
  end_Date: {
    type: Date,
    required: [true, "A project must have an end date"],
  },
  status: {
    type: String,
    enum: ["not-started", "in-progress", "completed"],
    default: "not started",
    trim: true,
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Project", projectSchema);

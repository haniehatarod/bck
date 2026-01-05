import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A project must have a title"],
  },
  description: {
    type: String,
    required: [true, "A project must have a description"],
  },
  status: "todo" | "doing" | "done",
  priority: "low" | "medium" | "high",
  dueDate: [Date],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // project: ObjectId,
  // assignedTo: ObjectId,
});
export default mongoose.model("Task", taskSchema);

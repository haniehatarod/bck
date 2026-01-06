import mongoose from "mongoose";
import formatDuration from "../utils/dateConverters/formatDuration.js";
import slugify from "slugify";
const projectSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
projectSchema.virtual("project_duration").get(function () {
  if (!this.start_Date || !this.end_Date) return 0;

  const diffTime = this.end_Date - this.start_Date;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const lastVersion = `${diffDays} day`;
  return lastVersion;
});
projectSchema.virtual("time_passed_human").get(function () {
  if (!this.start_Date) return null;

  const diffMs = Math.max(0, Date.now() - this.start_Date);
  return formatDuration(diffMs);
});

projectSchema.virtual("time_remaining_human").get(function () {
  if (!this.end_Date) return null;

  const diffMs = Math.max(0, this.end_Date - Date.now());
  return formatDuration(diffMs);
});
projectSchema.virtual("time_until_start_human").get(function () {
  if (!this.start_Date) return null;

  const now = Date.now();

  if (this.start_Date <= now) {
    return "already started";
  }

  return formatDuration(this.start_Date - now);
});
projectSchema.pre("save", async function () {
  this.slug = slugify(this.title, { lower: true });
});
projectSchema.pre(/^find/, async function () {
  this.find({ notStarted: { $ne: true } });
});
export default mongoose.model("Project", projectSchema);

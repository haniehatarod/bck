import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Team must be have a name"],
  },
  members: [
    {
      // user: ObjectId,
      role: "owner" | "member",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("Team", teamSchema);

import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    action: { // e.g., "created", "updated", "deleted"
      type: String, 
      required: true 
    }, 
    task: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: "Task"
       },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);

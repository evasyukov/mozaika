import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  },
)

export default mongoose.model("Project", projectSchema)

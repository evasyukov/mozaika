import mongoose from "mongoose"

const profileSchema = new mongoose.Schema(
  {
    name: String,
    last_name: String,
    direction: String,
    description: String,

    skills: {
      type: [String],
      default: [],
    },

    contacts: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
)

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    registered_at: {
      type: Date,
      default: Date.now,
    },
    profile: {
      type: profileSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("User", userSchema)

import mongoose from "mongoose"
import { ROLES } from "../constants/roles.js"

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    last_name: {
      type: String,
      required: true,
      trim: true,
    },

    direction: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

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
      type: Number,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
    profile: {
      type: profileSchema,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "registered_at",
      updatedAt: false,
    },
  },
)

export default mongoose.model("User", userSchema)

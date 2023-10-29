import { Schema, model } from "mongoose";

const CategoryPostSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default model("CategoryPost", CategoryPostSchema);

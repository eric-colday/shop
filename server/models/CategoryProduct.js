import { Schema, model } from "mongoose";

const CategoryProductSchema = new Schema(
  {
    img: { type: [String] },
    title: {
      type: String,
      required: true,
    },
    cat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("CategoryProduct", CategoryProductSchema);

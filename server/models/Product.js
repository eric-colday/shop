import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: [String], }, 
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model("Product", ProductSchema);

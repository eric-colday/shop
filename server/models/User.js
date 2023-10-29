import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    img: { type: [String], default: "./uploads/profil/random-user.png" },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    fullName: {
      type: String, //required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, max: 1024, minlength: 6 },
    phone: {
      type: String,
      //required: true,
    },
    address: {
      type: String,
      //required: true,
    },
    gender: {
      type: String,
      //required: true,
    },
    active: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

export default model("User", UserSchema);

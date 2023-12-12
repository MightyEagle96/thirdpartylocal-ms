import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema({
  name: { type: String, lowercase: true, trim: true },
  code: { type: String, trim: true, lowercase: true },
  numberOfQuestions: Number,
});

export default model("Subject", schema);

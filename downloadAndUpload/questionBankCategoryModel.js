import mongoose from "mongoose";
import { RandomizeQuestions } from "./util.js";
const { Schema, model } = mongoose;

const schema = new Schema({
  questionBank: { type: Schema.Types.ObjectId, ref: "QuestionBank" },
  questionCategory: Number,
  subject: { type: Schema.Types.ObjectId, ref: "Subject" },
  questions: [
    {
      question: String,
      questionId: String,
      options: [String],
      correctAnswer: String,
      startGroup: Boolean,
      clustered: Boolean,
      endGroup: Boolean,
    },
  ],
});

export default model("QuestionBankCategory", schema);

import { Schema, model } from "mongoose";

const schema = new Schema({
  responses: [
    {
      answer: String,
      correctAnswer: String,
      questionId: String,
      subject: String,
      score: Number,
    },
  ],
  examination: { type: Schema.Types.ObjectId, ref: "Examination" },
  candidate: { type: Schema.Types.ObjectId, ref: "Candidate" },
  totalCorrect: Number,
  subjectScore: [
    { score: Number, subject: { type: Schema.Types.ObjectId, ref: "Subject" } },
  ],
});

export default model("Response", schema);

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
  attempts: { type: Number, default: 0 },
  candidateSystems: [
    {
      ipAddress: String,
      loggedInTime: { type: Date },
      browserName: String,
      browserVersion: String,
    },
  ],
});

export default model("Response", schema);

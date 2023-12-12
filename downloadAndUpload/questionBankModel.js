import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema({
  subject: { type: Schema.Types.ObjectId, ref: "Subject" },
  isTaken: { type: Boolean, default: false },
  dateCreated: { type: Date },
  dateTaken: Date,
  questions: [
    {
      question: String,
      questionId: String,
      options: [String],
      correctAnswer: String,
      startGroup: { type: Boolean, default: false },
      clustered: { type: Boolean, default: false },
      endGroup: { type: Boolean, default: false },
    },
  ],
});

export default model("QuestionBank", schema);

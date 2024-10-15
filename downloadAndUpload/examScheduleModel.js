import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema({
  examination: { type: Schema.Types.ObjectId, ref: "Examination" },
  questionBanks: [
    {
      subject: { type: Schema.Types.ObjectId, ref: "Subject" },
      questionBank: { type: Schema.Types.ObjectId, ref: "QuestionBank" },
    },
  ],
  startTime: Date,
  stopTime: Date,
  status: { type: String, default: "NOT TAKEN" },
  scheduledDate: { date: Date, dateString: String },
  scheduledTime: { hour: Number, minute: Number },
  paperConcluded: { type: Boolean, default: false },
  duration: Number,
  availableForDownload: { type: Boolean, default: false },
});

export default model("ExamSchedule", schema);

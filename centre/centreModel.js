import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  name: { type: String, lowercase: true },
  examination: { type: Schema.Types.ObjectId, ref: "Examination" },
  capacity: { type: Number, default: 0 },
  state: String,
  centreName: String,
  sessions: [{ type: String }],
  totalExamsUploaded: { type: Number, default: 0 },
  totalExamsDownloaded: { type: Number, default: 0 },
  centreId: { type: String },
  password: String,
  candidates: [{ type: Schema.Types.ObjectId, ref: "Candidate" }],
  downloadedExam: { type: Boolean, default: false },
  timeDownloaded: Date,
  uploadedExam: { type: Boolean, default: false },
  timeUploaded: Date,
  sessionLength: { type: Number, default: 0 },
  zeroClient: { type: Boolean, default: false },
  examSessions: [{ type: Schema.Types.ObjectId, ref: "ExamSession" }],
  createdOnServer: { type: Boolean, default: false },
});

export default model("Centre", schema);

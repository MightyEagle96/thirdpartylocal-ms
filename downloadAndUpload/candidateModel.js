import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  session: String,
  firstName: String,
  middleName: String,
  lastName: String,
  candidateType: String,
  registrationNumber: { type: String, unique: true, lowercase: true },
  totalScore: { type: Number, default: 0 },
  centre: { type: Schema.Types.ObjectId, ref: "Centre" },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  seatNumber: String,
  avatar: String,
  duration: { type: Number, default: 180000 },
  examination: { type: Schema.Types.ObjectId, ref: "Examination" },
  examState: String,
  examTown: String,
  assignedToCentre: { type: Boolean, default: false },
  answeredQuestions: { type: Number, default: 0 },
  synccandidate: { type: Boolean, default: false },
  startTime: Date,
  stopTime: Date,
  examDate: Date,
  isWriting: { type: Boolean, default: false },
  hasSeenInstructionPage: { type: Boolean, default: false },
  scheduledDate: { date: Date, dateString: String },
  scheduledTime: { hour: Number, minute: Number },
  candidateSystems: [
    {
      ipAddress: String,
      loggedInTime: { type: Date },
      browserName: String,
      browserVersion: String,
    },
  ],
  ipAddress: String,
  submitted: { type: Boolean, default: false },
  errorMessage: String,
  questionCategory: Number,
  resit: { type: Boolean, default: false },
  school: String,
});

export default model("Candidate", schema);

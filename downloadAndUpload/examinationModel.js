import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema({
  title: { type: String, lowercase: true, trim: true },
  active: { type: Boolean, default: false },
  createdOn: Date,
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  candidatesAssignedToCentre: { type: Boolean, default: false },
});

schema.pre("save", function (next) {
  this.createdOn = new Date();
  next();
});

export default model("Examination", schema);

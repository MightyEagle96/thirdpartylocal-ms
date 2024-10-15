import candidateModel from "../downloadAndUpload/candidateModel.js";
import examScheduleModel from "../downloadAndUpload/examScheduleModel.js";
import examinationModel from "../downloadAndUpload/examinationModel.js";
import questionBankCategoryModel from "../downloadAndUpload/questionBankCategoryModel.js";
import questionBankModel from "../downloadAndUpload/questionBankModel.js";
import responseModel from "../downloadAndUpload/responseModel.js";
import subjectModel from "../downloadAndUpload/subjectModel.js";
import centreModel from "./centreModel.js";

export const saveCentre = async (req, res) => {
  try {
    await centreModel.deleteOne();

    await centreModel.create(req.body);

    res.send("Centre created");
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};

export const loginCentre = async (req, res) => {
  const centre = await centreModel.findOne(req.body);

  if (!centre) return res.status(401).send("Centre credentials incorrect");

  res.send(centre);
};

export const toggleZeroClient = async (req, res) => {
  const centre = await centreModel.findOne();

  await centreModel.updateOne(
    { _id: centre._id },
    { zeroClient: !centre.zeroClient }
  );

  res.send("Action successful");
};

export const zeroClientStatus = async (req, res) => {
  const centre = await centreModel.findOne();

  res.send({ status: centre.zeroClient });
};

export const resetServer = async (req, res) => {
  await candidateModel.deleteMany();
  await examinationModel.deleteMany();
  await responseModel.deleteMany();
  await examScheduleModel.deleteMany();
  await questionBankCategoryModel.deleteMany();
  await questionBankModel.deleteMany();
  await subjectModel.deleteMany();

  res.send("Server reset");
};

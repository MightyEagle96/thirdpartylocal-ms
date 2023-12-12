import candidateModel from "../downloadAndUpload/candidateModel.js";
import { statuses } from "../downloadAndUpload/controller.js";
import examScheduleModel from "../downloadAndUpload/examScheduleModel.js";

export const examCandidates = async (req, res) => {
  const totalCandidates = await candidateModel.countDocuments({
    examination: req.examination,
  });

  const writing = await candidateModel.countDocuments({
    examination: req.examination,
    isWriting: true,
  });

  const submitted = await candidateModel.countDocuments({
    examination: req.examination,
    submitted: true,
  });

  const candidates = await candidateModel
    .find({
      examination: req.examination,
    })

    .select({
      answeredQuestions: 1,
      firstName: 1,
      lastName: 1,
      registrationNumber: 1,
      ipAddress: 1,
      submitted: 1,
      startTime: 1,
      stopTime: 1,
      duration: 1,
    })
    .sort({ registrationNumber: 1 });

  res.send({ totalCandidates, candidates, writing, submitted });
};

export const activatedExamMiddleware = async (req, res, next) => {
  const activatedExam = await examScheduleModel.findOne({
    status: statuses.ACTIVATED,
  });

  if (!activatedExam) return res.status(403).send("No activated exam");

  req.examination = activatedExam.examination;

  next();
};

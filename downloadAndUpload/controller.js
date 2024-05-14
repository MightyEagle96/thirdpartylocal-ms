import examinationModel from "./examinationModel.js";
import subjectModel from "./subjectModel.js";
import candidateModel from "./candidateModel.js";
import questionBankModel from "./questionBankModel.js";
import examScheduleModel from "./examScheduleModel.js";
import questionBankCategoryModel from "./questionBankCategoryModel.js";
import { RandomizeQuestions } from "./util.js";
import responseModel from "./responseModel.js";

export const statuses = {
  ACTIVATED: "ACTIVATED",
  TAKEN: "TAKEN",
  UPLOADED: "UPLOADED",
  NOTTAKEN: "NOT TAKEN",
};

let processing = false;
export const saveExamination = async (req, res) => {
  try {
    const exam = await examinationModel.findById(req.body.examination._id);

    if (exam) await examinationModel.deleteOne({ _id: exam._id });

    await examinationModel.create(req.body.examination);

    //to save the subjects
    await subjectModel.deleteMany({ _id: req.body.examination.subjects });
    await subjectModel.create(req.body.subjects);

    res.send("Examination downloaded");
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};

export const saveCandidates = async (req, res) => {
  try {
    await candidateModel.deleteMany();
    await responseModel.deleteMany();
    await candidateModel.create(req.body);
    res.send("Candidates created");
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};

export const saveQuestionBanks = async (req, res) => {
  try {
    await questionBankModel.deleteMany();
    await questionBankCategoryModel.deleteMany();

    await questionBankModel.create(req.body);

    res.send("Question banks created");

    for (let i = 0; i < req.body.length; i++) {
      for (let j = 0; j < 5; j++) {
        await questionBankCategoryModel.create({
          questionBank: req.body[i]._id,
          subject: req.body[i].subject,
          questionCategory: j + 1,
          questions: req.body[i].questions,
        });
      }
    }

    const categories = await questionBankCategoryModel.find();

    for (let i = 0; i < categories.length; i++) {
      const randomizedQuestions = RandomizeQuestions(
        categories[i].questions,
        categories[i].questions
      );

      const unique = [];

      randomizedQuestions.forEach((d) => {
        const exist = unique.find((c) => c.questionId === d.questionId);
        if (!exist) unique.push(d);
      });
      //console.log(randomizedQuestions.length);
      await questionBankCategoryModel.findByIdAndUpdate(categories[i]._id, {
        questions: unique,
      });
    }
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};

export const saveSchedule = async (req, res) => {
  try {
    await examScheduleModel.deleteMany();

    await examScheduleModel.create(req.body);

    res.send("Exam schedule created");
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};

export const viewSchedule = async (req, res) => {
  //this is because only one schedule can exist on the server at a particular time
  const schedule = await examScheduleModel.findOne().populate("examination");
  res.send(schedule);
};

export const activateexam = async (req, res) => {
  await examScheduleModel.updateOne(
    { _id: req.params.id },
    { status: statuses.ACTIVATED, startTime: new Date() }
  );
  res.send("Examination Activated");
};

export const endExam = async (req, res) => {
  await examScheduleModel.updateOne(
    { examination: req.examination },
    { status: statuses.TAKEN, stopTime: new Date() }
  );
  res.send("Examination ended");
  processing = true;

  const allResponses = await responseModel.find({
    examination: req.examination,
  });

  for (let i = 0; i < allResponses.length; i++) {
    const { responses } = allResponses[i];

    const subjectScore = [];

    for (let j = 0; j < responses.length; j++) {
      const existing = subjectScore.findIndex(
        (c) => c.subject.toString() === responses[j].subject.toString()
      );

      if (existing < 0) {
        subjectScore.push({
          subject: responses[j].subject,
          score: responses[j].score,
        });
      } else {
        subjectScore[existing].score += responses[j].score;
      }
    }

    await responseModel.updateOne(
      { _id: allResponses[i]._id },
      { subjectScore }
    );
  }
  processing = false;
};

export const getResponses = async (req, res) => {
  try {
    if (processing)
      return res
        .status(503)
        .send("Server is still processing candidate's responses");

    const responses = await responseModel.find({ examination: req.params.id });

    res.send(responses);
  } catch (error) {
    res.status(500).send(new Error(error).message);
  }
};

export const updateExamWithUploaded = async (req, res) => {
  await examScheduleModel.updateOne(
    { examination: req.params.id },
    { status: statuses.UPLOADED }
  );
  res.send("Responses Recieved");
};

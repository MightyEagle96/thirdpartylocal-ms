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

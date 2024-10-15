import arrayShuffle from "array-shuffle";
export const RandomizeQuestions = (questions, questionsCopy) => {
  try {
    const unclustered = questions.filter(
      (question) => question.clustered === false
    );

    const clusteredQuestions = [];

    let isClustered = false;

    let clusteredId = [];

    let penultimate = [];

    while (questionsCopy.length > 0) {
      const question = questionsCopy.shift();

      if (question) {
        if (question.startGroup) {
          isClustered = true;
          clusteredQuestions.push([question]);
        } else if (isClustered) {
          clusteredQuestions[clusteredQuestions.length - 1].push(question);

          if (question.endGroup) isClustered = false;
        }
      }
    }

    for (let i = 0; i < clusteredQuestions.length; i++) {
      for (let j = 0; j < clusteredQuestions[i].length; j++) {
        clusteredId.push(clusteredQuestions[i][j].questionId);
      }
    }

    penultimate = [...clusteredQuestions, ...unclustered];

    const shuffledStage1 = arrayShuffle(penultimate);

    //inside this stage1
    let result = [];

    for (let i = 0; i < shuffledStage1.length; i++) {
      if (shuffledStage1[i].length && shuffledStage1[i].length > 0) {
        for (let j = 0; j < shuffledStage1[i].length; j++) {
          result.push(shuffledStage1[i][j]);
        }
      } else {
        result.push(shuffledStage1[i]);
      }
    }

    for (let i = 0; i < result.length; i++) {
      result[i].options = arrayShuffle(result[i].options);
    }

    return result;
  } catch (error) {
    console.log(new Error(error).stack);
  }
};

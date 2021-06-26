/*
  Return a frequency hash of answers by question_id

  SAMPLE RETURN DATA: 
  {
    13903: {
      "Yes": 2,
      "No": 4
    },
    39023: {
      "Pizza": 1,
      "Burrito": 4
    }
  }
*/

function count_survey_responses(data) {
//check if there's any data at all
  if(data.length === 0) return null;

  return data.reduce((acc, curr) => {
    curr.questions.forEach((obj) => {
      const countsForAnswers = {};

      obj.answers.forEach((string) => {
        if (countsForAnswers[string]) {
          countsForAnswers[string] = countsForAnswers[string] + 1;
        } else {
          countsForAnswers[string] = 1;
        }
      });

//if the question ID exists already, add the answer counts to the previously found answer counts
      if (acc[obj.question_id]) {
        Object.keys(acc[obj.question_id]).forEach((key) => {
          acc[obj.question_id][key] =
            acc[obj.question_id][key] + countsForAnswers[key];
        });
      } else {
        acc[obj.question_id] = countsForAnswers;
      }
    });
    
//return the values
    return acc;
  }, {});
}

module.exports = { count_survey_responses };

import { QuestionsType } from "../../types";

interface QuestionListProps {
  questionsData: QuestionsType[];
}

const QuestionList = ({ questionsData }: QuestionListProps) => {
  return (
    <>
      {questionsData.map((question, index) => {
        // Combine incorrect answers and correct answer into one array
        const options = [...question.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * (options.length + 1));
        options.splice(randomIndex, 0, question.correct_answer);

        return (
          <div key={index}>
            <h3>{question.question}</h3>
            {options.map((option, optionIndex) => (
              <button key={optionIndex} onClick={() => console.log(option)}>
                {option}
              </button>
            ))}
          </div>
        );
      })}
      <button>Check Answers</button>
    </>
  );
};

export default QuestionList;
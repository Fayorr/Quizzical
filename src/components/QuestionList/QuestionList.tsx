import { useState, useEffect } from "react";
import { QuestionsType } from "../../types";
import tick from "../../assets/tick.svg";
import cross from "../../assets/cross.svg";
import shape1 from "../../assets/shape-1.png"
import styled from "styled-components";

interface QuestionListProps {
  questionsData: QuestionsType[];
  isGameLoaded: boolean;
  setIsGameLoaded: (loaded: boolean) => void;
}

const QuestionList = ({
  questionsData,
  isGameLoaded,
  setIsGameLoaded,
}: QuestionListProps): JSX.Element => {
  const [correctOptionsList, setCorrectOptionsList] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]);
  const [showAnswers, setShowAnswers] = useState<boolean>(false); // State to control answer highlighting

  // Shuffle options once when the component mounts
  useEffect(() => {
    const shuffled = questionsData.map((question) => {
      const options = [...question.incorrect_answers];
      const randomIndex = Math.floor(Math.random() * (options.length + 1));
      options.splice(randomIndex, 0, question.correct_answer);
      return options;
    });
    setShuffledOptions(shuffled);
  }, [questionsData]);

  // Function to handle correct/wrong answers
  const handleCheckCorrectAnswer = (selectedOption: string, correctOption: string, questionIndex: number) => {
    // Update the selected answers state
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionIndex]: selectedOption,
    }));

    if (selectedOption === correctOption) {
      // Add the correct option to the correctOptionsList
      setCorrectOptionsList((prevCorrectOptionsList) => [
        ...prevCorrectOptionsList,
        correctOption,
      ]);
    } else {
      console.log("wrong");
    }
  };

  // Function to show the final score and highlight answers
  const handleShowAnswers = () => {
    setShowAnswers(true); // Enable answer highlighting
    console.log(`You got ${correctOptionsList.length}/${questionsData.length} correct`);
    console.log("Correct answers:", correctOptionsList);
  };

  // Function to reset the quiz
  const handleResetQuiz = () => {
    setCorrectOptionsList([]);
    setSelectedAnswers({});
    setShowAnswers(false); // Disable answer highlighting
    setIsGameLoaded(!isGameLoaded);
  };

  return (
    <>
      <Shape1><img src={shape1} alt='shape' /></Shape1>
      <QuestionListContainer>

      
      {questionsData.map((question, index) => {
        const options = shuffledOptions[index] || []; // Use pre-shuffled options

        return (
          <div key={index}>
            <Question>{question.question}</Question>
            {options.map((option, optionIndex) => {
              const isSelected = selectedAnswers[index] === option;
              const isCorrect = option === question.correct_answer;

              // Determine button styles
              let backgroundColor = "white";
              if (showAnswers) {
                if (isCorrect) {
                  backgroundColor = "green"; // Highlight correct answer in green
                } else if (isSelected && !isCorrect) {
                  backgroundColor = "red"; // Highlight selected wrong answer in red
                }
              }

              return (
                <OptionButton
                  key={optionIndex}
                  onClick={() => handleCheckCorrectAnswer(option, question.correct_answer, index)}
                  disabled={selectedAnswers[index] !== undefined} // Disable after selection
                  style={{
                    backgroundColor,
                    borderColor: isSelected ? "white" : "black",
                  }}
                >
                  {option}
                </OptionButton>
              );
            })}
            {showAnswers && (
              <Image
                src={selectedAnswers[index] === question.correct_answer ? tick : cross}
                alt="tick or cross"
              />
            )}
          </div>
        );
      })}
      </QuestionListContainer>

      <Footer>
      {showAnswers && <h2>{`You got ${correctOptionsList.length}/${questionsData.length} correct`}</h2>}  
      {showAnswers ? <button onClick={handleResetQuiz}>Play again</button> : <button onClick={handleShowAnswers}>Check Answers</button>}
      </Footer>
    </>
  );
};

const Shape1 = styled.div`
  position: absolute;
  top: 0;
  right: 5%;
  img {
    width: 140%;
  }
    @media screen and (max-width: 768px) {
      right: 0;
    img{
      width: 100%;
    
    }}
  `;

  const QuestionListContainer = styled.div`
 display: flex;
 flex-direction: column;
  margin: 0 auto;
  padding: 2.5rem 5rem;
  background-color: red;
  `;
const Question = styled.h3`
  font-size: 1.2rem;
  font-family: "Karla", sans-serif;
  color: #293264;
  `;
const OptionButton = styled.button`
border: none;
border-radius: 15px;
padding: .5rem 1rem;
color: #293264;

`;
const Image = styled.img`
  width: 4%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 2rem;  */
`;

export default QuestionList;

import { useState, useEffect } from "react";
import { QuestionsType } from "../../types";
import StyledButton from "../../constants/Button";
import tick from "../../assets/tick.svg";
import cross from "../../assets/cross.svg";
import shape1 from "../../assets/shape-1.png"
import shape2 from "../../assets/shape-2.png"
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
    
    // console.log(selectedAnswers)
    if (selectedOption === correctOption) {
      // Add the correct option to the correctOptionsList
      setCorrectOptionsList((prevCorrectOptionsList) => [
        ...prevCorrectOptionsList,
        correctOption,
      ]);
    } else {
      return;
    }
  };

  // Function to show the final score and highlight answers
  const handleShowAnswers = () => {
    setShowAnswers(true); 
  };

  // Function to reset the quiz
  const handleResetQuiz = () => {
    setCorrectOptionsList([]);
    setSelectedAnswers({});
    setShowAnswers(false); // Disable answer highlighting
    setIsGameLoaded(!isGameLoaded);
  };

  return (
    <Container>
      <QuestionListContainer>
      <Shape1><img src={shape1} alt='shape' /></Shape1>
      {questionsData.map((question, index) => {
        const options = shuffledOptions[index] || []; // Use pre-shuffled options

        return (
          <MainContainer key={index}>
            <FirstContainer>
              <Question>{question.question}</Question>
              <OptionsContainer>            
            {options.map((option, optionIndex) => {
              const isSelected = selectedAnswers[index] === option;
              const isCorrect = option === question.correct_answer;

              // Determine button styles
              let backgroundColor = "white";
              
              let borderColor = "#293264";
              if (isSelected){
                  backgroundColor = "#D6DBF5"; // Highlight selected answer in blue
                  borderColor = "#D6DBF5";
                }
              if (showAnswers) {
                if (isCorrect) {
                  backgroundColor = "#94D7A2"; // Highlight correct answer in green
                  borderColor = "#94D7A2";
              
                } else if (isSelected && !isCorrect) {
                  backgroundColor = "#F8BCBC"; // Highlight selected wrong answer in red
                  borderColor = "#F8BCBC";
                }
              }

              return (
                <OptionButton
                  key={optionIndex}
                  onClick={() => handleCheckCorrectAnswer(option, question.correct_answer, index)}
                    style={{
                    backgroundColor, borderColor,
                  }}
                >
                  {option}
                </OptionButton>
              );
            })}
              </OptionsContainer>
            </FirstContainer>
            {showAnswers && (
              <Image
                src={selectedAnswers[index] === question.correct_answer ? tick : cross}
                alt="tick or cross"
              />
            )}
          </MainContainer>
        );
      })}
      </QuestionListContainer>
      <Footer>
      {showAnswers && <h2>{`You got ${correctOptionsList.length}/${questionsData.length} correct`}</h2>}  
      
      {showAnswers ? <StyledButton onClick={handleResetQuiz}>Play again</StyledButton> : <Button disabled={Object.keys(selectedAnswers).length != shuffledOptions.length}  onClick={handleShowAnswers}>Check Answers</Button>}
      <Shape2><img src={shape2} alt='shape' /></Shape2>
      </Footer>

    </Container>
  );
};
const Container = styled.div`
height: 100vh;
/* background-color: yellow; */
`;
const Button = styled.button<{ disabled: boolean }>`
  background-color:#293264;;
    color: #F5F7FB;
  border-radius: 15px;
    padding: 1rem 3.4rem;
  font-size: 16px;
    font-weight: 400;
    font-family: "Karla", sans-serif;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  /* @media only screen and (max-width: 600px) {
    margin-top: 2rem;
  } */
`;

const Shape1 = styled.div`
  position: absolute;
  top: 0;
  right: 0%;
  img {
    width: 100%;
  }
    @media screen and (max-width: 768px) {
      right: -20%;
    img{
      width: 50%;
    
    }}
  `;

const FirstContainer = styled.div`
display: block;
`;
const MainContainer = styled.div`
display: flex;
justify-content: space-between;
width: 90%;
/* height: 100vh; */

`;
  const QuestionListContainer = styled.div`
 display: flex;
 flex-direction: column;
  margin: 0 auto;
  padding: 2rem 7rem 0;
  position: relative;
  @media screen  and (max-width: 768px) {
    padding: 2.5rem 2.5rem;
    
  }
  @media only screen and (max-width: 600px) {
    height: 90vh;
      padding-bottom: 0;
      padding: 2.5rem 2.5rem 0;
  }
  `;
const Question = styled.h3`
  font-size: 1.2rem;
  font-family: "Karla", sans-serif;
  color: #293264;
  @media only screen and (max-width: 600px) {
    padding: 1rem 0;
    margin: 0;
    font-size: 1rem;
    /* padding-bottom: 0; */
  }
  `;

const OptionsContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-wrap: wrap;
gap: .5rem;
padding-bottom: 10px;
border-bottom: 1px solid #DBDEF0;
  margin-top: 1rem;
max-width: 100%;
  @media screen and (max-width: 768px) {
    gap: .2rem;
    max-width: 100%;
  }
  @media only screen and (max-width: 600px) {
     margin-top: 0rem;
     /* background-color: yellow; */
     padding-bottom: 0;
  }
`;
const OptionButton = styled.button`
border: 1px solid #293264;
border-radius: 15px;
padding: .3rem 1rem;
color: #293264;
font-size: 0.8rem;
font-family: "Inter", sans-serif;
font-weight: 600;
cursor: pointer;
@media screen and (max-width: 768px) {
  font-size: 0.7rem;
  padding: .25rem .8rem;
}
`;
const Image = styled.img`
  width: 4%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  position: relative;
  padding-top: 1rem;
  height: 3rem;
  h2 {
    font-size: 1.2rem;
    font-family: "Karla", sans-serif;
    color: #293264;
  }
  @media only screen and (max-width: 600px) {
    /* background-color: red; */
    padding: 0;
    /* margin-top: -10rem; */
    /* padding-bottom: 0; */
  }
`;
const Shape2 = styled.div`
  position: absolute;
  bottom: -10%;
  left: 0;
    img {
    width: 60%;
  }
  @media screen and (max-width: 768px) {
    position: absolute;
    bottom: -20%;
    img{
      width:50%;
    }
  }
  /* @media only screen and (max-width: 600px) {
    padding-left: -10rem;
    position: absolute;
   bottom: 0%;
   left: -10;

  } */

  `;

export default QuestionList;

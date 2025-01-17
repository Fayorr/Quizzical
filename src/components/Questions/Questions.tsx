import { FC } from 'react';
import { GameOptionsType, GameStateType } from '../../types';
import StyledButton from "../../constants/Button";
import styled from 'styled-components';
import shape1 from "../../assets/shape-1.png"
import shape2 from "../../assets/shape-2.png"

interface QuestionsProps extends GameStateType {
  handleFetchQuestions: () => void; // Add handleFetchQuestions to the props
}

const Questions: FC<QuestionsProps> = ({
  gameOptions,
  setGameOptions,
  handleFetchQuestions,
}): JSX.Element => {
  // Function to handle select changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setGameOptions((prevGameOptions: GameOptionsType) => ({
      ...prevGameOptions,
      [name]: value,
    }));
  };

  return (
    <QuizzicalContainer>
      <Shape1><img src={shape1} alt='shape' /></Shape1>
      <Title>Quizzical</Title>
      <Description>Answer the questions and test your knowledge!</Description>
      <GameOptionsContainer>
        <SelectContainer>
          <Label htmlFor="category">Category:</Label>
          <Select
            name="category"
            id="category"
            value={gameOptions.category}
            onChange={handleChange}
            aria-label="Select category"
          >
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </Select>
        </SelectContainer>

        <SelectContainer>
          <Label htmlFor="difficulty">Difficulty:</Label>
          <Select
            name="difficulty"
            id="difficulty"
            value={gameOptions.difficulty}
            onChange={handleChange}
            aria-label="Select difficulty"
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </SelectContainer>

        <SelectContainer>
          <Label htmlFor="type">Type of questions:</Label>
          <Select
            name="type"
            id="type"
            value={gameOptions.type}
            onChange={handleChange}
            aria-label="Select type of questions"
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </Select>
        </SelectContainer>
      </GameOptionsContainer>
      <StyledButton onClick={handleFetchQuestions}>Start Quiz</StyledButton>
      <Shape2><img src={shape2} alt='shape' /></Shape2>
    </QuizzicalContainer>
  );
};

const QuizzicalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  position: relative;
   overflow: hidden;
`;
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
const Title = styled.h1`
  font-size: 2.5rem;
  font-family: "karla", sans-serif;
  font-weight: 700;
  color: #293264;
  margin-bottom: 10px;
  padding-top:  5rem;
`;

const Description = styled.p`
font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: #293264;
  margin-bottom: 20px;
`;

const GameOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  max-width: 550px;
  margin-bottom: 20px;
`;

const SelectContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between; 
  align-items: center;

`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Karla", sans-serif; 
   color: #293264;
  /* margin-right: 1rem; */
  margin-bottom: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
    font-size: .9rem;
    color: #293624;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 385px;
@media screen and (max-width: 768px) {
     max-width: 300px;
    }
`;

const Shape2 = styled.div`
  position: absolute;
  bottom: -1%;
  left: 0;
    img {
    width: 140%;
  }
  @media screen and (max-width: 768px) {
    img{
      width: 100%;
    }
  }
  `;
// const StyledButton = styled.button`
//   padding: 10px 20px;
//   font-size: 1rem;
//   color: #fff;
//   background-color: #007bff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

export default Questions;
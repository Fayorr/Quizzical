import Questions from './components/Questions/Questions';
import QuestionList from './components/QuestionList/QuestionList';
import { QuestionsType, GameOptionsType } from './types';
import { FC, useState } from 'react';
import GlobalStyle from './constants/globalStyles';
import he from 'he'; // Import the he library

// Decode the API data using he library
const decodeApiData = (data: QuestionsType[]): QuestionsType[] => {
  return data.map((item) => ({
    ...item,
    question: he.decode(item.question),
    correct_answer: he.decode(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map((answer) => he.decode(answer)),
  }));
};

const App: FC = (): JSX.Element => {
  const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);
  const [questionsData, setQuestionsData] = useState<QuestionsType[]>([]);
  const [gameOptions, setGameOptions] = useState<GameOptionsType>({
    category: '',
    difficulty: '',
    type: '',
  });

  const handleFetchQuestions = async (): Promise<void> => {
    const { category, difficulty, type } = gameOptions;

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: { results: QuestionsType[] } = await response.json();
      const decodedData = decodeApiData(data.results);
      setIsGameLoaded(true); // Set isGameLoaded to true
      setQuestionsData(decodedData);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };


  return (
    <>
      <GlobalStyle />
      {isGameLoaded ? (
        <QuestionList
          isGameLoaded={isGameLoaded}
          setIsGameLoaded={setIsGameLoaded}
          questionsData={questionsData}
        />
      ) : (
        <Questions
          handleFetchQuestions={handleFetchQuestions}
          gameOptions={gameOptions}
          setGameOptions={setGameOptions}
          isGameLoaded={isGameLoaded}
          setIsGameLoaded={setIsGameLoaded}
        />
      )}
    </>
  );
};

export default App;
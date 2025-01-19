import Questions from './components/Questions/Questions';
import QuestionList from './components/QuestionList/QuestionList';
import { QuestionsType, GameOptionsType  } from './types';
import { FC, useState } from 'react';
import GlobalStyle from './constants/globalStyles';


// Decode the API data
const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

const decodeApiData = (data: QuestionsType[]): QuestionsType[] => {
  return data.map((item) => ({
    ...item,
    question: decodeHtmlEntities(item.question),
    correct_answer: decodeHtmlEntities(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map(decodeHtmlEntities),
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
    let categoryChoice = '';
    let difficultyChoice = '';
    let typeChoice = '';

    if (gameOptions.category !== '') categoryChoice = gameOptions.category;
    if (gameOptions.difficulty !== '') difficultyChoice = gameOptions.difficulty;
    if (gameOptions.type !== '') typeChoice = gameOptions.type;

    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&category=${categoryChoice}&difficulty=${difficultyChoice}&type=${typeChoice}`
    );
    const data: { results: QuestionsType[] } = await response.json();
    const decodedData = decodeApiData(data.results);
    setIsGameLoaded(!isGameLoaded); // Set isGameLoaded to true
    setQuestionsData(decodedData);
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
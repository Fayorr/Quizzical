import Questions from './components/Questions/Questions';
import QuestionList from './components/QuestionList/QuestionList';
import { QuestionsType, GameOptionsType, GameLoadedType } from './types';
import { FC, useState } from 'react';

const App: FC = (): JSX.Element => {
  const [isGameLoaded, setIsGameLoaded] = useState<GameLoadedType>(false);
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
    setIsGameLoaded(!isGameLoaded); // Set isGameLoaded to true
    setQuestionsData(data.results);
  };

  return (
    <>
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
        />
      )}
    </>
  );
};

export default App;
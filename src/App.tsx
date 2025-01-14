import Questions from './components/Questions/Questions'
import QuestionList from "./components/QuestionList/QuestionList"
import { QuestionsType, GameOptionsType } from './types'
import {FC, useState} from "react"

const App: FC = (): JSX.Element =>  {

  const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);
  const [questionsData, setQuestionsData] = useState<QuestionsType[]>([])
  const [gameOptions, setGameOptions] = useState<GameOptionsType>({
        category: "", difficulty: "", type: ""
    });

    const handleFetchQuestions = async (): Promise<void> => {
    let categoryChoice = "";
	let difficultyChoice = "";
	let typeChoice = "";

	if (gameOptions.category !== "")
		categoryChoice = gameOptions.category;

	if (gameOptions.difficulty !== "")
		difficultyChoice = gameOptions.difficulty;

	if (gameOptions.type !== "")
		typeChoice = gameOptions.type;

const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${categoryChoice}&difficulty=${difficultyChoice}&type=${typeChoice}`);
const data: {results: QuestionsType[]} = await response.json();
console.log(data.results)
setIsGameLoaded(!isGameLoaded)
setQuestionsData(data.results)

}
  return (
    <>
    {isGameLoaded ? <QuestionList questionsData={questionsData} setQuestionsData={setQuestionsData}/> : <Questions isGameLoaded={isGameLoaded} setIsGameLoaded={setIsGameLoaded} handleFetchQuestions={handleFetchQuestions} gameOptions={gameOptions} setGameOptions={setGameOptions}/>}
      
      
      
    </>
  )
}

export default App

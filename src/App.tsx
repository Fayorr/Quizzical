import Questions from './components/Questions/Questions'
import QuestionList from "./components/QuestionList/QuestionList"
import { QuestionsType } from './types'
import {FC, useState} from "react"

const App: FC = (): JSX.Element =>  {

  const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);
  const [questionsData, setQuestionsData] = useState<QuestionsType[]>([])

  return (
    <>
    {isGameLoaded ? <QuestionList /> : <Questions isGameLoaded={isGameLoaded} setIsGameLoaded={setIsGameLoaded}/>}
      
      
      
    </>
  )
}

export default App

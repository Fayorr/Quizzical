import {FC, useState } from 'react'
import { GameOptionsType, GameLoadedType } from '../../types'

const Questions: FC<GameLoadedType> = ({isGameLoaded, setIsGameLoaded}):JSX.Element => {
    const [gameOptions, setGameOptions] = useState<GameOptionsType>({
        category: "", difficulty: "", type: ""
    });
    const [gameDetail, setGameDetail] = useState<boolean>(false);



//Function (select options)
const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setGameOptions((prevgameOptions) => {
        return { ...prevgameOptions, [name]:value
}})
}
//Function (fetch from api)
const handleFetchQuestions = async () => {
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
const data: {results: GameOptionsType} = await response.json();
console.log(data.results)
setGameDetail(!gameDetail)
setIsGameLoaded(!isGameLoaded)
return (data.results)
}

  return (
    <>
    <div className="gameOptions-container">
							<div className="select-container">
								<label className="custom-label" htmlFor="category">Category:</label>
								<select
									name="category"
									id="category"
									className="custom-select"
									value={gameOptions.category}
									onChange={handleChange}
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
								</select>
							</div>
							
							<div className="select-container">
								<label className="custom-label" htmlFor="difficulty">Difficulty:</label>

								<select
									name="difficulty"
									id="difficulty"
									className="custom-select"
									value={gameOptions.difficulty}
									onChange={handleChange}
								>
									<option value="">Any Difficulty</option>
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</select>
							</div>
							
							<div className="select-container">
								<label className="custom-label" htmlFor="type">Type of questions:</label>

								<select
									name="type"
									id="type"
									className="custom-select"
									value={gameOptions.type}
									onChange={handleChange}
								>
									<option value="">Any Type</option>
									<option value="multiple">Multiple Choice</option>
									<option value="boolean">True / False</option>
								</select>
							</div>
		</div>
        <button type="submit" onClick={handleFetchQuestions}>Start Quiz</button>

    </>
  )
};

export default Questions
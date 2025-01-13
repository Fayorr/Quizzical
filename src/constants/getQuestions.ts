// import { GameOptionsType  } from "../types";

// const getQuestions = (gameOptions: GameOptionsType) => {


// 	const { category, difficulty, type } = gameOptions;

// 	let categoryChoice = "";
// 	let difficultyChoice = "";
// 	let typeChoice = "";

// 	if (category !== "")
// 		categoryChoice = category;

// 	if (difficulty !== "")
// 		difficultyChoice = difficulty;

// 	if (type !== "")
// 		typeChoice = type;

// 	let apiUrl = `https://opentdb.com/browse.php/api.php?amount=5&category=${categoryChoice}&difficulty=${difficultyChoice}&type=${typeChoice}`;

// 	return fetch(apiUrl)
// 		.then(res => res.json())
// 		.then(data => data.results);
// }

// export default getQuestions;
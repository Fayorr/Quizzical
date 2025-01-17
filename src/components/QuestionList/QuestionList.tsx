import React, { useState, useEffect } from "react";
import { QuestionsType } from "../../types";
import tick from "../../assets/tick.svg";
import cross from "../../assets/cross.svg";
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
      {questionsData.map((question, index) => {
        const options = shuffledOptions[index] || []; // Use pre-shuffled options

        return (
          <div key={index}>
            <h3>{question.question}</h3>
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
                <button
                  key={optionIndex}
                  onClick={() => handleCheckCorrectAnswer(option, question.correct_answer, index)}
                  disabled={selectedAnswers[index] !== undefined} // Disable after selection
                  style={{
                    backgroundColor,
                    borderColor: isSelected ? "white" : "black",
                  }}
                >
                  {option}
                </button>
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
      {showAnswers && <h2>{`You got ${correctOptionsList.length}/${questionsData.length} correct`}</h2>}
      <button onClick={handleShowAnswers}>Check Answers</button>
      <button onClick={handleResetQuiz}>Reset Quiz</button>
    </>
  );
};

const Image = styled.img`
  width: 4%;
`;

export default QuestionList;

// const Image = styled.img`
//   width: 4%;
// `
// Take 2
// import { QuestionsType } from "../../types";
// import { useState, useEffect } from "react";

// interface QuestionListProps {
//   questionsData: QuestionsType[];
// }

// const QuestionList = ({ questionsData }: QuestionListProps): JSX.Element => {
//   //States
//   const [correctOptionsList, setCorrectOptionsList] = useState<string[]>([]);
//   const [wrongOptionsList, setWrongOptionsList] = useState<string[]>([]);
//   const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
//   const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]); //state for controlling fetched data after mount
//   const [showAnswers, setShowAnswers] = useState<boolean>(false); // State to control answer highlighting

//   // Shuffle options when  component mounts
//   useEffect(() => {
//     const shuffled = questionsData.map((question) => {
//       const options = [...question.incorrect_answers];
//       const randomIndex = Math.floor(Math.random() * (options.length + 1));
//       options.splice(randomIndex, 0, question.correct_answer);
//       return options;
//     });
//     setShuffledOptions(shuffled);
//   }, [questionsData]);

//   // Function to handle correct/wrong answers
//   const handleCheckCorrectAnswer = (selectedOption: string, correctOption: string, questionIndex: number) => {
//     // Update the selected answers state
//     setSelectedAnswers((prevSelectedAnswers) => ({
//       ...prevSelectedAnswers,
//       [questionIndex]: selectedOption,
//     }));

//     if (selectedOption === correctOption) {
//       // Add the correct option to the correctOptionsList
//       setCorrectOptionsList((prevCorrectOptionsList) => [
//         ...prevCorrectOptionsList,
//         correctOption,
//       ]);
//     } else {
//       // Add the selected option to the wrongOptionsList
//       setWrongOptionsList((prevWrongOptionsList) => [
//         ...prevWrongOptionsList,
//         selectedOption,
//       ]);
//     }
//   };

//   // Function to show the final score and highlight answers
//   const handleShowAnswers = () => {
//     setShowAnswers(true); // Enable answer highlighting

//     console.log(`You got ${correctOptionsList.length}/${questionsData.length} correct`);
//     console.log("Correct answers:", correctOptionsList);
//     console.log("Wrong answers:", wrongOptionsList);
//   };

//   // Function to reset the quiz
//   const handleResetQuiz = () => {
//     setCorrectOptionsList([]);
//     setWrongOptionsList([]);
//     setSelectedAnswers({});
//     setShowAnswers(false); // Disable answer highlighting
//   };

//   return (
//     <>
//       {questionsData.map((question, index) => {
//         const options = shuffledOptions[index] || []; // Use pre-shuffled options

//         return (
//           <div key={index}>
//             <h3>{question.question}</h3>
//             {options.map((option, optionIndex) => {
//               const isSelected = selectedAnswers[index] === option;
//               const isCorrect = option === question.correct_answer;

//               // Apply highlighting only if showAnswers is true
//               const backgroundColor = showAnswers
//                 ? isSelected
//                   ? isCorrect
//                     ? "green" // Highlight correct answer in green
//                     : "red" // Highlight wrong answer in red
//                   : "white"
//                 : "white";
              
//               return (
//                 <button
//                   key={optionIndex}
//                   onClick={() => handleCheckCorrectAnswer(option, question.correct_answer, index)}
//                   disabled={selectedAnswers[index] !== undefined} // Disable after selection
//                   style={{
//                     backgroundColor,
//                     color: isSelected ? "white" : "black",
//                   }}
//                 >
//                   {option}
//                 </button>
//               );
//             })}
//           </div>
//         );
//       })}
//       <button onClick={handleShowAnswers} disabled={Object.keys(selectedAnswers).length !== shuffledOptions.length}>Check Answers</button>
//       <button onClick={handleResetQuiz}>Reset Quiz</button>
//     </>
//   );
// };

// export default QuestionList;
// import { QuestionsType } from "../../types";
// import { useState } from "react";

// interface QuestionListProps {
//   questionsData: QuestionsType[];
// }

// const QuestionList = ({ questionsData }: QuestionListProps): JSX.Element => {
//   const [correctOptionsList, setCorrectOptionsList] = useState<string[]>([]);
//   const [wrongOptionsList, setWrongOptionsList] = useState<string[]>([]);

//   // Function to handle correct/wrong answers
//   const handleCheckCorrectAnswer = (selectedOption: string, correctOption: string) => {
//     if (selectedOption === correctOption) {
//       // Add the correct option to the correctOptionsList
//       setCorrectOptionsList((prevCorrectOptionsList) => [
//         ...prevCorrectOptionsList,
//         correctOption,
//       ]);
//     } else {
//       // Add the selected option to the wrongOptionsList
//       setWrongOptionsList((prevWrongOptionsList) => [
//         ...prevWrongOptionsList,
//         selectedOption,
//       ]);
//     }
//   };

//   // Function to show the final score
//   const handleShowAnswers = () => {
//     console.log(`You got ${correctOptionsList.length}/${questionsData.length} correct`);
//     console.log("Correct answers:", correctOptionsList);
//     console.log("Wrong answers:", wrongOptionsList);
//   };

//   return (
//     <>
//       {questionsData.map((question, index) => {
//         // Combine incorrect answers and correct answer into one array
//         const options = [...question.incorrect_answers];
//         const randomIndex = Math.floor(Math.random() * (options.length + 1));
//         options.splice(randomIndex, 0, question.correct_answer);

//         return (
//           <div key={index}>
//             <h3>{question.question}</h3>
//             {options.map((option, optionIndex) => (
//               <button
//                 key={optionIndex}
//                 onClick={() => handleCheckCorrectAnswer(option, question.correct_answer)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         );
//       })}
//       <button onClick={handleShowAnswers}>Check Answers</button>
//     </>
//   );
// };

// export default QuestionList;
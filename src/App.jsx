import { useState, useEffect } from 'react'
import './App.css'
import Homepage from './Homepage'
import Quizpage from './Quizpage'
import svg1 from "./assets/blob.svg"
import svg2 from "./assets/bob1.svg"
import triviaQuestions from "./utils"

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

function App() {
  //states
  const [showQuiz, setShowQuiz] = useState(true)
  const [quiz, setQuiz] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [gameCount, setGameCount] = useState(0)
   
  // App.jsx
useEffect(() => {
  // 1. Create a controller instance
  const controller = new AbortController();
  const signal = controller.signal;

  async function getQuestions() {
    try {
      // 2. Pass the signal down into your fetch handler
      const data = await triviaQuestions(3, signal);
      
      const preparedQuestions = data.map(item => ({
        ...item,
        shuffledOptions: shuffleArray([...item.incorrect_answers, item.correct_answer])
      }));
      setQuiz(preparedQuestions);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Fetch failed:", error);
      }
    }
  }

  getQuestions();

  // 3. Return the cleanup function to cancel the previous fetch immediately
  return () => {
    controller.abort();
  };
}, [gameCount]);


 
  //functions

  function checkAnswers(){
   let  correctCount = 0
   selectedAnswers.forEach(item=>{
    const correctQuestion  = quiz[item.qIndex]
    if(correctQuestion && item.answer === correctQuestion.correct_answer){
      correctCount++
    }
    setScore(correctCount)
    setIsChecking(true)
   })
  }

  function startQuiz(){
     setShowQuiz(false)
  }

  function resetGame(){
    setShowQuiz(true)
    setSelectedAnswers([])
    setQuiz([])
    setScore(0)
    setIsChecking(false)
    setGameCount(prev => prev + 1)
  }
   function chooseAnswer(questionIndex, chosenOption){
    setSelectedAnswers(prevAnswers=>{
      const existingAnswer = prevAnswers.find(item=> item.qIndex === questionIndex)
      if(existingAnswer){
        if(existingAnswer.answer === chosenOption){
          return prevAnswers.filter(item=> item.qIndex !== questionIndex )
        }
       return prevAnswers.map(item => item.qIndex === questionIndex 
         ? { ...item, answer: chosenOption } : item
      );

      }
          return [...prevAnswers, { qIndex: questionIndex, answer: chosenOption }];
    })
    console.log(selectedAnswers)
   }


  

   

  return (
    <>
     <main >
      <img className='fixed right-0 top-0' src={svg1} alt="" />
      <img className='fixed left-0  bottom-0' src={svg2} alt="" />

      {showQuiz?  <Homepage state={showQuiz} onClick={startQuiz} />
        : <Quizpage quiz={quiz} selectedAnswers={selectedAnswers} onClick={chooseAnswer}
          score={score} isChecking={isChecking} onCheckAnswer={checkAnswers}  resetGame={resetGame}/>}
     </main>
    </>
  )
}

export default App

import React, { useEffect } from 'react'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'

export default function Quiz(){

    const [questions, setQuestions] = React.useState([])
    const [endGame, setEndGame] = React.useState(false)
    const [count, setCount] = React.useState(0)

    // enable classnames package (used to set the classes on answer's tags based on the game phase)
    const classNames = require('classnames');

    //fetch the data and store them in questions state
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.results.length; i++){

                const currentQuestion = data.results[i]

                const random = Math.floor(Math.random() * 4)
                const answers = [...currentQuestion.incorrect_answers]
                answers.splice(random, 0, currentQuestion.correct_answer)

                const allAnswers = answers.map(answer => ({
                    answer: decode(answer),
                    questionNumber: i+1,
                    isSelected: false,
                    isCorrect: answer === currentQuestion.correct_answer ? true : false
                }))

                setQuestions(prevQuestions => [...prevQuestions, {
                    question: decode(currentQuestion.question),
                    questionNumber: i+1,
                    answers: allAnswers
                }])
            }
        })
    }, [count])
    
    //set the user's chosen answer for every question
    function handleClick(answerValue, answerNumber){
        setQuestions(prevQuestions => {
            const newQuestions = []
            for (const question of prevQuestions){
                if (answerNumber === question.questionNumber){
                    for (const answer of question.answers){
                        answerValue === answer.answer ? answer.isSelected = !answer.isSelected : answer.isSelected = false
                    }
                }
                newQuestions.push(question)
            }
            return newQuestions
        })
    }

    //set the final score of the game
    function setFinalScore(){
        
        let correctAnswers = 0

        for (const question of questions){
            for (const answer of question.answers){
                if(answer.isSelected && answer.isCorrect){
                    correctAnswers++
                }
            }
        }
        return <p className='quiz__score-message'>You scored {correctAnswers}/5 correct answers</p>
    }

    //starts a new game
    function newGame(){
        setQuestions([])
        setEndGame(false)
        setCount(prevCount => prevCount += 1)
    }

    //render the questions and the answers
    const renderedQuestions =  questions?.map(question => {

        const renderedAnswers = question.answers?.map(answer => {
            return (
                <button key={nanoid()} onClick={endGame ? null : () => handleClick(answer.answer, answer.questionNumber)} className={
                    classNames(
                        'quiz__answer',
                        {
                            'quiz__selected-answer': answer.isSelected,
                            'quiz__correct-answer': endGame && answer.isCorrect,
                            'quiz__wrong-answer': endGame && (answer.isSelected && !answer.isCorrect),
                            'quiz__excluded-answer': endGame && (!answer.isSelected && !answer.isCorrect)
                        }
                    )
                }>
                    {answer.answer}
                </button>
            )
        })
        
        return (
            <div key={nanoid()} className='quiz__single-question-wrapper'>
                <h2 key={nanoid()} className='quiz__question'>{question.questionNumber}. {question.question}</h2>
                <div className='quiz__answer-wrapper'>
                    {renderedAnswers}
                </div>
            </div>
        )
    })
    
    return (
        <section className='quiz__question-wrapper'>
            {questions.length === 0 ? <p>Loading...</p> : renderedQuestions}
            <div className='quiz__button-wrapper'>
                {endGame && setFinalScore()}
                {questions.length > 0 && <button onClick={endGame ? newGame : () => setEndGame(true)} className='quiz__button'>{endGame ? 'New Game' : 'Check answers'}</button>}
            </div>
        </section>
    )
}
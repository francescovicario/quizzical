import React from 'react'
import Preface from './components/Preface'
import Quiz from './components/Quiz'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'
import './style.css'

export default function App(){
    
    const [start, setStart] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    }, [])
    
    function renderNewQuestions(){
        setQuestions(prevQuestions => prevQuestions.map(question => {
        
            const random = Math.floor(Math.random() * 4)
            const answers = [...question.incorrect_answers]
            answers.splice(random, 0, question.correct_answer)
            
            
            const allAnswers = answers.map(answer => ({
                answer: decode(answer),
                isSelected: false,
                isCorrect: answer === question.correct_answer ? true : false,
                id: nanoid()
            }))
            
            return {
                question: decode(question.question), 
                questionID: nanoid(),
                answers: allAnswers
            }
        }))
    }

    function selectAnswer(id){
        setQuestions(prevItem => {
            prevItem?.map(item => {
                return item.answers?.map(answer => {
                    return answer.id === id ? ({...answer, answer.isSelected: !answer.isSelected}) : answer
                })
            })
        })
    }
    
    function startGame(){
        setStart(true)
        renderNewQuestions()
    }
    
    return (
        <main>
                {
                    start ? 
                    <Quiz 
                        questions={questions}
                        selectAnswer={selectAnswer}
                    /> : 
                    <Preface 
                        startGame={startGame}
                    />
                }
        </main>
    )
}
import React from 'react'
import Preface from './components/Preface'
import Quiz from './components/Quiz'
import './style.css'

export default function App(){
    
    const [start, setStart] = React.useState(false)
    
    //change the component from Preface to Quiz
    function startGame(){
        setStart(true)
    }
    
    return (
        <main>
                {
                    start ? 
                    <Quiz 
                    /> : 
                    <Preface 
                        startGame={startGame}
                    />
                }
        </main>
    )
}
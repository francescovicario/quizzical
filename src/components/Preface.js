import React from 'react'

export default function Preface(props){
    return (
        <section>
            <h2 className='game-title'>Quizzical</h2>
            <p className='game-descr'>Come test your knowledge!</p>
            <button className='game-start-btn' onClick={props.startGame}>Start quiz</button>
        </section>
    )
}
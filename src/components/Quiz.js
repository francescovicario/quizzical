import React from 'react'

export default function Quiz(props){
    
    const renderedQuestions = props.questions?.map(question => {
        
        const renderedAnswers = question.answers?.map(answer => {
            
            const style = {
                backgroundColor: answer.isSelected ? '#D6DBF5' : '#F5F7FB',
                border: answer.isSelected ? 'none' : '.79px solid #4D5B9E'
            }
        
            return (
                    <button key={answer.id} onClick={() => props.selectAnswer(answer.id)} className='quiz__answer' style={style}>
                        {answer.answer}
                    </button>
            )
        })
        
        return (
            <div className='quiz__single-question-wrapper'>
                <h2 key={question.questionID} className='quiz__question'>{question.question}</h2>
                <div className='quiz__answer-wrapper'>
                    {renderedAnswers}
                </div>
            </div>
        )
    })
    
    return (
        <section className='quiz__question-wrapper'>
            {renderedQuestions}
            <button className='quiz__button'>Check answers</button>
        </section>
    )
}
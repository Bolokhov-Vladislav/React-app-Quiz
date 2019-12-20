import React from 'react'
import classes from './AnswersList.module.scss'
import AnswersItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { props.answers.map((answer, index) => {
            return(
                <AnswersItem
                 answer={answer} 
                 key={index}
                 onAnswerClick={props.onAnswerClick}
                 stateColor={props.stateColor ? props.stateColor[answer.id] : null}
                />
            )
        })}
    </ul>
)

export default AnswersList
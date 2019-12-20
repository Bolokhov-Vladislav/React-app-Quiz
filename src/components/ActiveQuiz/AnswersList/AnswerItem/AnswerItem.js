import React from 'react'
import classes from './AnswerItem.module.scss'

const AnswerItem = props => {
    const cls = [classes.AnswerItem]

    if (props.stateColor) {
        cls.push(classes[props.stateColor])
    }

    return(
        <li
         className={cls.join(' ')}
         onClick={() => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text}
        </li>
    )
}

export default AnswerItem
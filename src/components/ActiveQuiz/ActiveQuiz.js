import React from 'react';
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
  <div className={classes.ActiveQuiz}>
      <p className={classes.Questions}>
          <span>
              <strong>{props.answerNumber}.</strong>&nbsp;
              {props.question}
          </span>
          <small>{props.answerNumber} из {props.quizLength}</small>
      </p>

      <AnswersList
       answers={props.answers} 
       onAnswerClick={props.onAnswerClick}
       stateColor={props.stateColor}
      />
  </div>
)

export default ActiveQuiz;

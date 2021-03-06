import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //{[id] : 'success' or 'error'}
        quiz: [],
        loading: true
    }

    _onAnswerClick = (answerId) => {
        //double click fix
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        //double click fix

        const question =  this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
       
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })
            const timeout = window.setTimeout(() => {
                if (this._isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
        }
    }

    _isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    _onRetry = () => {
        const timeout = window.setTimeout(() => {
            this.setState({
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            })
            window.clearTimeout(timeout)
        }, 500)
        
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data

            this.setState({
                quiz,
                loading: false
            })
        } catch (e){
            console.log(e);
        }
    }
    
    
    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.loading ?
                        <Loader/>
                        :  this.state.isFinished ? 
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this._onRetry}
                        />
                        : <ActiveQuiz 
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this._onAnswerClick}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            stateColor={this.state.answerState}
                        />
                    }

                </div>
            </div>
        );
    }
}


export default Quiz;

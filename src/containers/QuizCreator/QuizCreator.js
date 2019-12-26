import React, { Component } from 'react';
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";

class QuizCreator extends Component {

    _submitHandler = e => {
        e.preventDefauld();
    }
    _addQuizHandler = () => {

    }
    _creatQuizHandler = () => {

    }
    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this._submitHandler}>
                        <input type='text'/>
                        <hr/>
                        <input type='text'/>
                        <input type='text'/>
                        <input type='text'/>
                        <input type='text'/>
                        <select></select>
                        <Button type='primary' onClick={this._addQuizHandler}>Добавить вопрос</Button>
                        <Button type='success' onClick={this._creatQuizHandler}>Создать текст</Button>
                    </form>
                </div>
            </div>
        );
    }
}



export default QuizCreator;

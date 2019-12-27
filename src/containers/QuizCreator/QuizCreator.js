import React, { Component } from 'react';
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import { createControl } from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";

function createOptionControl(number) {
    return createControl ({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        questions: createControl({
            label:'Введите вопрос',
            errorMessage: 'Значение не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}
class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    }

    _submitHandler = e => {
        e.preventDefauld();
    }
    _addQuizHandler = () => {

    }
    _creatQuizHandler = () => {

    }
    _changeHandler = (value, controlName) => {

    }
    _renderImputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <React.Fragment key={controlName + index}>
                    <Input 
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shoudValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={e => this._changeHandler(e.target.value, controlName)}
                    />
                    { index === 0 ? <hr/> : null }
                </React.Fragment>
            )
        })
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this._submitHandler}>
                       { this._renderImputs() }
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

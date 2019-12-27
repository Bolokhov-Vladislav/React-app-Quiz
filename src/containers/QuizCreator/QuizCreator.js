import React, { Component } from 'react';
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { createControl, validate, validateForm } from "../../form/formFramework";


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
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    _submitHandler = e => {
        e.preventDefauld()
    }
    _addQuizHandler = e => {
        e.preventDefauld()
    }
    _creatQuizHandler = () => {

    }
    _changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = { ...formControls[controlName] } 

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls: formControls,
            isFormValid: validateForm(formControls)
        })
    }
    _renderImputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            console.log(control.errorMessage);
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
    _selectChange = e => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    }
    render() {
        
        const select = <Select 
            label='Выберите правильный ответ'
            value={this.state.rightAnswerId}
            onChange={this._selectChange}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this._submitHandler}>
                       { this._renderImputs() }
                        { select }
                        <Button type='primary' onClick={this._addQuizHandler} disabled={!this.state.isFormValid}>Добавить вопрос</Button>
                        <Button type='success' onClick={this._creatQuizHandler} disabled={this.state.quiz.length === 0}>Создать текст</Button>
                    </form>
                </div>
            </div>
        );
    }
}



export default QuizCreator;

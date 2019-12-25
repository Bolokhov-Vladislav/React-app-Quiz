import React, { Component } from 'react';
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
export default class Auth extends Component {

    state = {
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    _login = () => {

    }
    _register = () => {

    }
    _submit = event => {
        event.preventDefault()
    }
    _validateControl(value, validation){
        if (!validation) {
            return true
        }
        
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }
    _onChanged = (e, controlName) => {

        const formControls = {...this.state.formControls}
        const control = { ...formControls[controlName] } //email or password

        control.value = e.target.value 
        control.touched = true
        control.valid = this._validateControl(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls
        })
    }

    _rendetInputs() {
        const inputs = Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={ e => this._onChanged(e, controlName)}
                />
            )
        })
        return inputs
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this._submit} className={classes.AuthForm}>
                        {this._rendetInputs()}

                        <Button type='success' onClick={this._login}>Войти</Button>
                        <Button type='primary' onClick={this._register}>Регистрация</Button>
                    </form>
                </div>
            </div>
        );
    }
}

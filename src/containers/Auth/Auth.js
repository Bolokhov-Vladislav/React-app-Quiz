import React, { Component } from 'react';
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from 'axios'
export default class Auth extends Component {

    state = {
        isFormValid: false,
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
                errorMessage: 'Минимальное количество символов 6',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    _login = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfo2Us-QwuEkW-nq4vBlwpWWAOW3rorY4', authData)
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    _register = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfo2Us-QwuEkW-nq4vBlwpWWAOW3rorY4', authData)
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
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
            isValid = value.trim() !== ''
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

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls: formControls,
            isformValid: isFormValid
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

                        <Button 
                            type='success' 
                            onClick={this._login} 
                            disabled={!this.state.isformValid}
                        >Войти</Button>
                        <Button 
                            type='primary' 
                            onClick={this._register}
                            disabled={!this.state.isformValid}
                        >Регистрация</Button>
                    </form>
                </div>
            </div>
        );
    }
}

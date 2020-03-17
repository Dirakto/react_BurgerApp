import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObj, checkValidity } from '../../shared/utility';

import classes from './Auth.css';

class Auth extends Component{

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }
    
    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/')
            this.props.onSetAuthRedirectPath();
    }

    inputChangedHandler = (e, controlName) => {
        const updatedControls = updateObj(this.state.controls, {
            [controlName]: updateObj(this.state.controls[controlName], {
                    value: e.target.value,
                    valid: checkValidity(e.target.value, this.state.controls[controlName].validation),
                    touched: true
            })  
        });

        this.setState({controls: updatedControls});
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => ({isSignup: !(prevState.isSignup)}));
    }

    render() {
        const formElements = [];
        for(let el in this.state.controls){
            formElements.push({id: el, config: this.state.controls[el]});
        }

        let form = formElements.map(el => (
            <Input
                key={el.id}
                elementType={el.config.elementType} 
                elementConfig={el.config.elementConfig} 
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(e) => this.inputChangedHandler(e, el.id)} />
        ));

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO SIGNIN</Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
})

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
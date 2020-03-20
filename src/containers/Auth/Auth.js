import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObj, checkValidity } from '../../shared/utility';

import classes from './Auth.css';

const auth = props => {

    const [controls, setControls] = useState({
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
    });
    const [isSignup, setIsSignup] = useState(true);

    const {building, authRedirectPath, onSetAuthRedirectPath} = props;
    
    useEffect(() => {
        if(!building && authRedirectPath !== '/')
            onSetAuthRedirectPath();
    }, [building, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (e, controlName) => {
        const updatedControls = updateObj(controls, {
            [controlName]: updateObj(controls[controlName], {
                    value: e.target.value,
                    valid: checkValidity(e.target.value, controls[controlName].validation),
                    touched: true
            })  
        });

        setControls(updatedControls);
    }

    const submitHandler = e => {
        e.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    const formElements = [];
    for(let el in controls){
        formElements.push({id: el, config: controls[el]});
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
            changed={(e) => inputChangedHandler(e, el.id)} />
    ));
    if(props.loading){
        form = <Spinner />
    }
    let errorMessage = null;
    if(props.error){
        errorMessage = <p>{props.error.message}</p>
    }
    let authRedirect = null;
    if(props.isAuthenticated){
        authRedirect = <Redirect to={props.authRedirectPath} />
    }
    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>SWITCH TO SIGNIN</Button>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(auth);
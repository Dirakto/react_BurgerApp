import React, { useState } from 'react'
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
import { updateObj, checkValidity } from '../../../shared/utility';

import classes from './ContactData.css';

const contactData = props => {
    
    
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: 'RandomFarmer',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: 'outskirts of Khorinis',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '00000',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: 'Myrtana',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: "email",
                placeholder: 'Your E-Mail'
            },
            value: 'random.farmer@khorinis.net',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Dragon'},
                    {value: 'slowest', displayValue: 'Scavanger'}
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        },
    });
    const [isFormValid, setIsFormValid] = useState(true); //false
    

    const orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for(let el in orderForm){
            formData[el] = orderForm[el].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (e, inputID) => {
        const updatedFormEl = updateObj(orderForm[inputID], {
            value: e.target.value,
            valid: checkValidity(e.target.value, orderForm[inputID].validation),
            touched:  true
        });
        const newOrderForm = updateObj(orderForm, {
            [inputID]: updatedFormEl
        });

        let formIsValid = true; 
        for(const id in newOrderForm){
            formIsValid = newOrderForm[id].valid && formIsValid;
        }

        setOrderForm(newOrderForm);
        setIsFormValid(formIsValid);
    }

    const formElements = [];
    for(let el in orderForm){
        formElements.push({id: el, config: orderForm[el]});
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElements.map(el => (
                <Input
                    key={el.id}
                    elementType={el.config.elementType} 
                    elementConfig={el.config.elementConfig} 
                    value={el.config.value}
                    invalid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    changed={(e) => inputChangedHandler(e, el.id)} />
            ))}
            <Button btnType="Success" disabled={!isFormValid} clicked={orderHandler}>ORDER</Button>
        </form>
    );
    if(props.loading)
        form = <Spinner />
        
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>    
            {form}
        </div>
    );
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
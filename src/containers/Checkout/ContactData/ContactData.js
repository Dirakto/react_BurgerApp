import React, { Component } from 'react'
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component{
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
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
                value: '',
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
                value: '',
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
                value: '',
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
                value: '',
                validation: {
                    required: true
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
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let el in this.state.orderForm){
            formData[el] = this.state.orderForm[el].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err)
            })
    }

    inputChangedHandler = (e, inputID) => {
        const orderForm = {...this.state.orderForm}
        const updatedFormEl = {...orderForm[inputID]}

        updatedFormEl.value = e.target.value;
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation)
        updatedFormEl.touched = true;
        orderForm[inputID] = updatedFormEl;

        let formIsValid = true; 
        for(let id in orderForm){
            formIsValid = orderForm[id].valid && formIsValid;
        }

        this.setState({orderForm: orderForm, formIsValid: formIsValid});
    }

    checkValidity(val, rules){
        let isValid = true;
        if(rules.required){
            isValid = val.trim() !== '' && isValid ;
        }

        if(rules.minLength){
            isValid = val.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = val.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        const formElements = [];
        for(let el in this.state.orderForm){
            formElements.push({id: el, config: this.state.orderForm[el]});
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(e) => this.inputChangedHandler(e, el.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading)
            form = <Spinner />
            
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>    
                {form}
            </div>
        )
    }
    
}

export default ContactData;
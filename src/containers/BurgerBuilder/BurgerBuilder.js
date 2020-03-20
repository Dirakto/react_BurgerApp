import React, { useState, useEffect, useCallback } from 'react';
import { /*connect,*/ useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';

export const burgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();
    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    });
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.burgerBuilder.ingredients);

    const onIngredientAdded = (name) => dispatch(actionCreators.addIngredient(name));
    const onIngredientRemoved = (name) => dispatch(actionCreators.removeIngredient(name));
    const onInitIngredients = useCallback(() => dispatch(actionCreators.initIngredients()), []);
    const onInitPurchase = () => dispatch(actionCreators.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actionCreators.setAuthRedirectPath(path));

    useEffect(() => {onInitIngredients()}, [onInitIngredients]);
    

    const updatePurchaseState = ingredients =>{
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => sum + el, 0);
            // this.setState({purchasable: sum > 0});
            return sum > 0;
    }

    const purchaseHandler = () => {
        if(isAuthenticated)
            setPurchasing(true);
        else{
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }
    
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push({
            pathname: '/checkout'
        });
    }

    const disabledInfo = {
        ...ings
    };
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = error ? <p>Cannot load ingredients...</p> : <Spinner />;
    if(ings){
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls 
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    price={price}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated} />
            </Aux>
        );
        orderSummary = <OrderSummary 
        ingredients={ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler} 
        price={price} />;
    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     }
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (name) => dispatch(actionCreators.addIngredient(name)),
//         onIngredientRemoved: (name) => dispatch(actionCreators.removeIngredient(name)),
//         onInitIngredients: () => dispatch(actionCreators.initIngredients()),
//         onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
//     }
// };

export default //connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(burgerBuilder, axios);
    //);
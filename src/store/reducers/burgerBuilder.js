import * as actions from '../actions/actions';
import { updateObj } from '../../shared/utility';

const STANDARD_PRICE = 4;

const initialState = {
    ingredients: null,
    totalPrice: STANDARD_PRICE,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actions.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actions.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actions.FETCH_INGREDIENTS_FAILED:
            return updateObj(state, {error: true});
        default:
            return state;
    }
};

export default reducer;


const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName]+1};
    const updatedIngredients = updateObj(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObj(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName]-1};
    const updatedIngs = updateObj(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObj(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updateObj(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: STANDARD_PRICE,
        error: false,
        building: false
    });
}
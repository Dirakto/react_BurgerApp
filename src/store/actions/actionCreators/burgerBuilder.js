import * as actions from '../actions';
import axios from '../../../axios-orders';


export const addIngredient = payload => ({
    type: actions.ADD_INGREDIENT,
    ingredientName: payload
});

export const removeIngredient = payload => ({
    type: actions.REMOVE_INGREDIENT,
    ingredientName: payload
});

export const setIngredients = ingredients => ({
    type: actions.SET_INGREDIENTS,
    ingredients: ingredients
});


export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then( ({data}) => {
                dispatch(setIngredients(data));
            })
            .catch(() => {
                dispatch(fetchIngredientsFailed());
            })
    }
}

export const fetchIngredientsFailed = () => ({
    type: actions.FETCH_INGREDIENTS_FAILED
});
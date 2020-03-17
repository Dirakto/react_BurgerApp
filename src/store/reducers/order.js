import * as actions from '../actions/actions';
import { updateObj } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.PURCHASE_INIT:
            return updateObj(state, {purchased: false});
        case actions.PURCHASE_BURGER_START:
            return updateObj(state, {loading: true});
        case actions.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actions.PURCHASE_BURGER_FAIL:
            return updateObj(state, {loading: false});
        case actions.FETCH_ORDERS_START:
            return updateObj(state, {loading: true});
        case actions.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action);
        case actions.FETCH_ORDERS_FAIL:
            return updateObj(state, {loading: false});
        default:
            return state;
    }
};

export default reducer;

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObj(action.orderData, {id: action.orderId});
    return updateObj(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
};

const fetchOrderSuccess = (state, action) => {
    return updateObj(state, {
        orders: action.orders,
        loading: false
    });
}
import * as actions from '../actions';
import axios from '../../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => ({
    type: actions.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: data
});

export const purchaseBurgerFail = error => ({
    type: actions.PURCHASE_BURGER_FAIL,
    error: error
});

const purchaseBurgerStart = () => ({
    type: actions.PURCHASE_BURGER_START
});

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData)
            .then( ({data}) => {
                dispatch(purchaseBurgerSuccess(data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err));
            })
    }
}

export const purchaseInit = () => ({
    type: actions.PURCHASE_INIT
});

export const fetchOrdersSuccess = orders => ({
    type: actions.FETCH_ORDERS_SUCCESS,
    orders: orders
});

export const fetchOrdersFail = err => ({
    type: actions.FETCH_ORDERS_FAIL
});

export const fetchOrdersStart = () => ({
    type: actions.FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json'+ queryParams)
            .then(({data}) => {
                const fetchedOrders = [];
                for(let key in data){
                    fetchedOrders.push({
                        ...data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(() => {
                dispatch(fetchOrdersFail());
            });
    }
};
import {takeEvery, all, takeLatest} from 'redux-saga/effects';

import * as actions from '../actions/actions';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth(){
    yield all([
        takeEvery(actions.AUTH_CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actions.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actions.AUTH_USER, authUserSaga),
        takeEvery(actions.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actions.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder(){
    yield takeLatest(actions.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actions.FETCH_ORDERS, fetchOrdersSaga);
}
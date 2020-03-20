import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actionCreators from '../actions/index';
import {API_KEY} from '../../config';

export function* logoutSaga(action){
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');
    yield put(actionCreators.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expTime * 1000);
    yield put(actionCreators.logout());
}

export function* authUserSaga(action){
    yield put(actionCreators.authStart());
    const postData =  {
        email: action.email,
        password: action.password,
        returnSecureToken: true
        }
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        if(!action.isSignup)
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        try{
            const response = yield axios.post(url, postData);
            
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
            localStorage.setItem('userId', response.data.localId);
            yield put(actionCreators.authSuccess(response.data.idToken, response.data.localId));
            yield put(actionCreators.checkAuthTimeout(response.data.expiresIn));
        }catch(err){
                yield put(actionCreators.authFail(err.response.data.error));
        }
}

export function* authCheckStateSaga(action){
    const token = localStorage.getItem('token');
    if(!token)
        yield put(actionCreators.logout());
    else{
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date())
            yield put(actionCreators.logout());
        else{
            const userId = localStorage.getItem('userId');
            yield put(actionCreators.authSuccess(token, userId));
            yield put(actionCreators.checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/1000 ));
        }
    }
}
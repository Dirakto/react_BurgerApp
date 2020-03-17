import * as actions from '../actions/actions';
import { updateObj } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObj(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObj(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObj(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObj(state, {token: null, userId: null});
}

const setAuthRedirectPath = (state, action) => {
    return updateObj(state, {authRedirectPath: action.path});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.AUTH_START:
            return authStart(state, action);
        case actions.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actions.AUTH_FAIL:
            return authFail(state, action);
        case actions.AUTH_LOGOUT:
            return authLogout(state, action);
        case actions.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;
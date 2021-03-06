import * as actions from '../actions';

export const authStart = () => ({
    type: actions.AUTH_START
});

export const authSuccess = (token, userId) => ({
    type: actions.AUTH_SUCCESS,
    idToken: token,
    userId: userId
});

export const authFail = err => {
    return {
        type: actions.AUTH_FAIL,
        error: err
    };
};

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        // type: actions.AUTH_LOGOUT
        type: actions.AUTH_INITIATE_LOGOUT
    }
};

export const logoutSucceed = () => {
    return {
        type: actions.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expTime => {
    return  {
        type: actions.AUTH_CHECK_AUTH_TIMEOUT,
        expTime: expTime
    }
        //dispatch => {
        // setTimeout(() => {
        //     dispatch(logout());
        // }, expTime * 1000);
    // }
}

export const auth = (email, password, isSignup) => {
    return {
        type: actions.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
    // return dispatch => {
    //     dispatch(authStart());
    //     const postData =  {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     }
    //     let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    //     if(!isSignup)
    //         url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    //     axios.post(url, postData)
    //         .then( ({data}) => {
    //             localStorage.setItem('token', data.idToken);
    //             localStorage.setItem('expirationDate', new Date(new Date().getTime() + data.expiresIn * 1000));
    //             localStorage.setItem('userId', data.localId);
    //             dispatch(authSuccess(data.idToken, data.localId));
    //             dispatch(checkAuthTimeout(data.expiresIn));
    //         })
    //         .catch (err => {
    //             dispatch(authFail(err.response.data.error));
    //         })
    // }
}

export const setAuthRedirectPath = path => ({
    type: actions.SET_AUTH_REDIRECT_PATH,
    path: path
});

export const authCheckState = () => {
    return {
        type: actions.AUTH_CHECK_STATE
    }
    // return dispatch => {
        // const token = localStorage.getItem('token');
        // if(!token)
        //     dispatch(logout());
        // else{
        //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
        //     if(expirationDate <= new Date())
        //         dispatch(logout());
        //     else{
        //         const userId = localStorage.getItem('userId');
        //         dispatch(authSuccess(token, userId));
        //         dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/1000 ));
        //     }
        // }
    // };
};
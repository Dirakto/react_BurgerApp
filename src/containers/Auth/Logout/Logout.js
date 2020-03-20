import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

const logout = props => {

    const {onLogout} = props;

    useEffect(() => {
        onLogout();
    }, [onLogout]);
    

    return <Redirect to='/' />;
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(actionCreators.logout())
})

export default connect(null, mapDispatchToProps)(logout);
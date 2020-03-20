import React, { useEffect } from 'react'
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from './Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
    
    const {onFetchOrders} = props;

    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders]);
    
    let orders = <Spinner />;
    if(!props.loading){
        orders = (
            <div>
                {props.orders.map(order => 
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    /> )}
                </div>
        );
    }
        return orders;
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
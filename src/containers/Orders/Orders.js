import React, { Component } from 'react'
import axios from '../../axios-orders';

import Order from './Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    
    state = {
        orders: [],
        loading: true
    }
    

    componentDidMount() {
        axios.get('/orders.json')
            .then(({data}) => {
                const fetchedOrders = [];
                for(let key in data){
                    fetchedOrders.push({
                        ...data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(() => {
                this.setState({loading: false});
            })
    }
    

    render() {
        return (
            <div>
                {this.state.orders.map(order => 
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                         /> )}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);
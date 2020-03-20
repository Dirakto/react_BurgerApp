import React, { useState, useEffect } from 'react'

import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        
        const [error, setError] = useState(null);


        const reqInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error);
        });
        const reseInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }
        }, []);
        

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        
        render(){
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        };
    };
};

export default withErrorHandler;
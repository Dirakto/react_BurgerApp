import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const app = props => {

  const {onTryAutoSignup} = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);
  

  let routes = (
    <Switch>
      <Route path='/auth'     render={(props) => <Auth {...props} />} />
      <Route path='/'         component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );
  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path='/checkout' render={(props) => <Checkout {...props} />} />
        <Route path='/orders'   render={(props) => <Orders {...props} />} />
        <Route path='/logout'    component={Logout} />
        <Route path='/auth'     render={(props) => <Auth {...props} />} />
        <Route path='/'         component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>} >
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const madDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState())
});

export default withRouter(connect(mapStateToProps, madDispatchToProps)(app));

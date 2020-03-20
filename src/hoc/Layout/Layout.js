import React, { useState } from "react";
import { connect } from 'react-redux';

import Aux from "../Auxiliary/Auxiliary";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

const Layout = props => {

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  }

  return(
    <Aux>
      <Toolbar 
          isAuth={props.isAuthenticated}
          show={showSideDrawer}
          drawerToggle={sideDrawerToggleHandler} />
      <SideDrawer
          isAuth={props.isAuthenticated}
          open={showSideDrawer}
          closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});
export default connect(mapStateToProps)(Layout);
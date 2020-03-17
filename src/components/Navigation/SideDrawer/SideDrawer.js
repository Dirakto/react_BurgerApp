import React from 'react'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import classes from './SideDrawer.css';

const sideDrawer = props => {
    const attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open)
        attachedClasses[1] = classes.Open;

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>    
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>            
            </div>
        </Aux>
    )
};

export default sideDrawer;
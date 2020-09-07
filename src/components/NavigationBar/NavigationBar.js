import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import styles from './NavigationBar.css';

class NavigationBar extends Component {
    logoClickHandler = () => { this.props.history.push('/'); }

    render() {
        return (
            <div className={styles.NavigationBar}>
                <span className={styles.Logo} onClick={this.logoClickHandler}>Pro-Organizer</span>
                <div className={styles.NavItems}>
                    <NavLink className={styles.NavItem} to='/' exact activeClassName={styles.Active}>
                        <div>Home</div>
                    </NavLink>
                    <NavLink className={styles.NavItem} to='/createboard' activeClassName={styles.Active}>
                        <div>Create a board</div>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default withRouter(NavigationBar);

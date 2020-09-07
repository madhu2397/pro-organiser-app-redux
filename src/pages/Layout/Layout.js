import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.css';

import NavigationBar from './../../components/NavigationBar/NavigationBar';

import * as actions from './../../store/actions/index';
class Layout extends Component {
    componentDidMount() {
        this.props.initBoards();
    }
    

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <div className={styles.Content}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        initBoards: () => dispatch(actions.initBoards())
    }
}

export default connect(null, mapDispatchToProps)(Layout);

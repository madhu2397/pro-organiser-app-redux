import React, { Component } from 'react';
import styles from './Modal.css';

import Backdrop from './../Backdrop/Backdrop';

class Modal extends Component {
    render() {
        return (
            <div>
                <Backdrop />
                <span className={styles.Close} onClick={this.props.close}>X</span>
                <div className={styles.Modal}>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default Modal;
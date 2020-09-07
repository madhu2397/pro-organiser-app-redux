import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import boardStyles from './../Board/Board.css';
import styles from './Boards.css';

export class Boards extends Component {
    render() {
        let boards = <div className={styles.Loading}>Loading...</div>;

        if(this.props.serverError === false) {
            if(this.props.loading === true) {
                boards = <div className={styles.Loading}>Loading...</div>
            } else {
                this.props.boardData.allBoards === undefined ?
                boards = <div className={styles.Loading}>You have not created any boards. Create a new board by clicking on the 'Create Board' section at the top.</div> :
                (
                    Object.keys(this.props.boardData).length > 0 ?
                    boards = this.props.boardData.allBoards.map(boards => {
                        return (
                            <Link 
                                to={{
                                    pathname: `/board/${boards.id}`
                                }} 
                                key={boards.id}>
                                <div className={styles.BoardCard}>
                                    {boards.name}
                                </div>
                            </Link>
                        )
                    }) :
                    boards = <div className={styles.Loading}>Loading...</div>
                )
            }
        } else {
            boards = <p>There seems to be a server error. Please try again later.</p>;
        }

        return (
            <div>
                <p className={boardStyles.BoardTitle}>Boards</p>
                <div className={styles.Boards}>
                    {boards}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        boardData: state.boards.boardData,
        serverError: state.boards.serverError,
        loading: state.boards.loading
    }
}

export default connect(mapStateToProps)(Boards);

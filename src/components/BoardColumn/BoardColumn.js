import React, { Component } from 'react';

import styles from './BoardColumn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ColumnCards from './ColumnCards/ColumnCards';

class BoardColumn extends Component {
    dropHandler = (card, column) => {
        this.props.droppedCard(card, column);
    }

    render() {
        return (
            <div className={styles.BoardColumn}>
                <div className={styles.BoardColumnHeader}>
                    <p className={styles.BoardColumnTitle}>{this.props.title || 'Column'}</p>
                    <FontAwesomeIcon icon='trash-alt' className={styles.DeleteIcon} onClick={() => this.props.deleteColumn(this.props.id)} />
                </div>
                <ColumnCards cardClicked={this.props.cardClicked} card_column={this.props.id} cardsData={this.props.columnData} droppedCard={(card, column) => this.dropHandler(card, column)} />
                <div className={styles.AddCard} onClick={() => this.props.addCard(this.props.id)}>Add a card</div>
            </div>
        )
    }
}

export default BoardColumn;

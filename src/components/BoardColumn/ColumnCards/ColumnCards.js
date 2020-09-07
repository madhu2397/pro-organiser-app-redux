import React, { Component } from 'react';

import styles from './ColumnCards.css';

import ColumnCard from './ColumnCard/ColumnCard';

class ColumnCards extends Component {
    dragOverHandler = (event) => {
        event.preventDefault();
    }

    dropHandler = (event) => {
        event.preventDefault();
        let newCard = JSON.parse(event.dataTransfer.getData("text/plain"));
        this.props.droppedCard(newCard, this.props.card_column);
    }

    render() {
        let cards = <p>No tasks added</p>;
        if(this.props.cardsData.length > 0) {
            cards = this.props.cardsData.map(card => {
                return <ColumnCard cardClicked={this.props.cardClicked} data={card} key={card.id}/>
            });
        }
        return (
            <div className={styles.ColumnCards} onDrop={this.dropHandler} onDragOver={this.dragOverHandler}>
                { cards }
            </div>
        )
    }
}

export default ColumnCards;

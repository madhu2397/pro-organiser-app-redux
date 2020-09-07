import React, { Component } from 'react';
import styles from './ColumnCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Members from './../../../Members/Members';

class ColumnCard extends Component {
    dragHandler = (event) => {
        event.dataTransfer.setData("text/plain", JSON.stringify(this.props.data));
    }

    render() {
        let members = null;
        members = this.props.data.members && this.props.data.members.map(member => {
            return <Members member={member} key={member} />
        })

        return (
            <div className={styles.ColumnCard} onClick={() => this.props.cardClicked({card_id: this.props.data.id, board_id: this.props.data.board_id})} draggable={true} onDragStart={this.dragHandler}>
                <p className={styles.ColumnCardTitle}>{this.props.data.title}</p>
                <div className={styles.ColumnCardFooter}>
                    {
                        this.props.data.description ?
                        <div className={styles.Icons}>
                            <FontAwesomeIcon icon='list' />
                        </div> :
                        <div></div>
                    }
                    <div className={styles.MembersContainer}>
                        {members}
                    </div>
                </div>
            </div>
        )
    }
}

export default ColumnCard;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './AddCard.css';
import boardStyles from './../../pages/Board/Board.css';
import createBoardStyles from './../../pages/CreateBoard/CreateBoard.css';

import FormElements from './../FormElements/FormElements';
import Axios from 'axios';

class AddCard extends Component {    
    state = {
        formElements: [
            {
                type: 'text',
                placeholder: 'e.g. Add a new icon',
                label: 'Enter a title for your task',
                id: 'title',
                value: null
            },
            {
                type: 'select',
                placeholder: 'Choose members for this task',
                label: 'Choose members for this task (select multiple, if needed)',
                id: 'members',
                value: null
            },
            {
                type: 'textarea',
                placeholder: 'Add your description here',
                label: 'Add the description for your task',
                id: 'description',
                value: null
            },
            {
                type: 'date',
                placeholder: 'Select the due-date',
                label: 'Select the due-date for this task',
                id: 'due_date',
                value: null
            }
        ],
        incompleteForm: false,
        updateStateWithProps: false
    }

    static getDerivedStateFromProps = (props, state) =>  {
        if(props.editCard && !state.updateStateWithProps) {
            let formElements = [...state.formElements];
            let cardData = props.cardData.card[0];
            for(let element of formElements) {
                if(element.id === 'due_date') {
                    let date = new Date(cardData[element.id]);
                    let finalDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                    element.value = finalDate;
                } else {
                    element.value = cardData[element.id];
                }

            }
            state.formElements = formElements;
            state.updateStateWithProps = true;
        }
        return state;
    }

    addCardHandler = () => {
        let columnBoardData = {...this.props.boardData.boards[this.props.boardID]};
        let updatedBoardData = {...this.props.boardData};

        let values = {};
        let formElements = this.state.formElements
        for(let key in formElements) {
            values[formElements[key].id] = formElements[key].value;
        }
        values['board_id'] = columnBoardData.id;
        values['column'] = this.props.columnID;
        values['id'] = columnBoardData.cards !== undefined ? columnBoardData.cards.slice(-1)[0].id + 1 : 0;
        values['due_date'] = values['due_date'] !== 'NaN-NaN-NaN' && values['due_date'] !== null ? new Date(values['due_date']).getTime() : null;

        if(this.props.editCard) {
            let id = this.props.cardData.card[0].id;
            let cardData = columnBoardData.cards.filter(card => {return card.id === id});
            for(let key in values) {
                cardData[0][key] = values[key];
            }
            updatedBoardData.boards[this.props.boardID] = columnBoardData;
        } else {
            let cards = [];
            if(columnBoardData.cards !== undefined) {
                cards = [...columnBoardData.cards];
            }
            cards.push(values);

            columnBoardData.cards = cards;

            updatedBoardData.boards[this.props.boardID] = columnBoardData;
        }

        Axios.put('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn.json', updatedBoardData)
            .then(response => {this.props.addCard()})
            .catch(error => {console.log(error)});
    }

    formChangeHandler = (id, value) => {
        let updatedFormElements = [...this.state.formElements].map(ele => {
            if(ele.id === id) {
                ele.value = value;
                return ele;
            } else {
                return ele;
            }
        })
        this.setState({
            formElements: updatedFormElements
        })
    }

    render() {
        let formElements = this.state.formElements.map(element => {
            const ref = React.createRef();
            return <FormElements element={element} reference={ref} key={element.id} options={element.id === 'members' && this.props.members} changed={this.formChangeHandler} />
        })

        return (
            <div className={styles.AddCard}>
                <p className={boardStyles.BoardTitle}>{this.props.editCard ? 'Edit Card' : 'Add Card'}</p>
                { formElements }
                <button id='CreateCard' className={createBoardStyles.CreateButton} onClick={this.addCardHandler}>{this.props.editCard ? 'Edit Card' : 'Add Card'}</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        boardData: state.boards.boardData
    };
}

export default connect(mapStateToProps)(AddCard);

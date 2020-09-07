import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Board.css';
import createBoardStyles from './../CreateBoard/CreateBoard.css';

import BoardColumn from './../../components/BoardColumn/BoardColumn';
import Modal from './../../common/Modal/Modal';
import CardInfo from './../../components/CardInfo/CardInfo';
import AddCard from './../../components/AddCard/AddCard';
import { toSnakeCase } from './../../utility';
import Axios from 'axios';
import * as actions from './../../store/actions/index';

class Board extends Component {
    constructor(props) {
        super(props);
        this.addColumnRef = React.createRef()
    }

    state = {
        showModal: false,
        selectedCardData: {},
        showAddCardModal: false,
        addCardToColumnID: null,
        boardData: {},
        showAddColumnModal: false,
        showEditModal: false,
        archivedCards: [],
        noColumnName: false,
        columnName: ''
    }

    componentDidMount() {
        let url = 'https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn/boards/'+this.props.match.params.boardId+'.json';
        Axios.get(url)
            .then(response => {
                this.setState({
                    boardData: response.data
                })
            })
            .catch(error => {console.log(error)});

        Axios.get('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn/archivedBoards.json')
            .then(response => {
                let archivedCards = [];
                if(response.data !== null) {
                    archivedCards = response.data;
                }
                this.setState({
                    archivedCards: archivedCards
                })
            })
            .catch(error => {console.log(error);})
    }

    cardClickHandler = (card_details) => {
        let columnBoardData = this.props.boardData.boards[this.props.match.params.boardId];
        let cardData = columnBoardData.cards.filter(card => {
            return card.id === card_details.card_id;
        });
        let selectedCardData = {};
        let columnData = columnBoardData.columns.filter(column => {
            return column.id === cardData[0].column;
        })
        selectedCardData.card = cardData;
        selectedCardData.column = columnData;
        this.setState({
            selectedCardData: selectedCardData,
            showModal: true
        })
    }
    
    closeModalHandler = () => {
        this.setState({
            showModal: false,
            selectedCardData: {}
        })
    }

    closeAddCardModalHandler = () => {
        this.setState({
            showAddCardModal: false,
            addCardToColumnID: null
        })
    }

    closeAddColumnModalHandler = () => {
        this.setState({
            showAddColumnModal: false
        })
    }

    addCardHandler = (column_id) => {
        this.setState({
            showAddCardModal: true,
            addCardToColumnID: column_id
        })
    }

    addEditedCardToDBHandler = () => {
        this.setState({
            showEditModal: false
        })
    }

    addCardToDBHandler = () => {
        this.setState({
            showAddCardModal: false,
            addCardToColumnID: null
        })
    }

    addColumnHandler = (event) => {
        this.setState({
            showAddColumnModal: true
        })
    }

    columnNameChangeHandler = (event) => {
        this.setState({
            columnName: event.target.value,
            noColumnName: event.target.value.length > 0 ? false : true
        })
    }

    addColumnToDBHandler = () => {
        if(this.addColumnRef.current.value.length <= 0) {
            this.setState({
                noColumnName: true
            })
        } else {
            let columnBoardData = this.props.boardData.boards[this.props.match.params.boardId];
            let updatedBoardData = {...this.props.boardData};
            let column_name = this.addColumnRef.current.value;
            let column_id = toSnakeCase(column_name);
            let newColumn = {
                id: column_id,
                name: column_name
            }
            let columns = columnBoardData.columns || [];
            columns.push(newColumn);
            columnBoardData.columns = columns;
            updatedBoardData.boards[this.props.match.params.boardId] = columnBoardData;
            
            this.setState({
                addColumnLoading: true,
                columnName: ''
            })
    
            Axios.put('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn.json', updatedBoardData)
                .then(response => {
                    this.props.updateBoardData(updatedBoardData)
                    this.setState({
                        showAddColumnModal: false,
                        addColumnLoading: false
                    })
                })
        }
    }

    editCardHandler = (column_id) => {
        this.setState({
            showEditModal: true,
            showModal: false,
            addCardToColumnID: column_id
        })
    }

    archiveCardHandler = () => {
        this.setState({
            showModal: false
        })
    }

    deleteColumnHandler = (column_id) => {
        let updatedBoardData = {...this.props.boardData};
        let columnBoardData = {...this.props.boardData.boards[this.props.match.params.boardId]};
        let updatedCards = null;
        if(columnBoardData.cards !== undefined) {
            let cards = columnBoardData.cards;
            updatedCards = cards.filter(card => {
                return card.column !== column_id;
            })
            columnBoardData.cards = updatedCards;
        }
        let columns = columnBoardData.columns;
        let updatedColumns = columns.filter(column => {
            return column.id !== column_id;
        })
        columnBoardData.columns = updatedColumns;
        updatedBoardData.boards[this.props.match.params.boardId] = columnBoardData;
        Axios.put('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn.json', updatedBoardData)
            .then(response => {this.props.updateBoardData(updatedBoardData);})
            .catch(error => {console.log(error);})
    }

    deleteBoardHandler = () => {
        let updatedBoardData = {...this.props.boardData};
        let allBoards = updatedBoardData.allBoards;
        let boards = updatedBoardData.boards;
        let updatedAllBoards = allBoards.filter(board => {
            return board.id !== this.props.match.params.boardId;
        })
        let updatedBoards = {};
        for(let board of Object.keys(boards)) {
            if(board !== this.props.match.params.boardId) {
                updatedBoards[board] = boards[board];
            }
        }
        updatedBoardData.allBoards = updatedAllBoards;
        updatedBoardData.boards = updatedBoards;

        Axios.put('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn.json', updatedBoardData)
            .then(response => {
                this.props.history.push('/');
                this.props.updateBoardData(updatedBoardData);
            })
            .catch(error => {console.log(error);})
    }

    closeEditModalHandler = () => {
        this.setState({
            showEditModal: false,
        })
    }

    droppedCardHandler = (received_card, receiving_column) => {
        let updatedBoardData = {...this.props.boardData};
        let columnBoardData = {...this.props.boardData.boards[this.props.match.params.boardId]};
        let cards = columnBoardData.cards;
        let updatedCards = cards.filter(card => {
            if(card.id === received_card.id) {
                card.column = receiving_column;
                return card;
            } else {
                return card;
            }
        });
        columnBoardData.cards = updatedCards;
        updatedBoardData.boards[this.props.match.params.boardId] = columnBoardData;
        Axios.put('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn.json', updatedBoardData)
            .then(response => {this.props.updateBoardData(updatedBoardData);})
            .catch(error => {console.log(error);})
    }

    render() {
        let content = null;
        if(Object.keys(this.props.boardData).length > 0) {
            let dataOfBoard = {...this.props.boardData.boards[this.props.match.params.boardId]};
            dataOfBoard.cards = dataOfBoard.cards || [];
            let columns = null;
            if(dataOfBoard.columns !== undefined) {
                columns = dataOfBoard.columns.map(column => {
                    let columnData = dataOfBoard.cards.filter(card => {
                        return card.column === column.id;
                    })
                    return ( 
                        <BoardColumn 
                            title={column.name} 
                            id={column.id} 
                            columnData={columnData} 
                            key={column.id} 
                            cardClicked={this.cardClickHandler} 
                            addCard={this.addCardHandler} 
                            droppedCard={(card, column) => this.droppedCardHandler(card, column)} 
                            deleteColumn={(column_id) =>  this.deleteColumnHandler(column_id)}
                        />
                    )
                })
            }  
            let cardInfo = Object.keys(this.state.selectedCardData).length > 0 ? <CardInfo data={this.state.selectedCardData} editCard={this.editCardHandler} archiveCard={this.archiveCardHandler} /> : null;

            content = (
                <>
                    {this.state.showModal ? <Modal content={cardInfo} close={this.closeModalHandler} /> : null}
                    {
                        this.state.showAddCardModal ?
                        <Modal 
                            content={
                                <AddCard members={this.props.boardData.boards[this.props.match.params.boardId].members} addCard={this.addCardToDBHandler} boardID={this.props.match.params.boardId} columnID={this.state.addCardToColumnID} />
                            } 
                            close={this.closeAddCardModalHandler} 
                        /> : 
                        null
                    }
                    {
                        this.state.showEditModal ?
                        <Modal 
                            content={
                                <AddCard members={this.props.boardData.boards[this.props.match.params.boardId].members} addCard={this.addEditedCardToDBHandler} editCard={true} cardData={this.state.selectedCardData} boardID={this.props.match.params.boardId} columnID={this.state.addCardToColumnID} />
                            } 
                            close={this.closeEditModalHandler} 
                        /> : 
                        null
                    }
                    {
                        this.state.showAddColumnModal ? 
                        <Modal 
                            content={
                                this.state.addColumnLoading ?
                                <span>Creating your column...</span> :
                                <>
                                    <p className={styles.BoardTitle}>Add column</p>
                                    {this.state.noColumnName ? <span style={{color: 'red'}}>Please add a column name</span> : null}
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <p>Enter a column name:</p>
                                        <input id='column_name' type='text' ref={this.addColumnRef} value={this.state.columnName} onChange={this.columnNameChangeHandler} style={{width: '100%'}} />
                                    </div>
                                    <button id='CreateColumn' className={createBoardStyles.CreateButton} style={{width: 'auto', float: 'right'}} onClick={this.addColumnToDBHandler}>Add Column</button>
                                </>
                            }
                            close={this.closeAddColumnModalHandler}
                        /> :
                        null}
                    <div className={styles.BoardHeader}>
                        <p className={styles.BoardTitle}>{this.props.boardData.boards[this.props.match.params.boardId].name} Board</p>
                        <button className={createBoardStyles.CreateButton} style={{backgroundColor: 'red', width: 'auto'}} onClick={this.deleteBoardHandler}>Delete Board</button>
                    </div>
                    <div className={styles.ColumnsContainer}>
                        {columns}
                        <div className={styles.AddColumn} onClick={this.addColumnHandler}>Add a column</div>
                    </div>
                </>
            )
        } else {
            content = <p>Loading...</p>;
        }
        return (
            <>
                <div className={styles.Board}>
                    {content}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        boardData: state.boards.boardData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBoardData: (data) => dispatch(actions.updateBoardData(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));

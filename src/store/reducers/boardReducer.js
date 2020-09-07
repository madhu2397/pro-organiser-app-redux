import * as actionTypes from './../actions/actionTypes';

const initialState = {
    boardData: {},
    serverError: false,
    loading: true
};

const boardReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INIT_GET_BOARDS: {
            let updatedState = {...state};
            updatedState.loading = true;
            return updatedState;
        }
        case actionTypes.GET_BOARDS: {
            let updatedState = {...state};
            updatedState.boardData = action.payload;
            updatedState.loading = false;
            return updatedState;
        }
        case actionTypes.GET_BOARDS_FAILED: {
            let updatedState = {...state};
            updatedState.serverError = true;
            updatedState.loading = false;
            return updatedState;
        }
        case actionTypes.UPDATE_BOARD_DATA: {
            let updatedState = {...state};
            updatedState.boardData = action.payload;
            return updatedState;
        }
        default: return state;
    }
}

export default boardReducer;
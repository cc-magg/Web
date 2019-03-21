import { fromJS } from 'immutable';
import { CHANGE_DATA } from '../action-types/index.js';

const initialState = fromJS({
    message: ''
});

const data = (state = initialState, action) => {
    //que hago con el estado segun la accion
    switch (action.type) {
        case CHANGE_DATA: {
            return state.set('message', action.payload.data)
        }
        default:return state;
    }
};

export default data;
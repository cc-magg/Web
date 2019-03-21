import data from './data.js';

import { combineReducers } from 'redux-immutable';

const rootReducer = combineReducers({
    data
});

export default rootReducer;

import {
    CALL_PROFESORS,
    CHANGE_DATA
} from '../action-types';

export function callProfesors(data) {
    return {
        type: CALL_PROFESORS,
        payload: {
            data
        }
    }
}

export function changeData(data) {
    return {
        type: CHANGE_DATA,
        payload: {
            data
        }
    }
}
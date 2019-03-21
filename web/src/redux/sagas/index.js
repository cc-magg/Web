import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { Map as map } from 'immutable';

import { CALL_METRICS, CALL_USER_ACCESS, CALL_PROFESORS } from '../action-types';
import { setApiData, saveUserAccess, saveLoginError, saveProfesors } from '../actions/index.js';

//import token from '../../../config';

export function* getMetrics(action) {
    /*try {
        const headers = {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Authorization': `Bearer ${token.apiToken}`, // Need to get from store once login done
              'Content-Type': 'application/json'
            },
        };
        const response = yield call(axios.get, `http://localhost:8080/metrics/${action.payload.uuid}/${action.payload.type}`, headers);
        
        yield put(setApiData(response.data));
    } catch (error) {
        console.log('Request failed at metrics¡¡ error: '+error);
    }*/
}
export function* getUserAccess(action) {
    /*try {
        const response = yield call(axios.get, `http://localhost:8080/login/${action.payload.user}/${action.payload.password}`);

        yield put(saveUserAccess(map(response.data)));
        yield put(saveLoginError(response.data.error));
    } catch (error) {
        console.log('Request failed¡¡ error: '+error);
    }*/
}
export function* getProfesors(action) {
    /*try {
        const response = yield call(axios.post, `http://localhost:5678/graphql`, {query: 'query Profesores{profesores {id,nombre,nacionalidad,genero,cursos {titulo,id}}}'});

        yield put(saveProfesors(map(response.data.data)));
    } catch (error) {
        console.log('Request failed¡¡ error: '+error);
    }*/
}

export function* actionsWatcher() {
    yield all([
        takeEvery(CALL_METRICS, getMetrics),
        takeEvery(CALL_USER_ACCESS, getUserAccess),
        takeEvery(CALL_PROFESORS, getProfesors)
    ])
}

export default function* mySaga() {
    yield all([
        actionsWatcher()
    ])
}
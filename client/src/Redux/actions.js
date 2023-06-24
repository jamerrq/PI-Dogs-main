import axios from 'axios';
import * as actions from './action-types';


export const loadDogs = () => async (dispatch) => {
    const dogs = await axios.get('http://localhost:3001/dogs');
    return dispatch({
        type: actions.LOAD_DOGS,
        payload: dogs.data,
    });
};

export const loadTemperaments = () => async (dispatch) => {
    const temperaments = await axios.get('http://localhost:3001/temperaments');
    return dispatch({
        type: actions.LOAD_TEMPERAMENTS,
        payload: temperaments.data,
    });
};

export const loadDogDetail = (id) => async (dispatch) => {
    const dog = await axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
        type: actions.LOAD_DOG_DETAIL,
        payload: dog.data,
    });
};

export const filterByTemperament = (temperament) => (dispatch) => {
    return dispatch({
        type: actions.FILTER_BY_TEMPERAMENT,
        payload: temperament,
    });
};

export const filterByName = (name) => (dispatch) => {
    return dispatch({
        type: actions.FILTER_BY_NAME,
        payload: name,
    });
};

export const orderBy = (order) => (dispatch) => {
    switch (order) {
        case 'name':
            return dispatch({
                type: actions.ORDER_BY_NAME,
                payload: order,
            });
        case 'weight':
            return dispatch({
                type: actions.ORDER_BY_WEIGHT,
                payload: order,
            });
        case 'height':
            return dispatch({
                type: actions.ORDER_BY_HEIGHT,
                payload: order,
            });
        case 'life_span':
            return dispatch({
                type: actions.ORDER_BY_LIFE_SPAN,
                payload: order,
            });
        case 'id':
            return dispatch({
                type: actions.ORDER_BY_ID,
                payload: order,
            });
        default:
            return dispatch({
                type: actions.ORDER_BY_NAME,
                payload: order,
            });
    };
};

export const createDog = (dog) => async (dispatch) => {
    const response = await axios.post('http://localhost:3001/dogs', dog);
    // console.log('CREATE DOG RESPONSE', response);
    return dispatch({
        type: actions.CREATE_DOG,
        payload: response.data,
    });
};

export const modifyDog = (id, dog) => async (dispatch) => {
    const response = await axios.put(`http://localhost:3001/dog/${id}`, dog);
    return dispatch({
        type: actions.MODIFY_DOG,
        payload: response.data,
    });
};

export const deleteDog = (id) => async (dispatch) => {
    const response = await axios.delete(`http://localhost:3001/dog/${id}`);
    return dispatch({
        type: actions.DELETE_DOG,
        payload: response.data,
    });
};

export const clearDogDetail = () => (dispatch) => {
    return dispatch({
        type: actions.CLEAR_DOG_DETAIL,
    });
};

export const nextPage = () => (dispatch) => {
    return dispatch({
        type: actions.NEXT_PAGE,
    });
};

export const prevPage = () => (dispatch) => {
    return dispatch({
        type: actions.PREV_PAGE,
    });
};

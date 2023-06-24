import * as actions from './action-types';


const initialState = {
    allDogs: [],
    dogDetail: {},
    temperaments: [],
    filteredDogs: [],
    orderBy: '',
    filterByTemperament: '',
    filterByName: '',
};


function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOAD_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                filteredDogs: action.payload,
            };
        case actions.LOAD_TEMPERAMENTS:
            // console.log('LOAD_TEMPERAMENTS action.payload: ', action.payload);
            return {
                ...state,
                temperaments: action.payload,
            };
        case actions.LOAD_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload,
            };
        case actions.FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs;
            const filteredDogs = action.payload === 'All' ? allDogs : allDogs.filter(dog => dog.temperaments.includes(action.payload));
            return {
                ...state,
                filteredDogs,
                filterByTemperament: action.payload,
            };
        case actions.FILTER_BY_NAME:
            const filteredByName = state.allDogs.filter(dog => dog.name.toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                filteredDogs: filteredByName,
                filterByName: action.payload,
            };
        case actions.ORDER_BY_NAME:
            const orderedByName = state.filteredDogs.sort((a, b) => {
                if (a.name > b.name) return action.payload === 'asc' ? 1 : -1;
                if (a.name < b.name) return action.payload === 'asc' ? -1 : 1;
                return 0;
            });
            return {
                ...state,
                filteredDogs: orderedByName,
                orderBy: action.payload,
            };
        case actions.ORDER_BY_WEIGHT:
            const orderedByWeight = state.filteredDogs.sort((a, b) => {
                if (a.weight > b.weight) return action.payload === 'asc' ? 1 : -1;
                if (a.weight < b.weight) return action.payload === 'asc' ? -1 : 1;
                return 0;
            });
            return {
                ...state,
                filteredDogs: orderedByWeight,
                orderBy: action.payload,
            };
        case actions.ORDER_BY_HEIGHT:
            const orderedByHeight = state.filteredDogs.sort((a, b) => {
                if (a.height > b.height) return action.payload === 'asc' ? 1 : -1;
                if (a.height < b.height) return action.payload === 'asc' ? -1 : 1;
                return 0;
            });
            return {
                ...state,
                filteredDogs: orderedByHeight,
                orderBy: action.payload,
            };
        case actions.ORDER_BY_LIFE_SPAN:
            const orderedByLifeSpan = state.filteredDogs.sort((a, b) => {
                if (a.life_span > b.life_span) return action.payload === 'asc' ? 1 : -1;
                if (a.life_span < b.life_span) return action.payload === 'asc' ? -1 : 1;
                return 0;
            });
            return {
                ...state,
                filteredDogs: orderedByLifeSpan,
                orderBy: action.payload,
            };
        case actions.CLEAR_FILTERS:
            return {
                ...state,
                filteredDogs: state.allDogs,
                orderBy: '',
                filterByTemperament: '',
                filterByName: '',
            };
        case actions.CLEAR_DOG_DETAIL:
            return {
                ...state,
                dogDetail: {},
            };
        case actions.ORDER_BY_ID:
            const orderedById = state.filteredDogs.sort((a, b) => {
                if (a.id > b.id) return action.payload === 'asc' ? 1 : -1;
                if (a.id < b.id) return action.payload === 'asc' ? -1 : 1;
                return 0;
            });
            return {
                ...state,
                filteredDogs: orderedById,
                orderBy: action.payload,
            };
        case actions.CREATE_DOG:
            return {
                ...state,
                allDogs: [action.payload, ...state.allDogs],
                filteredDogs: [action.payload, ...state.filteredDogs],
            };
        case actions.MODIFY_DOG:
            const dogToModify = state.allDogs.find(dog => dog.id === action.payload.id);
            const dogIndex = state.allDogs.indexOf(dogToModify);
            const allDogsCopy = [...state.allDogs];
            allDogsCopy.splice(dogIndex, 1, action.payload);
            return {
                ...state,
                allDogs: allDogsCopy,
                filteredDogs: allDogsCopy,
            };
        case actions.DELETE_DOG:
            const dogToDelete = state.allDogs.find(dog => dog.id === action.payload);
            const dogToDeleteIndex = state.allDogs.indexOf(dogToDelete);
            const allDogsCopy2 = [...state.allDogs];
            allDogsCopy2.splice(dogToDeleteIndex, 1);
            return {
                ...state,
                allDogs: allDogsCopy2,
                filteredDogs: allDogsCopy2,
            };
        default:
            return state;
    };
};


export default reducer;

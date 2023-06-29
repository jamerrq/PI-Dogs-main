import * as actions from './action-types';


const initialState = {
    allDogs: [],
    dogDetail: {},
    temperaments: [],
    filteredDogs: [],
    orderBy: '',
    filterByTemperament: 'all',
    filterByOrigin: 'all',
    filterByName: '',
    currentPage: 1,
    dogsPerPage: 8,
    totalPages: 1,
};


const validateUUID = (uuid) => {
    return /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(uuid);
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
            // console.log('all dogs', state.allDogs);
            if (action.payload === 'all') return {
                ...state,
                filteredDogs: state.allDogs.filter(dog => {
                    if (state.filterByOrigin === 'all') return true;
                    switch (state.filterByOrigin) {
                        case 'api':
                            return !validateUUID(dog.id);
                        case 'created':
                            return validateUUID(dog.id);
                        default:
                            return false;
                    };
                }),
                filterByTemperament: action.payload,
            };
            const filteredByTemperament = state.filteredDogs.filter(dog => {
                // console.log('dog temperament', dog.temperament);
                return dog.temperament?.includes(action.payload);
            });
            return {
                ...state,
                filteredDogs: filteredByTemperament,
                filterByTemperament: action.payload,
            };
        case actions.FILTER_BY_ORIGIN:
            if (action.payload === 'all') return {
                ...state,
                filteredDogs: state.allDogs.filter(dog => {
                    if (state.filterByTemperament === 'all') return true;
                    return dog.temperament?.includes(state.filterByTemperament);
                }),
                filterByOrigin: action.payload,
            };
            const filteredByOrigin = state.filteredDogs.filter(dog => {
                // console.log('dog idApi', dog.idApi);
                // console.log('dog id', dog.id);
                switch (action.payload) {
                    case 'api':
                        return !validateUUID(dog.id);
                    case 'created':
                        return validateUUID(dog.id);
                    default:
                        return false;
                };
            });
            return {
                ...state,
                filteredDogs: filteredByOrigin,
                filterByOrigin: action.payload,
            };
        case actions.FILTER_BY_NAME:
            const filteredByName = state.allDogs.filter(dog => dog.name.toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                filteredDogs: filteredByName,
                filterByName: action.payload,
            };
        case actions.ORDER_BY_NAME:
            const orderedByName = [...state.filteredDogs].sort((a, b) => {
                // eslint-disable-next-line no-unused-vars
                const [order, direction] = action.payload.split(',');
                if (a.name > b.name) return direction === 'asc' ? 1 : -1;
                if (a.name < b.name) return direction === 'asc' ? -1 : 1;
                return 0;
            });
            return {
                ...state,
                filteredDogs: orderedByName,
                orderBy: action.payload,
            };
        case actions.ORDER_BY_WEIGHT:
            const orderedByWeight = [...state.filteredDogs].sort((a, b) => {
                const aVals = a.weight.split(' - ');
                const bVals = b.weight.split(' - ');
                let aMin, aMax, bMin, bMax;
                if (aVals.length === 2) {
                    aMin = parseInt(aVals[0]);
                    aMax = parseInt(aVals[1]);
                } else {
                    aMin = parseInt(aVals[0]);
                    aMax = parseInt(aVals[0]);
                };
                if (bVals.length === 2) {
                    bMin = parseInt(bVals[0]);
                    bMax = parseInt(bVals[1]);
                } else {
                    bMin = parseInt(bVals[0]);
                    bMax = parseInt(bVals[0]);
                };
                const aAvg = (aMin + aMax) / 2;
                const bAvg = (bMin + bMax) / 2;
                // eslint-disable-next-line no-unused-vars
                const [order, direction] = action.payload.split(',');
                if (aAvg > bAvg)
                    return direction === 'asc' ? 1 : -1;
                if (aAvg < bAvg)
                    return direction === 'asc' ? -1 : 1;
                return 0;
            });
            return {
                ...state,
                filteredDogs: orderedByWeight,
                orderBy: action.payload,
            };
        case actions.ORDER_BY_HEIGHT:
            const orderedByHeight = [...state.filteredDogs].sort((a, b) => {
                const aVals = a.height.split(' - ');
                const bVals = b.height.split(' - ');
                if (aVals.length === 2 && bVals.length === 2) {
                    const aMin = parseInt(aVals[0]);
                    const aMax = parseInt(aVals[1]);
                    const bMin = parseInt(bVals[0]);
                    const bMax = parseInt(bVals[1]);
                    const aAvg = (aMin + aMax) / 2;
                    const bAvg = (bMin + bMax) / 2;
                    // eslint-disable-next-line no-unused-vars
                    const [order, direction] = action.payload.split(',');
                    if (aAvg > bAvg)
                        return direction === 'asc' ? 1 : -1;
                    if (aAvg < bAvg)
                        return direction === 'asc' ? -1 : 1;
                    return 0;
                } else {
                    return 0;
                };
            });
            return {
                ...state,
                filteredDogs: orderedByHeight,
                orderBy: action.payload,
            };
        case actions.ORDER_BY_LIFE_SPAN:
            const orderedByLifeSpan = [...state.filteredDogs].sort((a, b) => {
                const aVals = a.life_span.replace(' years', '').split(' - ');
                const bVals = b.life_span.replace(' years', '').split(' - ');
                if (aVals.length === 2 && bVals.length === 2) {
                    const aMin = parseInt(aVals[0]);
                    const aMax = parseInt(aVals[1]);
                    const bMin = parseInt(bVals[0]);
                    const bMax = parseInt(bVals[1]);
                    const aAvg = (aMin + aMax) / 2;
                    const bAvg = (bMin + bMax) / 2;
                    // eslint-disable-next-line no-unused-vars
                    const [order, direction] = action.payload.split(',');
                    if (aAvg > bAvg)
                        return direction === 'asc' ? 1 : -1;
                    if (aAvg < bAvg)
                        return direction === 'asc' ? -1 : 1;
                    return 0;
                } else {
                    return 0;
                };
            });
            return {
                ...state,
                filteredDogs: orderedByLifeSpan,
                orderBy: action.payload,
            };
        case actions.ORDER_BY_DEFAULT:
            return {
                ...state,
                orderBy: 'default',
                // Filter dogs according to current filters
                filteredDogs: state.allDogs.filter(dog => {
                    // Filter by temperament
                    if (state.filterByTemperament !== '') {
                        const dogTemperaments = dog.temperament.split(', ');
                        if (!dogTemperaments.includes(
                            state.filterByTemperament)) return false;
                    };
                    // Filter by name
                    if (state.filterByName !== '') {
                        if (!dog.name.toLowerCase().includes(
                            state.filterByName.toLowerCase())) return false;
                    };
                    // Filter by origin
                    if (state.filterByOrigin !== '') {
                        if (state.filterByOrigin === 'api') {
                            if (validateUUID(dog.id)) return false;
                        } else {
                            if (!validateUUID(dog.id)) return false;
                        };
                    };
                    return true;
                }),
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
            const dogToModify = state.allDogs.find(dog =>
                dog.id === action.payload.id);
            const dogIndex = state.allDogs.indexOf(dogToModify);
            const allDogsCopy = [...state.allDogs];
            allDogsCopy.splice(dogIndex, 1, action.payload);
            return {
                ...state,
                allDogs: allDogsCopy,
                filteredDogs: allDogsCopy,
            };
        case actions.DELETE_DOG:
            const dogToDelete = state.allDogs.find(dog =>
                dog.id === action.payload);
            const dogToDeleteIndex = state.allDogs.indexOf(dogToDelete);
            const allDogsCopy2 = [...state.allDogs];
            allDogsCopy2.splice(dogToDeleteIndex, 1);
            return {
                ...state,
                allDogs: allDogsCopy2,
                filteredDogs: allDogsCopy2,
            };
        case actions.PREV_PAGE:
            return {
                ...state,
                currentPage: state.currentPage - 1,
            };
        case actions.NEXT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1,
            };
        case actions.FIRST_PAGE:
            return {
                ...state,
                currentPage: 1,
            };
        case actions.LAST_PAGE:
            return {
                ...state,
                currentPage: Math.ceil(state.filteredDogs.length / state.dogsPerPage),
            };
        case actions.SET_DOGS_PER_PAGE:
            return {
                ...state,
                dogsPerPage: action.payload,
            };
        case actions.SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: Math.ceil(state.filteredDogs.length / state.dogsPerPage),
            };
        case actions.SEARCH_BY_NAME:
            return {
                ...state,
                dogDetail: action.payload,
            };
        case actions.GO_FIRST_PAGE:
            return {
                ...state,
                currentPage: 1,
            };
        case actions.GO_LAST_PAGE:
            return {
                ...state,
                currentPage: Math.ceil(
                    state.filteredDogs.length / state.dogsPerPage),
            };
        default:
            return state;
    };
};


export default reducer;

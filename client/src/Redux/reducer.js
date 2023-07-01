import * as actions from './action-types';


const initialState = {
    allDogs: [],
    dogDetail: {},
    temperaments: [],
    filteredDogs: [],
    orderBy: 'name',
    orderDirection: 'asc',
    tempFilter: 'all',
    originFilter: 'all',
    nameFilter: '',
    currentPage: 1,
    dogsPerPage: 8,
    totalPages: 1,
};


const validateUUID = (uuid) => {
    return /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(uuid);
};

const filteredByTemperament = (dogs, temperament) => {
    if (!temperament || temperament === 'all') return dogs;
    const filteredByTemperament = dogs.filter(dog => {
        // console.log('dog temperament', dog.temperament);
        return dog.temperament?.includes(temperament);
    });
    return filteredByTemperament;
};

const filteredByOrigin = (dogs, origin) => {
    if (!origin || origin === 'all') return dogs;
    const filteredByOrigin = dogs.filter(dog => {
        // console.log('dog idApi', dog.idApi);
        // console.log('dog id', dog.id);
        switch (origin) {
            case 'api':
                return !validateUUID(dog.id);
            case 'created':
                return validateUUID(dog.id);
            default:
                return false;
        };
    });
    return filteredByOrigin;
};

const orderedByName = (dogs, direction) => {
    // Direction: asc, desc
    const orderedByName = [...dogs].sort((a, b) => {
        // eslint-disable-next-line no-unused-vars
        if (a.name > b.name) return direction === 'asc' ? 1 : -1;
        if (a.name < b.name) return direction === 'asc' ? -1 : 1;
        return 0;
    });
    return orderedByName;
};

const orderedByField = (dogs, field, direction) => {
    // fields: weight, height, life_span
    // direction: asc, desc
    const orderedByField = [...dogs].sort((a, b) => {
        const aVals = a[field].replace(' years', '').split(' - ');
        const bVals = b[field].replace(' years', '').split(' - ');
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
        if (aMin > bMin) return direction === 'asc' ? 1 : -1;
        if (aMin < bMin) return direction === 'asc' ? -1 : 1;
        if (aMax > bMax) return direction === 'asc' ? 1 : -1;
        if (aMax < bMax) return direction === 'asc' ? -1 : 1;
        return 0;
    });
    return orderedByField;
};

const filteredByName = (dogs, name) => {
    if (!name) return dogs;
    const filteredByName = dogs.filter(dog => dog.name.toLowerCase()
        .includes(name.toLowerCase()));
    return filteredByName;
};

const filterAndOrder = (dogs, { tempFilter, originFilter, nameFilter,
    orderBy, orderDirection }) => {
    let filteredDogs = filteredByTemperament(dogs, tempFilter);
    filteredDogs = filteredByOrigin(filteredDogs, originFilter);
    filteredDogs = filteredByName(filteredDogs, nameFilter);
    switch (orderBy) {
        case 'name':
            filteredDogs = orderedByName(filteredDogs, orderDirection);
            break;
        default:
            filteredDogs = orderedByField(filteredDogs, orderBy,
                orderDirection);
    };
    return filteredDogs;
};


function reducer(state = initialState, action) {

    switch (action.type) {

        case actions.LOAD_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                filteredDogs: filterAndOrder(action.payload, state),
            };

        case actions.LOAD_TEMPERAMENTS:
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
            return {
                ...state,
                filteredDogs: filterAndOrder(state.allDogs, {
                    ...state,
                    tempFilter: action.payload,
                }),
                tempFilter: action.payload,
            };

        case actions.FILTER_BY_ORIGIN:
            return {
                ...state,
                filteredDogs: filterAndOrder(state.allDogs, {
                    ...state,
                    originFilter: action.payload,
                }),
                originFilter: action.payload,
            };

        case actions.FILTER_BY_NAME:
            return {
                ...state,
                filteredDogs: filterAndOrder(state.allDogs, {
                    ...state,
                    nameFilter: action.payload,
                }),
                nameFilter: action.payload,
            };

        case actions.ORDER_BY_NAME:
            return {
                ...state,
                filteredDogs: filterAndOrder(state.allDogs, {
                    ...state,
                    orderBy: 'name',
                    orderDirection: action.payload,
                }),
                orderBy: 'name',
                orderDirection: action.payload,
            };

        case actions.ORDER_BY_WEIGHT:
            return {
                ...state,
                filteredDogs: filterAndOrder(state.allDogs, {
                    ...state,
                    orderBy: 'weight',
                    orderDirection: action.payload,
                }),
                orderBy: 'weight',
                orderDirection: action.payload,
            };

        case actions.ORDER_BY_HEIGHT:
            return {
                ...state,
                filteredDogs: filterAndOrder(state.allDogs, {
                    ...state,
                    orderBy: 'height',
                    orderDirection: action.payload,
                }),
                orderBy: 'height',
                orderDirection: action.payload,
            };

        case actions.ORDER_BY_LIFE_SPAN:
            return {
                ...state,
                filteredDogs: filterAndOrder(state.allDogs, {
                    ...state,
                    orderBy: 'life_span',
                    orderDirection: action.payload,
                }),
                orderBy: 'life_span',
                orderDirection: action.payload,
            };

        case actions.CLEAR_DOG_DETAIL:
            return {
                ...state,
                dogDetail: {},
            };

        case actions.CREATE_DOG:

            let newAllDogs = [...state.allDogs];

            if (action.payload.id) {
                newAllDogs = newAllDogs.filter(dog => dog.id !==
                    action.payload.id);

            };

            return {
                ...state,
                allDogs: [...newAllDogs, action.payload],
                filteredDogs: filterAndOrder([...newAllDogs, action.payload],
                    state),
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
                filteredDogs: filterAndOrder(allDogsCopy, state)
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
                filteredDogs: filterAndOrder(allDogsCopy2, state)
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
                currentPage: Math.ceil(state.filteredDogs.length
                    / state.dogsPerPage),
            };

        case actions.SET_DOGS_PER_PAGE:
            return {
                ...state,
                dogsPerPage: action.payload,
            };

        case actions.SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: Math.ceil(state.filteredDogs.length
                    / state.dogsPerPage),
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

        case actions.SET_FILTER_NAME:
            return {
                ...state,
                nameFilter: action.payload,
            };

        default:
            return state;
    };

};


export default reducer;

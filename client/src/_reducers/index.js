import {combineReducers} from 'redux';
import deckReducer from './deckReducer';
import accountReducer from './accountReducer';
import dialogReducer from './dialogReducer';

const rootReducer = combineReducers({
    //.. 리듀서 여러개 나열해 하나로 합침
    accountReducer,
    deckReducer,
    dialogReducer,
});

export default rootReducer;

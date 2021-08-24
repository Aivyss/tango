import {combineReducers} from 'redux';
import protoReducer from './reducer';

const rootReducer = combineReducers({
    protoReducer, //.. 리듀서 여러개 나열해 하나로 합침
});

export default rootReducer;

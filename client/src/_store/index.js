import {createStore} from 'redux';
import rootReducer from '../_reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['dialogReducer'],
};

const prstReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
    const store = createStore(prstReducer);
    const persistor = persistStore(store);

    return {store, persistor};
}

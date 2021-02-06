import { createStore } from 'redux';
import Reducers from './reducers/index';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const persistedReducer = persistReducer({
    key:'rootUser',
    storage:storage,
    stateReconciler: hardSet,
    whitelist:['user']
}, Reducers);

const Store = createStore(persistedReducer);
const Persistor = persistStore(Store);

export { Store, Persistor };
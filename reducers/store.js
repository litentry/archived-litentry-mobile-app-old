import { createStore, combineReducers } from 'redux';
import wallet from './wallet';

const reducers = combineReducers({
  wallet,
});

export const store = createStore(reducers, {});

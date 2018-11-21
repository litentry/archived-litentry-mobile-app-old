import { createStore, combineReducers } from 'redux';
import { walletReducer } from './wallet';
import { walletImportReducer } from '../modules/WalletImport/walletImportReducer';

const reducers = combineReducers({
  wallet: walletReducer,
  walletImport: walletImportReducer,
});

export const store = createStore(reducers, {});

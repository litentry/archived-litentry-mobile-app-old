import { createStore, combineReducers, applyMiddleware } from 'redux';
import { walletReducer } from './wallet';
import { walletImportReducer } from '../modules/WalletImport/walletImportReducer';


const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const reducers = combineReducers({
  wallet: walletReducer,
  walletImport: walletImportReducer,
});

export const store = createStore(reducers, applyMiddleware(logger));

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { walletReducer } from './wallet';
import { walletImportReducer } from '../modules/WalletImport/reducers/walletImportReducer';
import { screenReducer } from './screen';
import { popupReducer } from './popup';
import { loaderReducer } from './loader';
import { unlockReducer } from '../modules/Unlock/reducer/unlockReducer';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const reducers = combineReducers({
  walletAddress: walletReducer,
  walletImport: walletImportReducer,
  screen: screenReducer,
  popup: popupReducer,
  appState: loaderReducer,
  unlock: unlockReducer,
});

export const store = createStore(reducers, applyMiddleware(logger));

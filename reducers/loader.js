import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import set from 'lodash/fp/set';
import { loaderActionType } from '../actions/loaderAction';

export const isLoadedLabel = 'isLoaded';

export const dataEntry = {
  hasPassword: {
    label: 'HAS_PASSWORD',
    stateName: 'hasPassword',
    initValue: 'false',
    type: 'bool',
  },
  wrongPincodeCount: {
    label: 'WRONG_PINCODE_COUNT',
    stateName: 'wrongPincodeCount',
    initValue: '0',
    type: 'int',
  },
  loginToken: { label: 'LOGIN_TOKEN', stateName: 'loginToken', initValue: '', type: 'string' },
  walletAddress: {
    label: 'WALLET_ADDRESS',
    stateName: 'walletAddress',
    initValue: '',
    type: 'string',
  },
  publicKey: { label: 'PUBLIC_KEY', stateName: 'publicKey', initValue: '', type: 'string' },
  profileImage: {
    label: 'PROFILE_IMAGE',
    stateName: 'profileImage',
    initValue: '',
    type: 'string',
  },
  profileName: { label: 'PROFILE_NAME', stateName: 'profileName', initValue: '', type: 'string' },
  userId: { label: 'USER_ID', stateName: 'userId', initValue: '', type: 'string' },
};

const INIT_STATE = set(isLoadedLabel, false, _.mapValues(dataEntry, v => v.initValue));
const getLabel = stateName => _.find(dataEntry, { stateName }).label;

// React Native 0.58 Async Storage only accept string value.
const parseType = (value, type) => {
  if (type === 'bool') {
    return value === 'true';
  }
  if (type === 'int') {
    return parseInt(value);
  }
  if (type === 'float') {
    return parseFloat(value);
  }
  return value;
};

const saveMultipleData = dataObject => {
  const dataSet = _.reduce(
    dataObject,
    (result, value, key) =>
      value === null ? result : _.concat(result, [[getLabel(key), value.toString()]]),
    []
  );
  AsyncStorage.multiSet(dataSet);
};

export const loaderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case loaderActionType.READ_APP_DATA: {
      const { resultList } = action;
      //TODO to be removed
      console.log('result list is', resultList);
      const loadedResults = _.reduce(
        resultList,
        (resultState, singleResult) => {
          const resultKey = singleResult[0];
          const stateDataEntry = _.find(dataEntry, { label: resultKey });
          const resultType = stateDataEntry.type;
          const stateName = stateDataEntry.stateName;
          const resultValue = parseType(singleResult[1], resultType);
          if (resultValue != null) {
            return set(stateName, resultValue, resultState);
          }
          return set(stateName, stateDataEntry.initValue, resultState);
        },
        state
      );
      return set(isLoadedLabel, true, loadedResults);
    }

    //TODO change into async function with try and catch
    case loaderActionType.SAVE_APP_DATA: {
      if (Object.keys(action.data).length > 1) {
        saveMultipleData(action.data);
      } else {
        const stateName = Object.keys(action.data)[0];
        const key = getLabel(stateName);
        const value = Object.values(action.data)[0];
        AsyncStorage.setItem(key, value.toString());
      }
      return { ...state, ...action.data };
    }
    case loaderActionType.CLEAR_APP_DATA: {
      const newData = _.assign(
        {},
        _.omit(INIT_STATE, [
          /**
         // TODO now save profileName and profileImage happens after
         // the data is cleared, but need test in the future
         dataEntry.profileName.stateName,
         dataEntry.profileImage.stateName,
        **/
          isLoadedLabel,
        ]),
        action.data
      );
      saveMultipleData(newData);
      return set(isLoadedLabel, true, newData);
    }
    case loaderActionType.ADD_ERROR_COUNT: {
      const currentCount = state.wrongPincodeCount + 1;
      AsyncStorage.setItem(dataEntry.wrongPincodeCount.label, currentCount);
      return {
        ...state,
        wrongPincodeCount: currentCount,
      };
    }
    default:
      return state;
  }
};

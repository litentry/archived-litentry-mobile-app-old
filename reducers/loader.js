import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import set from 'lodash/fp/set';
import { loaderActionType } from '../actions/loaderAction';

const dataKey = 'APP_STORAGE';

export const dataEntry = {
  hasPassword: { label: 'HAS_PASSWORD', stateName: 'hasPassword', initValue: false },
  wrongPincodeCount: { label: 'WRONG_PINCODE_COUNT', stateName: 'wrongPincodeCount', initValue: 0 },
};

const INIT_STATE = _.mapValues(dataEntry, v => v.initValue);

export const loaderReducer = async (state = INIT_STATE, action) => {
  switch (action.type) {
    case loaderActionType.READ_APP_DATA:
      const requestList = _.map(dataEntry, v => v.label);
      const resultListRaw = await AsyncStorage.multiGet(requestList);
      const resultList = JSON.parse(resultListRaw);
      return _.reduce(
        resultList,
        (resultState, value, key) => {
          if (value !== undefined) {
            const stateName = _.find(dataEntry, { label: requestList[key] });
            return set(resultState, stateName, value);
          }
          return resultState;
        },
        state
      );

    case loaderActionType.SAVE_APP_DATA:
      if (Object.keys(action.data).length > 1) {
        const dataSet = _.reduce(
          action.data,
          (result, value, key) => _.concat(result, [key, value]),
          []
        );
        await AsyncStorage.mulitSet(dataSet);
      } else {
        const key = Object.keys(action.data)[0];
        const value = Object.values(action.data)[0];
        await AsyncStorage.setItem(key, value);
      }
      return { ...state, ...action.data };
    case loaderActionType.ADD_ERROR_COUNT:
      const currentCount = state.wrongPincodeCount + 1;
      await AsyncStorage.setItem(dataEntry.wrongPincodeCount.label, currentCount);
      return {
        ...state,
        wrongPincodeCount: currentCount,
      };
    default:
      return state;
  }
};

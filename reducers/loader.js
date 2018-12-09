import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import set from 'lodash/fp/set';
import { loaderActionType } from '../actions/loaderAction';
export const dataEntry = {
  hasPassword: { label: 'HAS_PASSWORD', stateName: 'hasPassword', initValue: false },
  wrongPincodeCount: { label: 'WRONG_PINCODE_COUNT', stateName: 'wrongPincodeCount', initValue: 0 },
};

const INIT_STATE = _.mapValues(dataEntry, v => v.initValue);

export const loaderReducer = async (state = INIT_STATE, action) => {
  switch (action.type) {
    case loaderActionType.READ_APP_DATA: {
      const requestList = _.map(dataEntry, v => v.label);
      const resultList = await AsyncStorage.multiGet(requestList);
      return _.reduce(
        resultList,
        (resultState, singleResult) => {
          const resultValue = singleResult[1]
          const resultKey = singleResult[0]
          if (resultValue !== undefined) {
            const stateDataEntry = _.find(dataEntry, { label: resultKey });
            const stateName = stateDataEntry.stateName;
            return set(stateName, resultValue, resultState)
          }
          return resultState;
        },
        state
      );
    }

    case loaderActionType.SAVE_APP_DATA: {
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
    }
    case loaderActionType.ADD_ERROR_COUNT: {
      const currentCount = state.wrongPincodeCount + 1;
      await AsyncStorage.setItem(dataEntry.wrongPincodeCount.label, currentCount);
      return {
        ...state,
        wrongPincodeCount: currentCount,
      };
    }
    default:
      return state;
  }
};

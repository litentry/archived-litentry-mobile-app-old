import {loaderActionType} from "../actions/loaderAction";
import {AsyncStorage} from "react-native";
import _ from 'lodash';
import set  from 'lodash/fp/set'

const dataKey = 'APP_STORAGE'

export const dataEntry = {
  encryptWallet: {label: 'USER_WALLET_ENCRYPTED', stateName: 'encryptWallet', initValue: null},
  disableTime: {label: `DISABLED_TIME`, stateName: 'disableTime', initValue: 0},
  hasPassword: {label: 'HAS_PASSWORD', stateName: 'hasPassword', initValue: false},
  wrongPincodeCount: {label: 'WRONG_PINCODE_COUNT', stateName: 'wrongPincodeCount', initValue: 0},
  // pincode: {label: 'PINCODE', stateName: 'pincode', initValue: null},
}

const INIT_STATE = _.mapValues(dataEntry, v => v.initValue)

export const loaderReducer = async (state = INIT_STATE, action) => {
  switch (action.type) {

    case loaderActionType.READ_APP_DATA:
      const requestList = _.map(dataEntry, v => v.label)
      const resultListRaw = await AsyncStorage.multiGet(requestList)
      const resultList = JSON.parse(resultListRaw)
      return _.reduce(resultList, (resultState, value, key)=> {
        if(value !== undefined){
          const stateName = _.find(dataEntry, {label: requestList[key]})
          return set(resultState, stateName, value)
        }
        return resultState
      }, state)

    case loaderActionType.SAVE_APP_DATA:
      if (Object.keys(action.data).length > 1) {
        const dataSet = _.reduce(action.data, (result, value, key) =>
          _.concat(result, [key, value])
        , [])
        await AsyncStorage.mulitSet(dataSet)
      } else {
        const key = Object.keys(action.data)[0]
        const value = Object.values(action.data)[0]
        await AsyncStorage.setItem(key, value)
      }
      return { ...state, ...action.data};
    default:
      return state;
  }
};

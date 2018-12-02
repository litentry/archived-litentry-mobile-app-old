import { NavigationActions } from 'react-navigation'

export const lockScreen = (params, shouldShowCancel = false) => {
  this.pushToScreen('UnlockScreen', { ...params, shouldShowCancel })
}

export function pushToScreen(routeName, params = null) {
  this.navigator && this.navigator.dispatch(NavigationActions.navigate({
    routeName,
    params
  }))
}
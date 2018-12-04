import { NavigationActions } from 'react-navigation';

export const lockScreen = (action, shouldShowCancel = false) =>
  new Promise((resolve, reject) => {
    this.pushToScreen('UnlockScreen', { resolve, reject, shouldShowCancel });
  });

export function pushToScreen(routeName, params = null) {
  this.navigator &&
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
}

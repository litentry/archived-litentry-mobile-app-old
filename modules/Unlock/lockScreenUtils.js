import { NavigationActions } from 'react-navigation';
import {screensList} from '../../navigation/screensList';

export const lockScreen = (navigation, shouldShowCancel = false) => new Promise((resolve, reject) => {
    navigation.navigate(screensList.Unlock.label, { resolve, reject, shouldShowCancel });
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

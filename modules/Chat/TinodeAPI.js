import { Platform } from 'react-native';
import Tinode from 'tinode-sdk';
import { wsInfo } from '../../config';
import { store } from '../../reducers/store';
import { chatAction } from './chatAction';
import { loaderAction } from '../../actions/loaderAction';

class TinodeAPIClass {
  constructor() {
    const platform = Platform.OS === 'ios' ? 'ios' : 'android';
    let tinode = new Tinode(
      wsInfo.appName,
      wsInfo.serverAddress,
      wsInfo.apiKey,
      null,
      wsInfo.isHttps,
      platform
    );
    tinode.enableLogging(true, true);
    tinode.onConnect = () => {
      const params = tinode.getServerInfo();
      console.log('connected！server info: ', params);
      store.dispatch(chatAction.connected());
    };
    tinode.onDisconnect = data => {
      console.log('disconnected', data);
    };
    this.tinode = tinode;
  }

  handleError(err) {
    console.log('error is', err);
  }

  connect() {
    this.tinode.connect().catch(err => {
      if (err) {
        // this.handleError(err);
      }
    });
  }

  //with credential, please refer to the doLogin function in
  login(username, password, cred) {
    if (cred) {
      cred = Tinode.credential(cred);
    }
    // Try to login with login/password. If they are not available, try token. If no token, ask for login/password.
    let promise = null;
    let token = this.tinode.getAuthToken();
    if (username && password) {
      promise = this.tinode.loginBasic(username, password, cred);
    } else if (token) {
      promise = this.tinode.loginToken(token.token, cred);
    }

    if (promise) {
      promise
        .then(ctrl => {
          console.log('ctrl is', ctrl);
          if (ctrl.code >= 300 && ctrl.text === 'validate credentials') {
            if (cred) {
              this.handleError('Code does not match', 'warn');
            }
            // this.handleCredentialsRequest(ctrl.params);
          } else {
            store.dispatch(loaderAction.saveAppData({ loginToken: ctrl.params.token }));
            // this.handleLoginSuccessful();
          }
        })
        .catch(err => {
          // Login failed, report error.
          // this.setState({ loginDisabled: false, credMethod: undefined, credCode: undefined });
          this.handleError(err.message, 'err');
          // localStorage.removeItem('auth-token');
        });
    } else {
      // No login credentials provided.
      // Make sure we are on the login page.
      // this.setState({ loginDisabled: false });
    }
  }
}

const TinodeAPI = new TinodeAPIClass();
Object.freeze(TinodeAPI);

export default TinodeAPI;

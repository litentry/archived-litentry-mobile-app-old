import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Platform } from 'react-native';
import Tinode from 'tinode-sdk';
import AppStyle from '../../../commons/AppStyle';
import { wsInfo } from '../../../config';
import TinodeAPI from '../TinodeAPI';

export default class Connector extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  createTinode() {
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
    };
    tinode.onDisconnect = data => {
      console.log('disconnected', data);
    };
    return tinode;
  }

  handleOnline(online) {
    if (online) {
      this.handleError('', null);
    } else {
      this.handleError('No connection', 'warn');
    }
  }

  doLogin(username, password, cred) {
    cred = Tinode.credential(cred);
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
          if (ctrl.code >= 300 && ctrl.text === 'validate credentials') {
            if (cred) {
              this.handleError('Code does not match', 'warn');
            }
            this.handleCredentialsRequest(ctrl.params);
          } else {
            this.handleLoginSuccessful();
          }
        })
        .catch(err => {
          // Login failed, report error.
          this.setState({ loginDisabled: false, credMethod: undefined, credCode: undefined });
          this.handleError(err.message, 'err');
          // localStorage.removeItem('auth-token');
        });
    } else {
      // No login credentials provided.
      // Make sure we are on the login page.
      this.setState({ loginDisabled: false });
    }
  }

  // Make a data URL from public.photo
  makeImageUrl(photo) {
    return photo && photo.type && photo.data
      ? 'data:image/' + photo.type + ';base64,' + photo.data
      : null;
  }

  handleCredentialsRequest(params) {
    console.log('handle credentials request', params);
  }

  tnMeMetaDesc(desc) {
    if (desc && desc.public) {
      // const state = {
      //   sidePanelTitle: desc.public.fn,
      //   sidePanelAvatar: this.makeImageUrl(desc.public.photo)
      // };
    }
  }

  tnMeContactUpdate(what, cont) {
    // if (what === 'on' || what === 'off') {
    //   this.resetContactList();
    //   if (this.state.topicSelected === cont.topic) {
    //     this.setState({topicSelectedOnline: (what === 'on')});
    //   }
    // } else if (what === 'read') {
    //   this.resetContactList();
    // } else if (what === 'msg') {
    //   // New message received
    //   // Skip update if the topic is currently open, otherwise the badge will annoyingly flash.
    //   if (this.state.topicSelected !== cont.topic) {
    //     if (this.state.messageSounds) {
    //       POP_SOUND.play();
    //     }
    //     this.resetContactList();
    //   } else if (document.hidden && this.state.messageSounds) {
    //     POP_SOUND.play();
    //   }
    // } else if (what ==='recv') {
    //   // Explicitly ignoring "recv" -- it causes no visible updates to contact list.
    // } else if (what === 'gone' || what === 'unsub') {
    //   // Topic deleted or user unsubscribed. Remove topic from view.
    //   // If the currently selected topic is gone, clear the selection.
    //   if (this.state.topicSelected === cont.topic) {
    //     this.handleTopicSelected(null);
    //   }
    //   // Redraw without the deleted topic.
    //   this.resetContactList();
    // } else if (what === 'acs') {
    //   // Permissions changed. If it's for the currently selected topic,
    //   // update the views.
    //   if (this.state.topicSelected === cont.topic) {
    //     this.setState({topicSelectedAcs: cont.acs});
    //   }
    // } else if (what === 'del') {
    //   // messages deleted (hard or soft) -- update pill counter.
    // } else {
    //   // TODO(gene): handle other types of notifications:
    //   // * ua -- user agent changes (maybe display a pictogram for mobile/desktop).
    //   // * upd -- topic 'public' updated, issue getMeta().
    //   console.log("Unsupported (yet) presence update:" + what + " in: " + cont.topic);
    // }
  }

  resetContactList() {
    let newState = {
      chatList: [],
    };
    // this.tinode.getMeTopic().contacts((c) => {
    //   newState.chatList.push(c);
    //   if (this.state.topicSelected == c.topic) {
    //     newState.topicSelectedOnline = c.online;
    //     newState.topicSelectedAcs = c.acs;
    //   }
    // });
    // // Merge search results and chat list.
    // newState.searchableContacts = TinodeWeb.prepareSearchableContacts(newState.chatList, this.state.searchResults);
    // this.setState(newState);
  }

  handleError(error) {
    console.log('connect error: ', error);
  }

  tnMeSubsUpdated() {
    this.resetContactList();
  }

  handleDisconnect(err) {}

  handleLoginSuccessful() {
    this.handleError('', null);

    // Refresh authentication token.
    // if (LocalStorageUtil.getObject('keep-logged-in')) {
    //   LocalStorageUtil.setObject('auth-token', this.tinode.getAuthToken());
    // }
    // Logged in fine, subscribe to 'me' attaching callbacks from the contacts view.
    let me = this.tinode.getMeTopic();
    me.onMetaDesc = this.tnMeMetaDesc;
    me.onContactUpdate = this.tnMeContactUpdate;
    me.onSubsUpdated = this.tnMeSubsUpdated;
    this.setState({
      connected: true,
      credMethod: undefined,
      credCode: undefined,
      myUserId: this.tinode.getCurrentUserID(),
    });
    // Subscribe, fetch topic desc, the list of subscriptions. Messages are not fetched.
    me.subscribe(
      me
        .startMetaQuery()
        .withLaterSub()
        .withDesc()
        .build()
    ).catch(err => {
      // localStorage.removeItem('auth-token');
      this.handleError(err.message, 'err');
      // HashNavigation.navigateTo('');
    });
    // HashNavigation.navigateTo(HashNavigation.setUrlSidePanel(window.location.hash, 'contacts'));
  }

  handleLoginRequest(login, password) {
    // this.setState({loginDisabled: true, login: login, password: password});
    this.handleError('', null);

    if (this.tinode.isConnected()) {
      // this.doLogin(login, password, {meth: this.state.credMethod, resp: this.state.credCode});
    } else {
    }
  }

  constructor(props) {
    super(props);
    TinodeAPI.connect();
  }

  componentDidMount() {
    const username = 'bob';
    const password = 'bob123';
  }

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {},
});

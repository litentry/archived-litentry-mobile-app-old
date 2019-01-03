import { Platform } from 'react-native';
import Tinode from 'tinode-sdk';
import { wsInfo } from '../../config';
import { store } from '../../reducers/store';
import { chatAction } from './chatAction';
import { loaderAction } from '../../actions/loaderAction';
import {screensList} from "../../navigation/screensList";

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
  async login(username, password, cred, navigation) {
    if (cred) {
      cred = Tinode.credential(cred);
    }
    // Try to login with login/password. If they are not available, try token. If no token, ask for login/password.
    let promise = null;
    let token = this.tinode.getAuthToken();
    console.log('token equal? ' , token === '7k7lEbfMqdQPSj9cFAABAAEAA6pHN+0nlq3HE/xnsuvjeYMGXMPjBXSntvY/8tBMjOI=')
    let ctrl
    try {
      if (username && password) {
         ctrl = await this.tinode.loginBasic(username, password, cred);
      } else if (token) {
         ctrl = await this.tinode.loginToken(token.token, cred);
      //   token = '7k7lEbfMqdQPSj9cFAABAAEAA6pHN+0nlq3HE/xnsuvjeYMGXMPjBXSntvY/8tBMjOI='
      //   this.tinode.setAuthToken(token);
      //    ctrl = await this.tinode.loginToken(token, cred);
      }
      console.log('ctrl is', ctrl);

      const authToken = this.tinode.getAuthToken();
      console.log('authToken is', authToken)

      const me = this.tinode.getMeTopic();
      // me.onData = this.onData; //Callback which receives a {data} message.
      // me.onMeta = this.onMeta; //Callback which receives a {meta} message.
      // me.onPres = console.log //	Callback which receives a {pres} message.
      // me.onInfo = console.log //Callback which receives an {info} message.
      me.onMetaDesc = this.tnMeMetaDesc; //Callback which receives changes to topic desctioption desc.
      me.onContactUpdate = this.tnMeContactUpdate; //Callback when presence change
      me.onSubsUpdated = this.tnMeSubsUpdated.bind(this, me); //Called after a batch of subscription changes have been recieved and cached.
      // me.onMetaSub = console.log //	Called for a single subscription record change.
      // me.onDeleteTopic = console.log // Called after the topic is deleted.

      if (ctrl.code >= 300 && ctrl.text === 'validate credentials') {
        if (cred) {
          this.handleError('Code does not match', 'warn');
        }
        // this.handleCredentialsRequest(ctrl.params);
      } else {
        store.dispatch(loaderAction.saveAppData({ loginToken: ctrl.params.token }));
        navigation.navigate(screensList.ChatList.label);
        // this.handleLoginSuccessful();
      }
    } catch (err) {
      // Login failed, report error.
      // this.setState({ loginDisabled: false, credMethod: undefined, credCode: undefined });
      this.handleError(err.message, 'err');
      // localStorage.removeItem('auth-token');
    }
  }

  onData(data){
    console.log('data is', data)
  }

  onMeta(metaData) {
    console.log('meta is', metaData)
  }


  getTopics() {
    const me = this.tinode.getMeTopic();
    console.log('topics are', me)

    me.subscribe(
      me.startMetaQuery().
      withLaterSub().
      withDesc().
      build()
    ).catch((err) => {
      //remove auth token
      this.handleError(err.message, 'err');
    });
  }



  tnMeMetaDesc(desc) {
    console.log('tnMeMetaDesc, ', desc)
    if (desc && desc.public) {
      // const state = {
      //   sidePanelTitle: desc.public.fn,
      //   sidePanelAvatar: this.makeImageUrl(desc.public.photo)
      // };
    }
  }

  tnMeContactUpdate(what, count) {
    console.log('contact update', what, count)
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

  tnMeSubsUpdated (meTopics, data){
    console.log('subs updates!', meTopics, data);
    let chatList = []
    meTopics.contacts((c) => {
      console.log('contact is', c)
      chatList.push(c);
    });
    store.dispatch(chatAction.updateChatList(chatList));
    // this.resetContactList();
  }

  resetContactList() {
    let chatList = []
    this.tinode.getMeTopic().contacts((c) => {
      console.log('contact is', c)
      chatList.push(c);
      // if (this.state.topicSelected == c.topic) {
      //   newState.topicSelectedOnline = c.online;
      //   newState.topicSelectedAcs = c.acs;
      // }
    });
    // Merge search results and chat list.
    console.log('chat list are', chatList)
    // const searchableContacts = this.prepareSearchableContacts(chatList, []);
    // this.setState(newState);
  }

  // Merge search results and contact list to create a single flat
  // list of known contacts for GroupManager to use.
  prepareSearchableContacts(chatList, foundContacts) {
    let merged = {};

    // For chatList topics merge only p2p topics and convert them to the
    // same format as foundContacts.
    for (const c of chatList) {
      if (Tinode.topicType(c.topic) === 'p2p') {
        merged[c.topic] = {
          user: c.topic,
          updated: c.updated,
          public: c.public,
          private: c.private,
          acs: c.acs
        };
      }
    }
    // Add all foundCountacts if they have not been added already.
    for (const c of foundContacts) {
      if (!merged[c.user]) {
        merged[c.user] = c;
      }
    }

    return Object.values(merged);
  }

  tnFndSubsUpdated() {
    let foundContacts = [];
    // Don't attempt to create P2P topics which already exist. Server will reject the duplicates.
    this.tinode.getFndTopic().contacts((s) => {
      foundContacts.push(s);
    });
    // this.setState({
    //   searchResults: foundContacts,
    //   searchableContacts: TinodeWeb.prepareSearchableContacts(this.state.chatList, foundContacts)
    // });
  }
}

const TinodeAPI = new TinodeAPIClass();
Object.freeze(TinodeAPI);

export default TinodeAPI;

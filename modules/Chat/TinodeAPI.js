import { Platform } from 'react-native';
import Tinode from 'tinode-sdk';
import _ from 'lodash';
import { chatConfig, wsInfo } from '../../config';
import { store } from '../../reducers/store';
import { chatAction } from './actions/chatAction';
import { loaderAction } from '../../actions/loaderAction';
import { screensList } from '../../navigation/screensList';
import { topicsAction } from './actions/topicsAction';
import { makeImageUrl } from './lib/blob-helpers';
import { dataEntry } from '../../reducers/loader';

const saveLoginToken = token =>
  store.dispatch(loaderAction.saveAppData({ [dataEntry.loginToken.stateName]: token }));

const newGroupTopicParams = { desc: { public: {}, private: { comment: {} } }, tags: {} };

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
    console.log('authToken is', token);
    let ctrl;
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
      this.handleLoginSuccessful(ctrl, navigation, cred);
    } catch (err) {
      // Login failed, report error.
      // this.setState({ loginDisabled: false, credMethod: undefined, credCode: undefined });
      this.handleError(err.message, 'err');
      // localStorage.removeItem('auth-token');
    }
  }

  handleLoginSuccessful(ctrl, navigation, cred) {
    const me = this.tinode.getMeTopic();
    // me.onData = this.onData; //Callback which receives a {data} message.
    // me.onMeta = this.onMeta; //Callback which receives a {meta} message.
    // me.onPres = console.log //	Callback which receives a {pres} message.
    // me.onInfo = console.log //Callback which receives an {info} message.
    me.onMetaDesc = this.tnMeMetaDesc; //Callback which receives changes to topic description desc.
    me.onContactUpdate = this.tnMeContactUpdate; //Callback when presence change
    me.onSubsUpdated = this.tnMeSubsUpdated.bind(this, me); //Called after a batch of subscription changes have been received and cached.
    // me.onMetaSub = console.log //	Called for a single subscription record change.
    // me.onDeleteTopic = console.log // Called after the topic is deleted.

    if (ctrl.code >= 300 && ctrl.text === 'validate credentials') {
      if (cred) {
        this.handleError('Code does not match', 'warn');
      }
      // this.handleCredentialsRequest(ctrl.params);
    } else {
      saveLoginToken(ctrl.params.token);
      navigation.navigate(screensList.ChatList.label);
      // this.handleLoginSuccessful();
    }
  }

  onData(data) {
    console.log('data is', data);
  }

  onMeta(metaData) {
    console.log('meta is', metaData);
  }

  fetchTopics() {
    const me = this.tinode.getMeTopic();
    console.log('topics are', me);

    return me
      .subscribe(
        me
          .startMetaQuery()
          .withLaterSub()
          .withDesc()
          .build()
      )
      .catch(err => {
        //remove auth token
        this.handleError(err.message, 'err');
      });
  }

  fetchUserId() {
    const userId = this.tinode.getCurrentUserID();
    store.dispatch(chatAction.setId(userId));
  }

  tnMeMetaDesc(desc) {
    console.log('tnMeMetaDesc, ', desc);
    if (desc && desc.public) {
      // const state = {
      //   sidePanelTitle: desc.public.fn,
      //   sidePanelAvatar: this.makeImageUrl(desc.public.photo)
      // };
    }
  }

  tnMeContactUpdate(what, count) {
    console.log('contact update', what, count);
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

  reformatData(result, value, key) {
    if (key === 'photo') {
      const avatar = makeImageUrl(value);
      store.dispatch(chatAction.setAvatar(avatar));
      return result;
    }
    if (key === 'fn') {
      return _.set(result, 'name', value);
    }
    return _.set(result, key, value);
  }

  tnMeSubsUpdated(meTopics, data) {
    console.log('subs updates!', meTopics, data);
    let chatList = [];
    meTopics.contacts(c => {
      console.log('contact is', c);
      chatList.push(c);
    });
    const privateData = meTopics.private;
    const userInfo = _.reduce(meTopics.public, this.reformatData, privateData);
    store.dispatch(chatAction.setUserInfo(userInfo));
    store.dispatch(chatAction.updateChatList(chatList));
    // this.resetContactList();
  }

  resetContactList() {
    let chatList = [];
    this.tinode.getMeTopic().contacts(c => {
      console.log('contact is', c);
      chatList.push(c);
      // if (this.state.topicSelected == c.topic) {
      //   newState.topicSelectedOnline = c.online;
      //   newState.topicSelectedAcs = c.acs;
      // }
    });
    // Merge search results and chat list.
    console.log('chat list are', chatList);
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
          acs: c.acs,
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
    this.tinode.getFndTopic().contacts(s => {
      foundContacts.push(s);
    });
    // this.setState({
    //   searchResults: foundContacts,
    //   searchableContacts: TinodeWeb.prepareSearchableContacts(this.state.chatList, foundContacts)
    // });
  }

  subscribe(topicId, userId) {
    let topic = this.tinode.getTopic(topicId);
    let newGroupTopic = Tinode.isNewGroupTopicName(topicId);

    topic.onData = this.handleNewMessage.bind(this, topic, topicId);
    // topic.onAllMessagesReceived = this.handleAllMessagesReceived;
    topic.onInfo = this.handleInfoReceipt.bind(this, topic, topicId);
    topic.onMetaDesc = this.handleDescChange.bind(this, topic, topicId);
    topic.onSubsUpdated = this.handleSubsUpdated.bind(this, topic, topicId, userId);
    // topic.onPres = this.handleSubsUpdated.bind(this, topic, topicId, userId);

    //TODO why? add title and avatar?
    this.handleDescChange(topic, topicId, 'first desc');
    this.handleSubsUpdated(topic, topicId, userId, 'first update Subs');
    store.dispatch(chatAction.subscribeChat(topicId));

    if (!topic.isSubscribed()) {
      // Don't request the tags. They are useless unless the user
      // is the owner and is editing the topic.
      let getQuery = topic
        .startMetaQuery()
        .withLaterDesc()
        .withLaterSub()
        .withLaterData(chatConfig.messagePerPage)
        .withLaterDel()
        .withTags();
      let setQuery = newGroupTopic ? newGroupTopicParams : undefined;

      topic
        .subscribe(getQuery.build(), setQuery)
        .then(ctrl => {
          console.log('subscribe callback ctrl is ', ctrl);
          // If there are unsent messages, try sending them now.
          topic.queuedMessages(pub => {
            if (!pub._sending && topic.isSubscribed()) {
              topic.publishMessage(pub);
            }
          });
        })
        .catch(err => {
          console.log(err.message, 'err');
        });
    }
  }

  unsubscribe(oldTopicId) {
    if (!oldTopic) {
      return;
    }
    let oldTopic = this.tinode.getTopic(oldTopicId);
    if (oldTopic && oldTopic.isSubscribed()) {
      oldTopic
        .leave(false)
        .catch(() => {
          /* do nothing here */
        })
        .finally(() => {
          // We don't care if the request succeeded or failed.
          // The topic is dead regardless.
          oldTopic.onData = undefined;
          oldTopic.onAllMessagesReceived = undefined;
          oldTopic.onInfo = undefined;
          oldTopic.onMetaDesc = undefined;
          oldTopic.onSubsUpdated = undefined;
          oldTopic.onPres = undefined;
        });
    }
    store.dispatch(chatAction.subscribeChat(null));
  }

  handleNewMessage(topic, topicId, msg) {
    console.log('in handle News messages, msg are:', msg);
    const messages = [];
    topic.messages(function(m) {
      if (!m.deleted) {
        messages.push(m);
      }
    });
    store.dispatch(topicsAction.updateTopicMessages(topicId, messages));
  }

  handleInfoReceipt(topic, topicId, info) {
    console.log('in handleInfoReceipt, info are:', info);
    switch (info.what) {
      case 'kp':
      case 'read':
      case 'recv':
      default:
        console.log('receipt info is', info);
    }
  }

  handleDescChange(topic, topicId, desc) {
    console.log('topics Info is', desc);
    if (desc.public) {
      store.dispatch(
        topicsAction.updateTopicMeta(
          topicId,
          desc.public.fn,
          desc.public.photo,
          topic.private.comment
        )
      );
    } else {
      store.dispatch(topicsAction.updateTopicMeta(topicId, '', '', ''));
    }
    console.log('in handleDescChange, desc are:', desc);
    if (desc.acs) {
      console.log('test acs is: ', desc.acs);
      // this.setState({
      //   readOnly: !desc.acs.isWriter(),
      //   writeOnly: !desc.acs.isReader()
      // });
    }
  }
  //TODO which in the future could be optimized with group user, only fetch the user id
  handleSubsUpdated(topic, topicId, userId, memberIdList) {
    console.log('in handle Subs Update, subsUpdated are:', memberIdList);
    const subs = [];
    const topicName = topic.topic;
    topic.subscribers(sub => {
      if (topic.getType() === 'grp') {
        return subs.push(sub);
      }
      if (sub.user !== userId) {
        subs.push(sub);
      }
    });
    store.dispatch(topicsAction.updateTopicSubs(topicName, subs));
  }

  handleCredentialsRequest() {}

  handleCreateNewAccount(navigation, username, password, publicInfo, tags, cred) {
    this.tinode
      .createAccountBasic(username, password, {
        public: publicInfo,
        tags,
        cred: Tinode.credential({ meth: 'email', val: cred }),
      })
      .then(ctrl => {
        if (ctrl.code >= 300 && ctrl.text === 'validate credentials') {
          this.handleCredentialsRequest(ctrl.params);
        } else {
          this.handleLoginSuccessful(ctrl, navigation, cred);
        }
      })
      .catch(err => {
        this.handleError(err.message, 'err');
      });
  }

  static isGroupId(chatId) {
    return typeof chatId === 'string' && chatId.indexOf('grp') === 0;
  }

  generatePublicInfo(fn, imageDataUrl) {
    let publicInfo = null;

    if ((fn && fn.trim()) || imageDataUrl) {
      publicInfo = {};
      if (fn) {
        publicInfo.fn = fn.trim();
      }
      if (imageDataUrl) {
        const dataStart = imageDataUrl.indexOf(',');
        publicInfo.photo = {
          data: imageDataUrl.substring(dataStart + 1),
          type: 'jpg',
        };
      }
    }
    return publicInfo;
  }
}

const TinodeAPI = new TinodeAPIClass();
Object.freeze(TinodeAPI);

export default TinodeAPI;

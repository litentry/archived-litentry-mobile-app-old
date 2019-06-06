# Litentry Mobile App
React native mobile application for Litentry, introduction about litentry check [here](https://www.litentry.com/post/litentry-introduction)


### Mobile App Abstract
Personal users would like to use an application to manage all its identities, it could also become a Hub connected to different interest IoT devices. For example, directly buying the authorization or the data from other IoT devices. With the advantage of GPS of mobile phone, it could further integrate with LBS (Location Based Services).

In order to work in a fully decentralized scenario, itself also need to integrate a cold wallet, where could keep a user's private key in a secure environment provided by Android or iOS.

![Identity and Token Creation Example](https://static.wixstatic.com/media/760d3a_52af33517358421daa3049c56a52545c~mv2_d_7754_1982_s_2.png/v1/fill/w_1480,h_378,al_c,q_90,usm_0.66_1.00_0.01/760d3a_52af33517358421daa3049c56a52545c~mv2_d_7754_1982_s_2.webp)
![Token Usage Example](https://static.wixstatic.com/media/760d3a_bcd14680c86244fb93b02097e7c8f0ef~mv2.png/v1/fill/w_1480,h_466,al_c,q_90,usm_0.66_1.00_0.01/760d3a_bcd14680c86244fb93b02097e7c8f0ef~mv2.webp)

### Quick Start

(Recommend if you do not have node installed)

* Install NVM: https://github.com/creationix/nvm

* Install NODE WITH NVM: `nvm install latest`

* Install globally expo-cli   `npm install -g expo-cli`

* Enter Project(Genesis Mobile) folder and install Dependency： `npm install`

* start with`expo start`

* run Emulator in the opened window

* Please create new branch and make PR to master branch.

### Contribute

There is a chinese [tutorial](https://zoom.us/recording/share/vePRFto2ubrnEzihfatogSU_b3HR3VBZCMfoza8K8P6wIumekTziMw?startTime=1545263766000) on how to create component.

##### Framework

The main structure is using expo with react native:
https://expo.io/

react native integrate many component，each of them could be check on documentation website, for example, Alert:
https://facebook.github.io/react-native/docs/alert

Also expo has some special component, like this Document Picker:
https://docs.expo.io/versions/latest/sdk/document-picker/

##### Other vendors

React Navigation: https://reactnavigation.org/

Redux: https://redux.js.org/

lodash: https://lodash.com/docs/4.17.11

##### Difference of Android and iOS

How to write platform specific code on react native:
https://facebook.github.io/react-native/docs/platform-specific-code







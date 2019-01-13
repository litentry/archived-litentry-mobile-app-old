import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import { aboutInfo } from '../../../config';
import packageJson from '../../../package';
import MultiLineDisplay from '../../../components/MultiLineDisplay';

class AboutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.About.title} />,
    headerBackTitle: '',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{aboutInfo.appName}</Text>
        <Text style={styles.text}>{packageJson.version}</Text>
        <Text style={styles.text}>{aboutInfo.date}</Text>
        <MultiLineDisplay title={t.DESIGNER_TITLE} list={aboutInfo.designer} />
        <MultiLineDisplay title={t.DEVELOPER_TITLE} list={aboutInfo.developer} />
        <MultiLineDisplay title={t.CONTACT_TITLE} list={aboutInfo.contact} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutScreen);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
    marginTop: 10,
  },
});

const t = {
  DESIGNER_TITLE: 'Designer',
  DEVELOPER_TITLE: 'Developer',
  CONTACT_TITLE: 'Contact',
};

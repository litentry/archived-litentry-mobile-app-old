import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screensList } from '../../../navigation/screensList';
import AmendInput from '../components/AmendInput';
import { groupMetaRules } from '../../../config';
import { generateNavigationOptions } from '../components/navigationOptions';

class AmendCountryNameScreen extends React.Component {
  static navigationOptions = generateNavigationOptions(screensList.AmendCountryName.title);

  render() {
    return (
      <View style={styles.container}>
        <AmendInput
          propertyPath={groupMetaRules.COUNTRY_NAME}
          unit={t.UNIT_TEXT}
          intro={t.INTRO_TEXT}
          description={t.DESCRIPTION_TEXT}
          isNumber={false}
        />
      </View>
    );
  }
}

const t = {
  UNIT_TEXT: '',
  INTRO_TEXT: 'What is the country name? ',
  DESCRIPTION_TEXT: '',
};

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendCountryNameScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

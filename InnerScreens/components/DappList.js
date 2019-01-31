import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import _ from 'lodash';
import { withNavigation } from 'react-navigation';
import AppStyle from '../../commons/AppStyle';
import { screensList } from '../../navigation/screensList';
import appsList from '../../modules/Apps/appList';
import SingleLineSingleValueDisplay from '../../components/SingleLineSingleValueDisplay';
import PropTypes from 'prop-types';

class DappsList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  renderDapp(item) {
    const { navigation } = this.props;

    return (
      <SingleLineSingleValueDisplay
        key={item.title}
        title={_.capitalize(item.title)}
        fontSize={AppStyle.fontMiddle}
        Icon={() => <Image source={item.imageSource} style={styles.image} />}
        onClick={() =>
          navigation.navigate(screensList.AppProfile.label, {
            title: item.title,
          })
        }
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>{_.values(appsList).filter(item=>item.enabled).map(item => this.renderDapp(item))}</View>
    );
  }
}

export default withNavigation(DappsList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 20,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
});

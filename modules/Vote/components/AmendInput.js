import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { voteAction } from '../voteAction';

class AmendInput extends React.Component {
  static propTypes = {
    propertyPath: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    intro: PropTypes.string,
    description: PropTypes.string,
    placeholder: PropTypes.string,
    voteOrigin: PropTypes.object.isRequired,
    setVote: PropTypes.func.isRequired,
    isNumber: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    placeholder: '',
    intro: '',
    description: '',
  };

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    const { voteOrigin, propertyPath } = this.props;
    this.setState({ value: _.get(voteOrigin, propertyPath, '').toString() });
  }

  render() {
    const { unit, placeholder, intro, description, setVote, propertyPath } = this.props;
    const { value } = this.state;

    const InputContainer = () => (
      <View style={styles.inputContainer}>
        <View style={styles.mainInput}>
          <TextInput
            style={styles.input}
            onChangeText={v => this.setState({ value: v })}
            onBlur={() => {
              const formattedValue = Number.parseFloat(value).toFixed(1);
              setVote(_.set({}, propertyPath, formattedValue));
            }}
            value={value}
            placeholder={placeholder}
          />
          <Text style={styles.unitText}>{unit}</Text>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.intro}>{intro}</Text>
        <InputContainer />
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  voteOrigin: state.vote.origin,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  setVote: voteAction.setVote,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendInput);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: AppStyle.chatBackGroundColor,
    alignItems: 'stretch',
  },
  intro: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    color: 'black',
    fontSize: AppStyle.fontMiddle,
    fontFamily: AppStyle.mainFont,
  },
  description: {
    padding: 30,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  inputContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginVertical: 80,
    paddingVertical: 20,
  },
  input: {
    flex: 2,
    color: 'black',
    textAlign: 'center',
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddle,
  },
  unitText: {
    flex: 1,
    textAlign: 'right',
    color: 'red',
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddle,
  },
});

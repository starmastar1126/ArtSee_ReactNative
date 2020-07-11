import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Keyboard
} from "react-native";

import { connect } from "react-redux";

import s from './AuthStyles'
import { sendResetLinkEmail } from '../../reducers/profile'
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import DefaultButton from "../../components/UI/DefaultButton/DefaultButton";
import validate from "../../utils/validation";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

const initObj = {
  email: {
    value: "",
    valid: false,
    validationRules: {
      isEmail: true
    }
  },
};

class Forgot extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        marginBottom: -1,
        backgroundColor: 'white'
      },
      headerBackTitleStyle: {
        color: 'black',
      },
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',
    };
  };
  state = {
    message: null,
    controls: initObj
  }
  sendResetLink() {
    this.props.sendResetLinkEmail(this.state.controls.email.value, (res) => {
      if (res.success) {
        this.setState({ message: { success: true, text: 'Password Reset Sent' } });
      } else {
        this.setState({ message: { success: false, text: JSON.stringify(res) } });
      }
    });
  }
  updateInputState = (key, value) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value,
            valid: validate(value, prevState.controls[key].validationRules)
          }
        }
      };
    });
  };
  render() {
    const { message } = this.state;
    const isModalVisible = message ? true: false
    return (
      <View style={[s.container, { justifyContent: 'flex-start' }]}>
        <Modal style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={isModalVisible}
          onBackdropPress={() => {
            this.props.navigation.goBack();
          }}
          swipeDirection={['left', 'right', 'up', 'down']}>
          <View style={s.modalcontent}>
            {
              message && message.success &&
              <View style={s.modaliconWrap}>
                <Icon name='check' color="#282F37" size={40} />
              </View>
            }
            <Text style={s.modaltext}>{message && message.text}</Text>
          </View>
        </Modal>
        {
          !isModalVisible &&
          <View style={s.textContainer}>
            <Text style={s.welcomeText}>
              Enter your email address
            </Text>
            <Text style={s.baseText}>
              Please enter your email address to receive a new password:
            </Text>
          </View>
        }
        {!isModalVisible &&
          <View style={s.inputContainer}>
            <DefaultInput
              placeholder="Email"
              value={this.state.controls.email.value}
              valid={this.state.controls.email.valid}
              onChangeText={value => { this.updateInputState("email", value) }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>
        }
        {
          !isModalVisible && this.state.controls.email.valid &&
          <TouchableOpacity
            style={[s.primaryBtn, { marginTop: 20 }]}
            onPress={() => { Keyboard.dismiss(); this.sendResetLink() }}
          >
            <Text style={s.primaryBtnLabel}>
              Submit
                        </Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = { sendResetLinkEmail }

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);

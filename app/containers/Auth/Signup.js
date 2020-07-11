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
  Platform
} from "react-native";

import { connect } from "react-redux";

import { size, trim } from 'lodash'
import s from './AuthStyles'
import {signup,facebookAuth} from '../../reducers/auth'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class Signup extends Component {
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
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    disabled: true
  }
  validate = () => {
    const { email, password, confirmPassword } = this.state
    let error = {}

    if (email.trim() === '') {
      error.email = true
    }

    if (password === '') {
      error.password = true
    }

    if (confirmPassword === '' || confirmPassword !== password) {
      error.confirmPassword = true
    }
    return error
  }
  submit = () => {
    
    if(this.state.disabled)
      return;

    const { email, password, firstName, lastName, phone } = this.state
    const data = { email, password, firstName, lastName, phone }

    this.props.signup(data)
  }
  handleChangeText = (name) => (value) => {
    const newState = {[name]: value}

    this.setState(newState, () => {
      let disabled = true

      if (size(this.validate()) === 0) {
        disabled = false
      }

      this.setState({disabled});
    })
  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={[s.container]} behavior="padding">
        <View style={s.header}>
          <Text style={s.headertitle}>Sign up</Text>
          <Text style={s.headersubtitle}>Create an account to use Artsee without limits. For free.</Text>
        </View>
        <TextInput
          style={s.input}
          placeholder="Email"
          value = {this.state.email}
          onChangeText={this.handleChangeText('email')}
          autoCapitalize = 'none'
        />
        <TextInput
          style={s.input}
          placeholder="User Name"
          value = {this.state.firstName}
          onChangeText={this.handleChangeText('firstName')}
        />
        {/*
        <TextInput
          style={s.input}
          placeholder="Last Name"
          value = {this.state.lastName}
          onChangeText={this.handleChangeText('lastName')}
        />
        <TextInput
          style={s.input}
          placeholder="Phone Number"
          value = {this.state.phone}
          onChangeText={this.handleChangeText('phone')}
        />
        */}
        <TextInput
          style={s.input}
          placeholder="Password"
          secureTextEntry={true}
          value = {this.state.password}
          onChangeText={this.handleChangeText('password')}
        />
        <TextInput
          style={s.input}
          placeholder="Reapeat Password"
          secureTextEntry={true}
          value = {this.state.confirmPassword}
          onChangeText={this.handleChangeText('confirmPassword')}
        />
        <View style={s.buttonGroup}>
          <View style={s.buttonColumn}>
            <TouchableOpacity
              style={[s.primaryBtn, this.state.disabled && {backgroundColor: 'gray'}]}
              onPress={() => { this.submit() }}
              activeOpacity={this.state.disabled ? 1: 0.8}
            >
              <Text style={s.primaryBtnLabel}>
                Sign Up
          </Text>
            </TouchableOpacity>
          </View>
          <View style={s.buttonColumn}>
            
          </View>
        </View>
        <View style={{width: '100%', marginTop: 20, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
          <Text style={s.headersubtitle}>
            Already have an account?
          </Text>
          <TouchableOpacity
            style={{ padding: 5, margin: 5 }}
            onPress={() => { this.props.navigation.navigate('Login') }}
          >
            <Text style={s.forgotLabel}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {signup,facebookAuth};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

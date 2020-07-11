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

import s from './AuthStyles'
import { login, facebookAuth } from '../../reducers/auth'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderBackButton, StackActions, NavigationActions } from 'react-navigation';

class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
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
      headerLeft:(<HeaderBackButton onPress={()=>{
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        });
        navigation.dispatch(resetAction);
      }}/>)
    };
  };
  state = {
    email: '',
    password: ''
  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={[s.container]} extraScrollHeight={120} behavior="padding">
        <View style={s.header}>
          <Text style={s.headertitle}>Hello!</Text>
          <Text style={s.headersubtitle}>Log in to your account</Text>
        </View>
        <TextInput
          style={s.input}
          placeholder="Username or Email"
          value={this.state.email}
          onChangeText={value => { this.setState({ email: value }) }}
          autoCapitalize='none'
        />
        <TextInput
          style={s.input}
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={value => { this.setState({ password: value }) }}
        />
        <View style={s.buttonGroup}>
          <View style={s.buttonColumn}>
            <TouchableOpacity
              style={[s.primaryBtn,]}
              onPress={() => { this.props.login(this.state.email, this.state.password) }}
            >
              <Text style={s.primaryBtnLabel}>
                Log in
          </Text>
            </TouchableOpacity>
          </View>
          <View style={s.buttonColumn}>
            <TouchableOpacity
              style={{ padding: 5, margin: 5 }}
              onPress={() => { this.props.navigation.navigate('Forgot') }}
            >
              <Text style={s.forgotLabel}>
                Forgot password?
          </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', marginTop: 20, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
          <Text style={s.headersubtitle}>
            Still without account?
          </Text>
          <TouchableOpacity
            style={{ padding: 5, margin: 5 }}
            onPress={() => { this.props.navigation.navigate('Signup') }}
          >
            <Text style={s.forgotLabel}>
              Create One
              </Text>
          </TouchableOpacity>
        </View>
        {/*
        <View style={s.orView}>
          <Text style={s.orLable}>
            OR
          </Text>
        </View>
        <TouchableOpacity
          style={s.fbBtn}
          onPress={() => { this.props.facebookAuth(); }}
        >
          <Text style={s.fbBtnLabel}>
            Log in with Facebook
          </Text>
        </TouchableOpacity>
        */
        }
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

const mapDispatchToProps = {
  login,
  facebookAuth
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

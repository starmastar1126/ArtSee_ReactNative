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

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import DefaultButton from "../../components/UI/DefaultButton/DefaultButton";
import validate from "../../utils/validation";


import styles from './ChangePasswordStyles'
import { updatePassword } from "../../reducers/profile";
import { NavigationActions, StackActions } from 'react-navigation';

class ChangePassword extends Component {
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
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                old_password: {
                    key: "old_password",
                    name: "old_password",
                    title: '',
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 6
                    }
                },
                new_password: {
                    key: "new_password",
                    name: "new_password",
                    title: '',
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 6
                    }
                },
                confirm_password: {
                    key: "confirm_password",
                    name: "confirm_password",
                    title: '',
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 6
                    }
                }
            }
        };
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
    updateUserProfile = () => {
        const { controls } = this.state;
        if (controls.old_password.value && controls.old_password.value.length > 0 && controls.old_password.valid) {
            if (controls.new_password.value && controls.new_password.value.length > 0 && controls.new_password.valid) {
                if (controls.confirm_password.value && controls.confirm_password.value.length > 0 && controls.confirm_password.valid) {
                    if (controls.new_password.value === controls.confirm_password.value) {
                        this.props.handleUpdate(controls.old_password.value, controls.confirm_password.value, (res) => {
                            if (res) {
                                if (res.error === 'success') {
                                    alert("Password updated successfully.");
                                    this.props.navigation.dispatch(NavigationActions.back())
                                } else alert(res.error);
                            }
                        })
                    } else {
                        this.setValid('confirm_password', false);
                        this.setValid('new_password', false);
                    }
                } else {
                    this.setValid('confirm_password', false);
                }
            } else {
                this.setValid('new_password', false);
            }
        } else {
            this.setValid('old_password', false);
        }
    };
    setValid(key, valid) {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        valid
                    }
                }
            };
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView style={[styles.container]}>
                    <View style={styles.textContainer}>
                        <Text style={styles.welcomeText}>
                            Profile Settings
                </Text>
                        <Text style={styles.baseText}>
                            Set your password
                    </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Current Passsword
                    </Text>
                        <DefaultInput
                            placeholder=""
                            secureTextEntry={true}
                            value={this.state.controls.old_password.value}
                            valid={this.state.controls.old_password.valid}
                            onChangeText={value => { this.updateInputState('old_password', value) }}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            New Password
                    </Text>
                        <DefaultInput
                            placeholder=""
                            secureTextEntry={true}
                            value={this.state.controls.new_password.value}
                            valid={this.state.controls.new_password.valid}
                            onChangeText={value => { this.updateInputState('new_password', value) }}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Confirm New Password
                    </Text>
                        <DefaultInput
                            placeholder=""
                            secureTextEntry={true}
                            value={this.state.controls.confirm_password.value}
                            valid={this.state.controls.confirm_password.valid}
                            onChangeText={value => { this.updateInputState('confirm_password', value) }}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.primaryBtn, { marginTop: 20 }]}
                        onPress={() => {
                            this.updateUserProfile();
                        }}
                    >
                        <Text style={styles.primaryBtnLabel}>
                            Update
                    </Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => {
    return {
        handleUpdate: (oldpwd, newpwd, callback) =>
            dispatch(updatePassword(oldpwd, newpwd, callback))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

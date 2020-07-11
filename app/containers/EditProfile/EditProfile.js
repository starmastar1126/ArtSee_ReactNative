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


import styles from './EditProfileStyles'
import { updateProfile } from "../../reducers/profile";


class EditProfile extends Component {
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
                email: {
                    static: true,
                    key: "email",
                    name: "Email",
                    title: "What's your primary email address?",
                    value: props.user && props.user.email ? props.user.email : '',
                    valid: true,
                    validationRules: {
                        isEmail: true
                    }
                },
                firstName: {
                    key: "firstName",
                    name: "Username",
                    title: 'Set your username- it can be your name or nickname',
                    value: props.user && props.user.firstName ? props.user.firstName : '',
                    valid: true,
                    validationRules: {
                        isName: true,
                        minLength: 4
                    }
                },
                phone: {
                    key: "phone",
                    name: "Phone Number",
                    title: 'Set your phone number',
                    value: props.user && props.user.phone ? props.user.phone : '',
                    valid: true,
                    validationRules: {
                        isName: true,
                        minLength: 4
                    }
                },
                password: {
                    key: "password",
                    name: "Password",
                    title: '',
                    value: 'Set your password',
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
        const key = this.props.navigation.state.params.type;
        const obj = this.state.controls[key];
        if(obj.valid){
            this.props.handleUpdate({[key]:obj.value});
        }
    };
    render() {
        const key = this.props.navigation.state.params.type;
        const obj = this.state.controls[key];
        return (
            <View style={[styles.container, { justifyContent: 'flex-start' }]}>
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>
                        Profile Settings
                </Text>
                    <Text style={styles.baseText}>
                        {obj.title}
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>
                        {obj.name}
                    </Text>
                    <DefaultInput
                        placeholder=""
                        value={obj.value}
                        valid={obj.valid}
                        onChangeText={value => { this.updateInputState(obj.key, value) }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
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
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => {
    return {
        handleUpdate: (authData, authMode) =>
            dispatch(updateProfile(authData, authMode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

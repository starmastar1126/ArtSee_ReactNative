import React, { Component } from "react";
import throttle from "lodash/throttle";

import { connect } from "react-redux";

import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { updateAvatar } from "../../reducers/profile";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAvatarText } from '../../utils/constants';
import ImagePicker from 'react-native-image-crop-picker';
import AppConfig from '../../config/AppConfig'
import styles from './ProfileStyles'
import Modal from "react-native-modal";


class PlayerInfoScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            marginBottom: -1,
            backgroundColor: 'transparent'
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            controls: {
                email: {
                    static: true,
                    key: "email",
                    field: 'email',
                    name: "Email",
                    value: '',
                    valid: true,
                    validationRules: {
                        isEmail: true
                    }
                },
                username: {
                    key: "firstName",
                    field: 'firstName',
                    name: "Username",
                    value: '',
                    valid: true,
                    validationRules: {
                        isName: true,
                        minLength: 4
                    }
                },
                phone: {
                    key: "phone",
                    field: 'phone',
                    name: "Phone Number",
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 4
                    }
                },
                walletAddress: {
                    key: "walletAddress",
                    field: 'wall',
                    name: "Wallet Address",
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 4
                    }
                }
            }
        };

    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.navigation.isFocused();
    }
    render() {
        const separator = <View style={styles.separator} />;
        const { user } = this.props;

        return (
            <View style={styles.container}>
                <Modal isVisible={this.state.isModalVisible} style={{ justifyContent: 'flex-end', margin: 0 }} onBackdropPress={() => this.setState({ isModalVisible: false })}>
                    <View style={{ backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <TouchableOpacity style={styles.pickerItem}
                            onPress={() => {
                                this.setState({ isModalVisible: false }, () => {
                                    setTimeout(() => {
                                        ImagePicker.openCamera({
                                            width: 300,
                                            height: 300,
                                            cropping: true,
                                            mediaType: 'photo',
                                        }).then(image => {
                                            this.props.updateAvatar(image);
                                        });
                                    }, 500);
                                });
                            }}
                        >
                            <Text style={styles.pickerLabel}>
                                Take a Photo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pickerItem}
                            onPress={() => {
                                this.setState({ isModalVisible: false }, () => {
                                    setTimeout(() => {
                                        ImagePicker.openPicker({
                                            width: 300,
                                            height: 300,
                                            cropping: true,
                                            mediaType: 'photo',
                                        }).then(image => {
                                            this.props.updateAvatar(image);
                                        });
                                    }, 500)
                                });
                            }}>
                            <Text style={styles.pickerLabel}>
                                Choose from Camera Roll
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() => this.props.navigation.openDrawer()}
                    >
                        <Icon style={styles.icon} name='menu' />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.profileCont}>
                    <View style={styles.topCont}>
                        <TouchableOpacity style={styles.playerImage} onPress={() => {
                            this.setState({ isModalVisible: true });
                        }}>
                            {
                                user && user.avatar && user.avatar.length > 0 ?
                                    <Image source={{ uri: AppConfig.siteUrl + "/" + user.avatar.replace('\/','/') }} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, resizeMode: 'contain' }}></Image> :
                                    <Text style={styles.avatarText}>{this.state.controls && this.state.controls.username && getAvatarText(this.state.controls.username.value)}</Text>
                            }
                            <View style={styles.cameraIcon}>
                                <Icon name={"camera-alt"} size={20} color={'black'} style={styles.camera} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.topName}>{(user && user.firstName ? user.firstName : '')}</Text>
                    </View>
                    {
                        [
                            this.state.controls.email,
                            this.state.controls.username,
                            this.state.controls.phone,

                            {
                                key: "password",
                                name: "Password",
                                value: '******'
                            }

                            //this.state.controls.walletAddress
                        ].map(item => {
                            return (
                                <View style={styles.itemWrapper} key={item.name}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.inputLabel}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.input}>
                                            {user[item.field]}
                                        </Text>
                                    </View>
                                    {
                                        !item.static &&
                                        <TouchableOpacity style={styles.editbutton} onPress={() => {
                                            if (item.key === 'password')
                                                this.props.navigation.navigate("ChangePassword")
                                            else this.props.navigation.navigate("EditProfile", { type: item.key })
                                        }}>
                                            <Icon
                                                name='edit'
                                                style={[styles.suffix, styles.searchIcon]}
                                            />
                                        </TouchableOpacity>
                                    }
                                </View>
                            );
                        })
                    }

                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateAvatar: (data) => dispatch(updateAvatar(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfoScreen);

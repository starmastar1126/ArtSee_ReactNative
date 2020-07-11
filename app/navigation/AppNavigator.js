import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { TouchableOpacity, Image, StyleSheet, View, Platform, Text } from 'react-native'
import { AppStyles, Colors, Fonts, Metrics, Images } from '../themes'
import { Drawer } from '../components'
import s from './AppNavigationStyles'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-navigation';

//Auth Stack
import Welcome from '../containers/Welcome/Welcome'
import Login from '../containers/Auth/Login'
import Signup from '../containers/Auth/Signup'
import Forgot from '../containers/Auth/Forgot'

//Home Stack
import Library from '../containers/Library/Library'
import Gallery from '../containers/Gallery/Gallery'
import CreateHangup from '../containers/CreateHangup/CreateHangup'
import Favorite from '../containers/Favorite/Favorite'
import Profile from '../containers/Profile/Profile'

import EditProfile from '../containers/EditProfile/EditProfile'
import ChangePassword from '../containers/ChangePassword/ChangePassword'

import ArtDetails from '../components/ArtDetails/ArtDetails'
import WallDetails from '../components/WallDetails/WallDetails'

import SelectWall from '../containers/SelectWall/SelectWall'
import SelectArt from '../containers/SelectArt/SelectArt'
import SelectFrame from '../containers/SelectFrame/SelectFrame'
import HangupEdit from '../containers/HangupEdit/HangupEdit'
import QrCodeScannerScreen from '../containers/qrCodeScanner/qrCodeScanner'
import ArtCreate from '../containers/ArtCreate/ArtCreate'
import WallCreate from '../containers/WallCreate/WallCreate'
import WallResize from '../containers/WallResize/WallResize'

import AuthLoading from '../containers/AuthLoading/AuthLoading'

const tabButtons = {
    Library: {
        inactive: require('../assets/icon_library_inactive.png'),
        active: require('../assets/icon_library_active.png')
    },
    Gallery: {
        inactive: require('../assets/icon_gallery_inactive.png'),
        active: require('../assets/icon_gallery_active.png')
    },
    CreateHangup: {
        inactive: require('../assets/icon_hangup_inactive.png'),
        active: require('../assets/icon_hangup_active.png')
    },
    Favorite: {
        inactive: require('../assets/icon_favorite_inactive.png'),
        active: require('../assets/icon_favorite_active.png')
    },
    Profile: {
        inactive: require('../assets/icon_profile_inactive.png'),
        active: require('../assets/icon_profile_active.png')
    }
};
const BackButton = ({ navigation, text }) => (
    <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={s.iconWrapper}
    >
        <Icon style={s.icon} name='chevron-left' />
        {text && <Text style={s.backBtnText}>{text}</Text>}
    </TouchableOpacity>
)

const DrawerButton = ({ navigation }) => (
    <TouchableOpacity
        style={s.iconWrapper}
        onPress={() => navigation.openDrawer()}
    >
        <Icon style={s.icon} name='menu' />
    </TouchableOpacity>
)

const SkipButton = ({ navigation, routeName, screenProps: { t }, params = {} }) => (
    <TouchableOpacity
        style={s.skipBtn}
        onPress={() => navigation.navigate(routeName, params)}
    >
        <Text style={s.skipBtnText}>{t('skip')}</Text>
    </TouchableOpacity>
)
const ImageHeader = (props) => (
    <View style={{ position: "relative", backgroundColor: '#eee' }}>
        <FastImage
            style={[s.imageheader, props.bgImgStyle]}
            source={props.bgImg}
            resizeMode={FastImage.resizeMode.cover}
        />
        {props.middleLayer && props.middleLayer()}
        <Header {...props} style={{ backgroundColor: 'blue' }} />
    </View>
);
class TabComponent extends React.Component {
    render() {
        const { name, badgeCount, color, size, focused } = this.props;
        return (
            <View style={name == 'CreateHangup' && { marginBottom: 25 }}>
                <View style={{ width: size, height: size, margin: 5 }}>
                    <Image source={tabButtons[name] ? (focused ? tabButtons[name].active : tabButtons[name].inactive) : null} style={{ width: size, height: size, resizeMode: 'contain' }} />
                </View>
            </View>
        );
    }
}
const tabbar = createBottomTabNavigator(
    {
        Library: Library,
        Gallery: Gallery,
        CreateHangup: CreateHangup,
        Favorite: Favorite,
        Profile: Profile,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                // You can return any component that you like here!
                return <TabComponent name={routeName} focused={focused} size={routeName == 'CreateHangup' ? 60 : 22} color={tintColor} badgeCount={0} />;
            },
            tabBarLabel: navigation.state.routeName != 'CreateHangup' ? navigation.state.routeName : ' '
        }),
        tabBarOptions: {
            activeTintColor: '#286ad6',
            inactiveTintColor: '#d6d7de',
            showLabel: true
        },
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
);

const AppStack = createStackNavigator({
    Main: tabbar,
    EditProfile: EditProfile,
    ChangePassword: ChangePassword,

    ArtDetails: ArtDetails,
    WallDetails: WallDetails,
    SelectWall: SelectWall,
    SelectArt: SelectArt,
    SelectFrame: SelectFrame,
    HangupEdit: HangupEdit,
    QrCodeScanner: QrCodeScannerScreen,
    ArtCreate: ArtCreate,
    WallCreate: WallCreate,
    WallResize: WallResize,
    GalleryDirectory: Gallery
}, {
        initialRouteName: 'Main',
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTitleStyle: {
                color: 'black'
            },
            headerTintColor: 'black',
        }),
    })

const AuthStack = createStackNavigator({
    Welcome: { screen: Welcome },
    Login: { screen: Login },
    Signup: { screen: Signup },
    Forgot: { screen: Forgot }
}, {
        initialRouteName: 'Welcome'
    })



const DrawNav = createDrawerNavigator({
    Entry: { screen: AppStack },
}, {
        drawerWidth: 300,
        drawerPosition: 'right',
        contentComponent: Drawer,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    })

const RootNavigator = createSwitchNavigator({
    Auth: AuthStack,
    AuthLoading,
    App: DrawNav,
}, {
        initialRouteName: 'AuthLoading',
    })
const navigationMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav
);

const AppWithNavigationState = createReduxContainer(RootNavigator);

const mapStateToProps = state => ({
    state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export {
    RootNavigator,
    AppNavigator,
    navigationMiddleware,
    BackButton,
    DrawerButton,
    SkipButton,
    ImageHeader
};

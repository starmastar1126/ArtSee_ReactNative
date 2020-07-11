// @flow
import React from 'react'
import { ScrollView, TouchableOpacity, View, Image, Text } from 'react-native'

import { connect } from 'react-redux'
import AppConfig from '../../config/AppConfig'

import { NavigationActions, StackActions } from 'react-navigation';
import { getAvatarText } from '../../utils/constants';
import styles from './DrawerStyles'
import {authSignOut} from '../../reducers/auth'

class Drawer extends React.Component {

  getActiveRouteName(navigationState) {
    if (navigationState && navigationState.index) {
      const route = navigationState.routes && navigationState.routes[navigationState.index];
      if (route === null || route === undefined)
        return null
      // dive into nested navigators
      if (route.routes) {
        return this.getActiveRouteName(route);
      }
      return route.routeName;
    }
    return null;
  }
  navigate = screen => {
    const { state } = this.props.navigation;

    if (state && this.getActiveRouteName(state) === screen) {
      this.props.navigation.closeDrawer()
      return;
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: screen })],
    });
    this.props.navigation.dispatch(resetAction);

  }
  push = screen => {
    const { state } = this.props.navigation;

    if (state && this.getActiveRouteName(state) === screen) {
      this.props.navigation.closeDrawer()
      return;
    }
    this.props.navigation.navigate(screen)
  }

  render() {
    const { user } = this.props
    
    return (
      <View style={styles.container}>
        <View style={styles.topCont}>
          <View style={styles.playerImage}>
            {
              user && user.avatar && user.avatar.length > 0 ?
                <Image source={{ uri: AppConfig.siteUrl + "/" + user.avatar.replace('\/','/') }} style={{position:'absolute',left: 0, right: 0, top: 0, bottom: 0, resizeMode: 'contain' }}></Image> :
                <Text style={styles.avatarText}>{user && user.username && getAvatarText(user.username.value)}</Text>
            }
          </View>
          <Text style={styles.topName}>{(user && user.email ? user.email : '')}</Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.item} onPress={()=>{this.props.navigation.navigate('Library')}}>
            <Text style={styles.itemLabel}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemLabel} onPress={()=>{this.props.navigation.navigate('Gallery')}}>Gallerly Directory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=>{this.props.navigation.navigate('Favorite')}}>
            <Text style={styles.itemLabel}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=>this.props.navigation.navigate('Profile')}>
            <Text style={styles.itemLabel}>Personal Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout} onPress={()=>this.props.authSignOut()}>
            <Text style={styles.logoutLabel}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = {authSignOut}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)

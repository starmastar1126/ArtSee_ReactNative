import React from 'react'
import { Alert, Linking, Platform, StatusBar, View,PushNotificationIOS, Image, BackHandler, TouchableOpacity } from 'react-native'
import {AppNavigator} from '../../navigation/AppNavigator'
import { connect } from 'react-redux'
import s from './RootStyles'
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class RootContainer extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    // Register the alert located on this master page
    // This MessageBar will be accessible from the current (same) component, and from its child component
    // The MessageBar is then declared only once, in your main component.
    MessageBarManager.registerMessageBar(this.refs.alert);
  }
  
  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }
  render () {
    const {t,state, dispatch, addListener, user} = this.props
    
    return (
      <View style={s.applicationView}>
        <StatusBar backgroundColor="black" barStyle='dark-content'/>
        <AppNavigator navigation={{ state, dispatch, addListener }} screenProps={{t}}/>
        <MessageBarAlert ref="alert" />
      </View>
    )
  }
}
const mapStateToProps = state => ({
  nav:state.nav,
});
const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)

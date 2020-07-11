import React from 'react'
import { View,Text, ActivityIndicator } from 'react-native'
import s from './AuthLoadingStyles'
import { connect } from 'react-redux'
import { authAutoSignIn } from '../../reducers/auth'

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    props.authAutoSignIn();
  }
  render () {
    return (
      <View style={s.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = { authAutoSignIn }

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)

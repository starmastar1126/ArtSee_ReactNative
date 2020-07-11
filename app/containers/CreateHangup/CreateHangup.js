// @flow
import React from 'react'
import { Image, ImageBackground, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import s from './CreateHangupStyles'


import { fiveminutes, oneminute } from '../../utils/constants'
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons'
import Icon from "react-native-vector-icons/FontAwesome";

class CreateHangUp extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.navigation.isFocused();
  }
  componentWillMount() {

  }
  componentWillUnmount() {

  }
  render() {

    return (
      <View style={s.wrapper}>
        <View style={s.header}>
          <TouchableOpacity
            style={s.iconWrapper}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <MaterialIcon style={s.menuicon} name='menu' />
          </TouchableOpacity>
        </View>
        <View style={s.container}>
          <Text style={s.sectionname}>
            Hangup
          </Text>
        </View>
        <View style={s.content}>
          <ScrollView>
            <View style={s.itemContainer}>
              <View style={s.imageIcon}>
                <Icon name='image' color='white' size={25} />
              </View>
              <Text style={s.textStyle}>
                Regular Hangup
            </Text>
              <Text style={s.descriptionStyle}>
                Create a hangup based on a picture of a wall
            </Text>
              <View style={s.createButton}>
                <TouchableOpacity style={s.createhangupBtn} onPress={() => this.props.navigation.navigate('SelectWall')}>
                  <Text style={s.createhangupBtnLabel}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[s.itemContainer, { padding: 0, marginBottom: 30 }]}>
              <View style={{ padding: 20 }}>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
                  <View style={s.imageIcon}>
                    <Icon name='image' color='white' size={25} />
                  </View>
                </View>
                <Text style={s.textStyle}>
                  AR Hangup
              </Text>
                <Text style={s.descriptionStyle}>
                  3d hangup allows you to position your art on the wall of your choice while list view.
              </Text>
              </View>
              {/*
              <View style={s.createButton}>
                <TouchableOpacity style={s.createhangupBtn}>
                  <Text style={s.createhangupBtnLabel}>Create</Text>
                </TouchableOpacity>
              </View>
              */}
              <View style={[s.createButton, { backgroundColor: '#282F37', padding: 10 }]}>
                <Text style={s.createhangupBtnLabel}>COMING SOON</Text>
              </View>
              <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.6)' }} />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateHangUp)

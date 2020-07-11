// @flow
import React from 'react'
import { Image, ImageBackground, FlatList, TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import s from './SelectWallStyles'

import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons'
import realm from '@store/realm';
import { forEach, map } from 'lodash'
import WallItem from '../../components/WallItem/WallItem'
import { toggleWallFavorite } from '../../reducers/wall'
import {create} from '../../reducers/hangup'

class SelectWall extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)

    this.walldata_source = realm.objects('walls').sorted('isFavorite', true);
    this.walldata_source.addListener(this.onWallChange);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.navigation.isFocused();
  }
  componentWillMount() {
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.onFocus)
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove()
    this.walldata_source.removeListener(this.onWallChange);
  }
  onWallChange = (name, changes) => {
    this.forceUpdate();
  }
  onFocus = () => {
    this.forceUpdate();
  }
  renderWallItem = ({ item, index }) => {
    return (
      <WallItem
        disabled
        wall={item}
        onLink={(wallData) => {
          const { params } = this.props.navigation && this.props.navigation.state
          const art = params && params.art

          if (art) {
            this.props.navigation.popToTop()
            this.props.create({ wall: item, art: art }, (res) => {
              if (res) {
                this.props.navigation.navigate('HangupEdit', { item: res })
              }
            })
          } else {
            this.props.navigation.navigate('SelectArt', { wall: wallData })
          }
        }}
        onFavorite={(id) => this.props.toggleWallFavorite(id)}
      />)
  }

  render() {
    const walldata = map(this.walldata_source.slice(), (i) => { return { ...i, key: i.id } })

    return (
      <View style={s.wrapper}>
        <View style={s.header}>
          <TouchableOpacity
            style={s.iconWrapper}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <MaterialIcon style={s.icon} name='arrow-back' />
          </TouchableOpacity>
          <View>
            {/*
              <TouchableOpacity
                style={s.iconWrapper}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon style={s.icon} name='menu' />
              </TouchableOpacity>
            */}
          </View>
        </View>
        <View style={s.container}>
          <Text style={s.sectionname}>
            Select a wall
          </Text>
        </View>
        <View style={s.content}>
          <FlatList
            style={{ flex: 1, width: '100%' }}
            keyExtractor={(item) => `${item.id}`}
            data={walldata ? walldata : []}
            renderItem={this.renderWallItem}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  toggleWallFavorite,
  create
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectWall)

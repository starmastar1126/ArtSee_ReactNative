// @flow
import React from 'react'
import { Image, ImageBackground, FlatList, TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import s from './SelectArtStyles'

import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons'
import realm from '@store/realm';
import { forEach, map } from 'lodash'
import ArtItem from '../../components/ArtItem/ArtItem'
import { toggleArtFavorite } from '../../reducers/art'
import { create, addArt } from '../../reducers/hangup'

class SelectArt extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)

    this.artdata_source = realm.objects('arts').sorted('isFavorite', true);
    this.artdata_source.addListener(this.onArtChange);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.navigation.isFocused();
  }
  componentWillMount() {
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.onFocus)
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove()
    this.artdata_source.removeListener(this.onArtChange);
  }
  onArtChange = (name, changes) => {
    this.forceUpdate();
  }
  onFocus = () => {
    this.forceUpdate();
  }
  renderWallItem = ({ item, index }) => {
    return (
      <ArtItem
        art={item}
        onLink={(artData) => {
          const { params } = this.props.navigation.state
          const wall = params && params.wall || {}
          const updateId = params && params.updateId

          if (updateId) {
            
            this.props.navigation.goBack()
            this.props.addArt(updateId, { art: item }, (res) => {
              
              if (res) {

              }
            })
            
          } else {
            this.props.navigation.popToTop()
            this.props.create({ wall: wall, art: item }, (res) => {
              
              if (res) {
                this.props.navigation.navigate('HangupEdit', { item: res })
              }
            })
          }
        }}
        onFavorite={(id) => this.props.toggleArtFavorite(id)}
      />)
  }

  render() {
    const artData = map(this.artdata_source.slice(), (i) => { return { ...i, key: i.id } })

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
            Select Art
          </Text>
        </View>
        <View style={s.content}>
          <FlatList
            style={{ flex: 1, width: '100%' }}
            keyExtractor={(item) => `${item.id}`}
            data={artData ? artData : []}
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
  toggleArtFavorite,
  create,
  addArt
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectArt)

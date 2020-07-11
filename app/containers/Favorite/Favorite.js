// @flow
import React from 'react'
import { Image, ImageBackground, FlatList, TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import s from './FavoriteStyles'

import { fiveminutes, oneminute } from '../../utils/constants'
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons'
import realm from '@store/realm';
import { forEach, map } from 'lodash'
import ArtItem from '../../components/ArtItem/ArtItem'
import WallItem from '../../components/WallItem/WallItem'
import HangupItem from '../../components/HangupItem/HangupItem'
import { toggleWallFavorite } from '../../reducers/wall'
import { toggleArtFavorite } from '../../reducers/art'
import { toggleHangupFavorite, loadToStore } from '../../reducers/hangup'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import {getPureObject} from '../../utils/utils'

class Favorite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisibleDelete: false,
      deleteType: null,
      deleteData: null
    }

    this.artdata_source = realm.objects('arts').sorted('isFavorite', true);
    this.artdata_source.addListener(this.onArtChange);

    this.walldata_source = realm.objects('walls').sorted('isFavorite', true);
    this.walldata_source.addListener(this.onWallChange);

    this.hangupdata_source = realm.objects('hangups').sorted('isFavorite', true);
    this.hangupdata_source.addListener(this.onHangupChange);
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
    this.walldata_source.removeListener(this.onWallChange);
    this.hangupdata_source.removeListener(this.onHangupChange);
  }
  onArtChange = (name, changes) => {
    this.forceUpdate();
  }
  onWallChange = (name, changes) => {
    this.forceUpdate();
  }
  onHangupChange = (name, changes) => {
    this.forceUpdate();
  }
  onFocus = () => {
    this.forceUpdate();
  }
  renderFavoriteItem = ({ item, index }) => {
    if (item.type === 'hangup') {
      return (
        <HangupItem
          item={item}
          index={index}
          onLink={(hangupData) => {
            const arts = hangupData.arts;
            let new_arts = arts.map(item => getPureObject(item))
            this.props.loadToStore({ ...hangupData, arts: new_arts }, () => {
              this.props.navigation.navigate('HangupEdit', { item: hangupData })
            });
          }}
          onFavorite={(id) => this.props.toggleHangupFavorite(id)}
          onDelete={(deleteHangup) => { this.setState({ isVisibleDelete: true, deleteType: 'hangup', deleteData: deleteHangup }) }}
        />)
    }
    if (item.type === 'art') {
      return (
        <ArtItem
          art={item}
          onLink={(artData) => {
            this.props.navigation.navigate('ArtDetails', { artData })
          }}
          onFavorite={(id) => this.props.toggleArtFavorite(id)}
          onDelete={(deleteArt) => { this.setState({ isVisibleDelete: true, deleteType: 'art', deleteData: deleteArt }) }}
        />)
    }
    return (
      <WallItem
        wall={item}
        onLink={(wallData) => {
          this.props.navigation.navigate('WallDetails', { wallData })
        }}
        onFavorite={(id) => this.props.toggleWallFavorite(id)}
        onDelete={(deleteWall) => { this.setState({ isVisibleDelete: true, deleteType: 'wall', deleteData: deleteWall }) }}
      />)
  }

  render() {
    const artData = map(this.artdata_source.slice(), (i) => { return { ...i, key: i.id, type: 'art' } }).filter(item => item.isFavorite)
    const walldata = map(this.walldata_source.slice(), (i) => { return { ...i, key: i.id, type: 'wall' } }).filter(item => item.isFavorite)
    const hangupdata = map(this.hangupdata_source.slice(), (i) => { return { ...i, key: i.id, type: 'hangup' } }).filter(item => item.isFavorite)

    const { deleteType, deleteData } = this.state;
    let deleteName = '';
    if (deleteType && deleteData) {
      if (deleteType === 'art')
        deleteName = deleteData.imageName.toUpperCase()
      if (deleteType === 'wall')
        deleteName = deleteData.wallName.toUpperCase()
    }
    return (
      <View style={s.wrapper}>
        <DeleteModal
          type={deleteType}
          id={deleteData && deleteData.id}
          text={`Are you sure you want to delete ${deleteName}?`}
          confirmtext={'Artwork has been successfully deleted!'}
          isVisible={this.state.isVisibleDelete}
          onClose={() => this.setState({ isVisibleDelete: false })}
          onDelete={(callback) => { }} />
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
            Favorite
          </Text>
        </View>
        <View style={s.content}>
          <FlatList
            style={{ flex: 1, width: '100%' }}
            keyExtractor={(item) => `${item.id}`}
            data={[...artData, ...walldata, ...hangupdata]}
            renderItem={this.renderFavoriteItem}
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
  toggleWallFavorite,
  toggleHangupFavorite,
  loadToStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)

// @flow
import React from 'react'
import { Text, TouchableOpacity, View, Image, ActivityIndicator, FlatList } from 'react-native'
import { connect } from 'react-redux'

import styles from './ArtListStyles'
import { getArtList } from '../../reducers/art'
import AppConfig from '../../config/AppConfig'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

import ArtItem from '../ArtItem/ArtItem'

class ArtDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    props.getArtList(props.galleryID, props.artistlist.firstName, props.artistlist.lastName, (res) => {
      this.setState({ loading: !res });
    });
  }
  renderArt = ({ item, index }) => {
    const art = item || {}
    return (<ArtItem art={art} onLink={this.props.onLink} disabled={true} type={this.props.type}/>)
  }
  render() {
    return (
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {this.state.loading && <ActivityIndicator size="small" color="gray" />}
        <FlatList
          style={{ flex: 1, width: '100%' }}
          keyExtractor={(item) => `${item.qrCode}`}
          data={this.props.artList}
          renderItem={this.renderArt}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  artList: state.art.artList
})

const mapDispatchToProps = { getArtList }

export default connect(mapStateToProps, mapDispatchToProps)(ArtDetails)

// @flow
import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'


import styles from './ArtItemStyles'
import AppConfig from '../../config/AppConfig'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Swipeout from 'react-native-swipeout';


export default class ArtItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { art, disabled, onDelete, type } = this.props;

    var swipeoutBtns = [
      {
        text: '',
        backgroundColor: 'transparent',
        component: <View style={styles.swipeoutBtn}><View style={styles.iconWrap}><Icon name='delete' color="white" size={22} /></View></View>,
        onPress: () => { onDelete && onDelete(art) }
      }
    ]
    
    return (
      <Swipeout right={swipeoutBtns} disabled={disabled} style={{ backgroundColor: 'transparent' }} autoClose={true} buttonWidth={120}>
        <TouchableOpacity style={styles.itemContainer} onPress={() => { this.props.onLink && this.props.onLink(art) }}>
          <View style={{ height: 100, width: 100, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
            {art.imagePath || art.serverThumbPath
              ? <Image source={{ uri: art.serverThumbPath ? `${AppConfig.siteUrl}${art.serverThumbPath}` : `file://${art.imagePath}` }} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, resizeMode: 'cover' }} />
              : null
            }
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1, paddingHorizontal: 8 }}>
            <Text
              adjustsFontSizeToFit
              ellipsizeMode="tail"
              numberOfLines={2}
              style={[styles.textStyle, { fontSize: 16, color: 'black', textAlignVertical: 'bottom', lineHeight: 25 }]}
            >
              {art.imageName && art.imageName.toUpperCase()}
            </Text>

            {art.artistName
              ? <Text adjustsFontSizeToFit style={[styles.textStyle, { fontSize: 16, color: 'gray', marginBottom: 5 }]}>by {art.artistName}</Text>
              : null
            }
            <TouchableOpacity style={[styles.linkIcon, { backgroundColor: art.isFavorite ? 'red' : '#CACACA' }]} onPress={() => { this.props.onFavorite && this.props.onFavorite(art.id) }}>
              <Icon color="white" size={15} name='favorite' />
            </TouchableOpacity>
          </View>
          <View style={styles.linkIcon} >
            <Icon color="white" size={25} name={type === 'add' ? 'add' : 'chevron-right'} />
          </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }
}


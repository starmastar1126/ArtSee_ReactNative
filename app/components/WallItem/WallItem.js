// @flow
import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'


import styles from './WallItemStyles'
import AppConfig from '../../config/AppConfig'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Swipeout from 'react-native-swipeout';

export default class WallItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { wall, disabled, onDelete } = this.props;
    var swipeoutBtns = [
      {
        text: '',
        backgroundColor: 'transparent',
        component: <View style={styles.swipeoutBtn}><View style={styles.iconWrap}><Icon name='delete' color="white" size={20} /></View></View>,
        onPress:()=>{onDelete && onDelete(wall)}
      }
    ]

    const imageSource = parseInt(wall.imagePath)
    return (
      <Swipeout right={swipeoutBtns} disabled={disabled} style={{ backgroundColor: 'transparent' }} autoClose={true} buttonWidth={120}>
        <TouchableOpacity style={styles.itemContainer} onPress={() => { this.props.onLink && this.props.onLink(wall) }}>
          <View style={{ height: 100, width: 100, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
            {(wall.imagePath || imageSource)
              ? <Image source={imageSource > 0 ? imageSource : { uri: `file://${wall.imagePath}` }} style={{ height: 100, width: 100, resizeMode: 'cover' }} />
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
              {wall.wallName && wall.wallName.toUpperCase()}
            </Text>

            {wall.wallDescription
              ? <Text adjustsFontSizeToFit style={[styles.textStyle, { fontSize: 16, color: 'gray', marginBottom: 5 }]}>{wall.wallDescription}</Text>
              : null
            }
            <TouchableOpacity style={[styles.linkIcon, { backgroundColor: wall.isFavorite ? 'red' : '#CACACA' }]} onPress={() => { this.props.onFavorite && this.props.onFavorite(wall.id) }}>
              <Icon color="white" size={15} name='favorite' />
            </TouchableOpacity>
          </View>
          <View style={styles.linkIcon} >
            <Icon color="white" size={25} name='chevron-right' />
          </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }
}


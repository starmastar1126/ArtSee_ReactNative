import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Animated } from 'react-native';
import { size } from 'lodash'
import Draggable from "../common/Draggable";
import DeleteButton from '../../assets/DeleteButton.png'
import { Icon } from "react-native-elements";
import styles from './DragArtItemStyles'
import AppConfig from '../../config/AppConfig'

class DragArtItem extends Component {
  render() {
    const { show, onDrag, active, rotate = 0, imagePath, width, height, onRotateBack, onRotateForward, onDelete, offsetX, offsetY, onFocus, onBlur, frame, innerWidth, innerHeight } = this.props
    return active
      ? (<Draggable pressDragRelease={onDrag} reverse={false} offsetX={offsetX} offsetY={offsetY} >
        <View style={[styles.artContainer, show ? styles.wrapper : {}]}>
          {imagePath
            ? (<View style={{ transform: [{ rotateZ: `${rotate}deg` },], width, height }}>
              <Animated.Image
                source={{ uri: `file://${imagePath}` }}
                style={{ marginLeft: (width - innerWidth) / 2, marginTop: (height - innerHeight) / 2, height: innerHeight || 100, width: innerWidth || 100, resizeMode: 'stretch' }}
              />
              {
                frame && frame.image && <Animated.Image source={{ uri: `${AppConfig.siteUrl}${frame.image}` }}
                  style={{ position: 'absolute', left: 0, top: 0, height: height || 100, width: width || 100, resizeMode: 'stretch', backgroundColor: 'transparent' }} />
              }
            </View>)
            : null
          }
          {show
            ? <View style={styles.rotate}>
              <Icon
                name={'reply'}
                type='entypo'
                color={'#eee'}
                iconStyle={{ paddingRight: 8 }}
                onPress={onRotateBack}
              />
              <Icon
                name={'forward'}
                type='entypo'
                color={'#eee'}
                iconStyle={{ paddingLeft: 0 }}
                onPress={onRotateForward}
              />
            </View>
            : null
          }
          {show
            ? <View style={{ position: 'absolute', top: 5, left: 5 }}>
              <TouchableOpacity onPress={onDelete}>
                <Image source={DeleteButton} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
            </View>
            : null
          }
        </View>
      </Draggable>)
      : imagePath
        ? (<Draggable pressDragRelease={onDrag} pressInDrag={onFocus} reverse={false} offsetX={offsetX} offsetY={offsetY}>
          <View style={{ transform: [{ rotateZ: `${rotate}deg` },], elevation: 3, margin: 26, width, height }}>
            <Animated.Image
              source={{ uri: `file://${imagePath}` }}
              style={{ marginLeft: (width - innerWidth) / 2, marginTop: (height - innerHeight) / 2, height: innerHeight || 100, width: innerWidth || 100, resizeMode: 'stretch' }}
            />
            {
              frame && frame.image && <Animated.Image source={{ uri: `${AppConfig.siteUrl}${frame.image}` }}
                style={{ position: 'absolute', left: 0, top: 0, height: height || 100, width: width || 100, resizeMode: 'stretch', backgroundColor: 'transparent' }} />
            }
          </View>
        </Draggable>)
        : null
  }
}


export default DragArtItem;

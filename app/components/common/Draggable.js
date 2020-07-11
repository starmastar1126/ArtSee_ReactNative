/**
 *	* https://github.com/tongyy/react-native-draggable
 *
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';

let Window = Dimensions.get('window');
const USE_NATIVE_DRIVER = true;
export default class Draggable extends Component {
  
  constructor(props) {
    super(props);
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  }
  _onHandlerStateChange = event => {
    const { pressDragRelease, reverse, onMove, offsetX, offsetY } = this.props;
    this._animatedValue = new Animated.ValueXY({x: offsetX  , y: offsetY })
    
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
      if(pressDragRelease)
        pressDragRelease({x: this._lastOffset.x, y: this._lastOffset.y});
    }
  };
  componentWillMount() {
    this._lastOffset.x += this.props.offsetX;
    this._lastOffset.y += this.props.offsetY;
    this._translateX.setOffset(this._lastOffset.x);
    this._translateX.setValue(0);
    this._translateY.setOffset(this._lastOffset.y);
    this._translateY.setValue(0);
  }
  componentWillUnmount() {
    
  }
  

  render() {
    const { pressDrag, longPressDrag, pressInDrag, pressOutDrag, children } = this.props;

    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}>
        <Animated.View
          //{...this.panResponder.panHandlers}
          style={[{zIndex: 999, position: 'absolute',}, {transform: [
            { translateX: this._translateX },
            { translateY: this._translateY },
          ],}]}
        >
          <TouchableWithoutFeedback
            onPress={pressDrag}
            onLongPress={longPressDrag}
            onPressIn={pressInDrag}
            onPressOut={pressOutDrag}
          >
            {children}
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

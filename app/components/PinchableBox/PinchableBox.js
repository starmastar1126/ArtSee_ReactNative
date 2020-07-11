import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import {
    PanGestureHandler,
    PinchGestureHandler,
    RotationGestureHandler,
    State,
} from 'react-native-gesture-handler';
import styles from './PinchableBoxStyles'

const USE_NATIVE_DRIVER = true;

export class PinchableBox extends React.Component {
    panRef = React.createRef();
    rotationRef = React.createRef();
    pinchRef = React.createRef();

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
        /****************************************************************************************/
        /****************************************************************************************/
        /****************************************************************************************/
        /* Pinching */
        this._baseScale = new Animated.Value(1);
        this._pinchScale = new Animated.Value(1);
        this._scale = Animated.multiply(this._baseScale, this._pinchScale);
        this._lastScale = 1;
        this._onPinchGestureEvent = Animated.event(
            [{ nativeEvent: { scale: this._pinchScale } }],
            { useNativeDriver: USE_NATIVE_DRIVER }
        );
    }
    componentDidMount() {
        /*
        this._lastOffset.x += this.props.initLeft;
        this._lastOffset.y += this.props.initTop;
        this._translateX.setOffset(this._lastOffset.x);
        this._translateX.setValue(0);
        this._translateY.setOffset(this._lastOffset.y);
        this._translateY.setValue(0);
        */
    }
    _onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastOffset.x += event.nativeEvent.translationX;
            this._lastOffset.y += event.nativeEvent.translationY;
            this._translateX.setOffset(this._lastOffset.x);
            this._translateX.setValue(0);
            this._translateY.setOffset(this._lastOffset.y);
            this._translateY.setValue(0);
        }
    };
    _onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastScale *= event.nativeEvent.scale;
            /*
            if(this._lastScale > 2)
                this._lastScale = 2;
            if(this._lastScale < 0.5)
                this._lastScale = 0.5;
            */
            this._baseScale.setValue(this._lastScale);
            this._pinchScale.setValue(1);
            this.props.changeScale(this._lastScale);
        }
    };
    render() {
        return (
            <PanGestureHandler
                ref={this.panRef}
                onGestureEvent={this._onGestureEvent}
                onHandlerStateChange={this._onHandlerStateChange}
                maxPointers={1}>
                <Animated.View style={styles.wrapper}>
                    <PinchGestureHandler
                        ref={this.pinchRef}
                        //simultaneousHandlers={this.panRef}
                        onGestureEvent={this._onPinchGestureEvent}
                        onHandlerStateChange={this._onPinchHandlerStateChange}>
                        <Animated.View style={styles.container} collapsable={false}>
                            <Animated.View
                                style={[
                                    styles.pinchableView,
                                    {
                                        transform: [
                                            //{ perspective: 200 },
                                            { scale: this._scale },
                                            { translateX: this._translateX },
                                            { translateY: this._translateY },
                                        ],
                                    },
                                ]}>
                                <Text style={{ fontSize: 13, color: 'white' }}>US Letter Size</Text>
                            </Animated.View>
                        </Animated.View>
                    </PinchGestureHandler>
                </Animated.View>

            </PanGestureHandler>
        );
    }
}

export default PinchableBox;

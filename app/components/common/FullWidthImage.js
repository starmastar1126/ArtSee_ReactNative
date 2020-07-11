import React, { Component } from 'react';
import {Image, View} from "react-native";

export default class FullWidthImage extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0
    };
  }

  _onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;

    if (this.props.ratio) {
      this.setState({
        width: containerWidth,
        height: containerWidth * this.props.ratio
      });
    } else {
      if (this.props.isSource) {
        const {width, height} = Image.resolveAssetSource(this.props.source);

        this.setState({
          width: containerWidth,
          height: containerWidth * height / width
        });
      } else {
        Image.getSize(this.props.source, (width, height) => {
          this.setState({
            width: containerWidth,
            height: containerWidth * height / width
          });
        });
      }
    }
  }

  render() {
    return (
      <View onLayout={this._onLayout.bind(this)}>
        <Image
          source={this.props.isSource ? this.props.source : {uri: this.props.source}}
          style={{
            width: this.state.width,
            height: this.state.height
          }} />
      </View>
    );
  }
}
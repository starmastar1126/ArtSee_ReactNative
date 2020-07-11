import React, { Component } from 'react';
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux'
import {addArtByQrCode} from '../../reducers/art'

class QrCodeScannerScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Scan QR Code',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        marginBottom: -1,
        backgroundColor: 'white'
      },
    }
  }

  onSuccess(e) {
    this.props.addArtByQrCode(e.data)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
      />
    );
  }
}
const mapStateToProps = state => ({
  
})

const mapDispatchToProps = {
  addArtByQrCode
}

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScannerScreen)

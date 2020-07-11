// @flow
import React from 'react'
import { ScrollView, TouchableOpacity, View, Image, ActivityIndicator, Dimensions, Text, Modal, InteractionManager } from 'react-native'
import { connect } from 'react-redux'

import styles from './ArtDetailsStyles'
import AppConfig from '../../config/AppConfig'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { toggleArtFavorite, reserve } from '../../reducers/art'
import call from 'react-native-phone-call'
import Mailer from 'react-native-mail';

const { width, height } = Dimensions.get('window')

const imageWidth = width / 2;
class ArtDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      modalVisible: false,
      artData: props.navigation.getParam('artData') || {}
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }
  addToHandup = () => {
    this.props.navigation.navigate('SelectWall', { art: this.state.artData })
  }
  handleCall = (phoneNumber) => {
    const args = {
      number: phoneNumber, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }

    call(args).catch((error) => console.log('error'))
  }
  handleEmail = (email, artName, author) => {
    Mailer.mail({
      subject: `I'm interested in "${artName}" by ${author} I saw on ArtSee`,
      recipients: [email],
      body: 'I saw this piece on ArtSee and would like to discuss it further. Please contact me at your earliest convenience.',
      isHTML: true,
      attachment: {
        path: '',  // The absolute path of the file from which to read data.
        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        name: '',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
      
    });
  }
  handleReserve = (item) => {
    const { galleryEmail, qrCode, imageName } = item
    this.props.reserve({ contactEmail: galleryEmail, qr: qrCode, artName: imageName })
  }
  render() {
    const artData = this.state.artData;
    if (this.state.loading) {
      return (<ActivityIndicator size="small" color="gray" />);
    }
    return (
      <View style={styles.wrapper}>
        <Modal visible={this.state.modalVisible} transparent={true}>
          <ImageViewer renderIndicator={() => <View />} backgroundColor="rgba(0,0,0,0.9)" imageUrls={[{ url: artData.serverImagePath ? `${AppConfig.siteUrl}${artData.serverImagePath}` : `file://${artData.imagePath}` }]} enableSwipeDown onCancel={() => this.setState({ modalVisible: false })} />
        </Modal>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icon style={styles.icon} name='arrow-back' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon style={styles.icon} name='menu' />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.sectionname}>
            Gallery
          </Text>
          <View style={{ flex: 1, width: '100%' }}>
            <ScrollView>
              {this.state.loading && <ActivityIndicator size="small" color="gray" />}
              <View style={styles.scrollContent}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <View style={{ height: imageWidth, width: imageWidth, borderRadius: 10, overflow: 'hidden', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {artData.imagePath || artData.serverThumbPath
                      ? <Image source={{ uri: artData.serverThumbPath ? `${AppConfig.siteUrl}${artData.serverThumbPath}` : `file://${artData.imagePath}` }} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, resizeMode: 'cover' }} />
                      : null
                    }
                    <TouchableOpacity style={[styles.linkIcon, { backgroundColor: 'rgba(0,0,0,0.3)', padding: 20 }]} onPress={() => { this.setState({ modalVisible: true }) }}>
                      <Icon color="white" size={40} name='search' />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, marginVertical: 20 }}>
                  <TouchableOpacity style={[styles.linkIcon, { backgroundColor: artData.isFavorite ? 'red' : '#CACACA' }]} onPress={() => {
                    this.props.toggleArtFavorite && this.props.toggleArtFavorite(artData.id)
                    this.setState({ artData: { ...artData, isFavorite: !artData.isFavorite } })
                  }}>
                    <Icon color="white" size={15} name='favorite' />
                  </TouchableOpacity>
                  <View style={{ marginLeft: 20 }}>
                    <Text
                      adjustsFontSizeToFit
                      ellipsizeMode="tail"
                      numberOfLines={2}
                      style={[styles.textStyle, { fontSize: 20, color: 'black', textAlignVertical: 'bottom', lineHeight: 25 }]}
                    >
                      {artData.imageName && artData.imageName.toUpperCase()}
                    </Text>

                    {artData.artistName
                      ? <Text adjustsFontSizeToFit style={[styles.textStyle, { fontSize: 16, color: 'gray', marginBottom: 5 }]}>by {artData.artistName}</Text>
                      : null
                    }
                  </View>
                </View>
              </View>
              <View style={styles.panel}>
                {artData.materials
                  ? <Text adjustsFontSizeToFit style={[styles.textStyle, styles.scrollContent, { fontSize: 16, color: 'gray', marginBottom: 5, textAlign: 'center' }]}>{artData.materials}</Text>
                  : null
                }
                {
                  artData.price !== null ? <View style={styles.price}><Ionicons color="black" size={25} name='ios-pricetag' /><Text style={styles.pricelabel}>${artData.price}</Text></View> : null
                }
                <View style={styles.buttonGroup}>
                  {
                    artData.canReserve ?
                      <TouchableOpacity style={styles.contactButton} onPress={() => this.handleReserve(artData)}>
                        <Text style={styles.contactButtonLabel}>Reserve</Text>
                      </TouchableOpacity> : null
                  }
                  <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactButtonLabel} onPress={() => this.handleEmail(artData.galleryEmail, artData.imageName, artData.artistName)}>Message Us</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactButtonLabel} onPress={() => this.handleCall(artData.galleryPhone)}>Call Us</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottomButton}>
          <TouchableOpacity style={styles.newhangupBtn} onPress={() => { this.addToHandup() }}>
            <Text style={styles.newhangupBtnLabel}>New Hangup</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = { toggleArtFavorite, reserve }

export default connect(mapStateToProps, mapDispatchToProps)(ArtDetails)

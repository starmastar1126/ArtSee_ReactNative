import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Button, Platform, Alert } from 'react-native';
import Exif from 'react-native-exif'
import { size, trim, replace } from 'lodash'
//import PESDK from 'photo-editor-sdk-react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FormInput, Icon } from "react-native-elements";
import ImagePicker from 'react-native-image-crop-picker';
import EditCrop from '../../assets/EditCrop.png'
import styles from './ArtCreateStyles'
import DynamicCropper from "react-native-dynamic-cropper";
import RNFetchBlob from 'react-native-fetch-blob'
import { create, update } from '../../reducers/art'
import { connect } from 'react-redux'
import ImageResizer from 'react-native-image-resizer';

class ArtCreateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state

    return {
      title: '',//params && params.update ? 'Edit Artwork' : 'Add Artwork',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        marginBottom: -1,
        backgroundColor: 'white'
      },
      headerRight: null,
      headerBackTitleStyle: {
        color: 'black',
      },
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',
    } || { header: false }
  }

  state = {
    showEditor: false,
    photoSource: null,
    width: '',
    height: '',
    title: '',
    artistName: '',
    imageDescription: '',
    yearProduced: '',
    materials: '',
    price: '',
    expoName: '',
    expoYear: '',
    expoBooth: '',
    galleryName: '',
    galleryContactPerson: '',
    galleryStreet1: '',
    galleryStreet2: '',
    galleryCity: '',
    galleryState: '',
    galleryZipCode: '',
    galleryPhone: '',
    galleryEmail: '',
    disabled: true,
    chainlink: true
  }

  constructor() {
    super()
  }

  validate = () => {
    const { width, height, imageName, photoSource } = this.state
    const { params } = this.props.navigation && this.props.navigation.state
    const item = params && params.item
    let disabled = true

    if (parseFloat(width) > 0 && parseFloat(height) > 0 && photoSource) {
      disabled = false
    }
    this.setState({ disabled });
  }

  update = () => {
    this.props.update({ ...this.state }, this.state.photoSource, () => {
      this.props.navigation.popToTop()
    })
  }

  submit = () => {
    const { width, height } = this.state;
    const pixelWidth = this.state.photoSource.width;
    const pixelHeight = this.state.photoSource.height;

    const originRatio = pixelWidth / pixelHeight;
    const newRatio = parseFloat(width) / parseFloat(height);

    if (Math.abs(originRatio - newRatio) > 0.01) {
      this.handleCrop(false, 300, 300 / newRatio)
    } else {
      this.props.create({ ...this.state }, this.state.photoSource)
      this.props.navigation.goBack()
    }
  }

  handleChangeText = (name) => (value) => {
    if (!this.state.chainlink) {
      console.log(name, value);
      this.setState({ [name]: isNaN(value) ? 0 : value }, () => {
        this.validate()
      });
      return;
    }

    const newState = { [name]: isNaN(value) ? 0 : value }
    const photoSource = this.state.photoSource
    const k = photoSource ? photoSource.height / photoSource.width : 1


    if (name === 'width') {
      newState['height'] = parseFloat(value) > 0 ? `${k * parseFloat(value)}` : ''
    }

    if (name === 'height') {
      newState['width'] = k > 0 && parseFloat(value) > 0 ? `${parseFloat(value) / k}` : ''
    }

    this.setState(newState, () => {
      this.validate()
    })
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('ArtDetail', { item: item })
  }

  handleCrop = (freeStyle = true, width = 300, height = 400) => {

    const { photoSource, imagePath } = this.state
    let path = photoSource ?
      (Platform.OS === 'ios' ? photoSource.uri : (photoSource.path ? `file://${photoSource.path}` : photoSource.uri))
      : `file://${imagePath}`
    if (Platform.OS === 'ios') {
      DynamicCropper.cropImage(path.replace('file://', ''),
        {

        })
        .then(newlyCroppedImagePath => {
          Image.getSize(newlyCroppedImagePath, (width, height) => {
            RNFetchBlob.fs.unlink(path)
              .then(() => {
                RNFetchBlob.fs.mv(newlyCroppedImagePath, path)
                  .then((res) => {
                    this.setState({ photoSource: { uri: path, width, height } }, () => {
                      this.handleChangeText('width')(this.state.width)
                    })
                  })
                  .catch((error) => {
                    console.log('move file error', error)
                  })
              })
              .catch((err) => {
                RNFetchBlob.fs.mv(newlyCroppedImagePath, path)
                  .then((res) => {
                    this.setState({ photoSource: { uri: path, width, height } }, () => {
                      this.handleChangeText('width')(this.state.width)
                    })
                  })
                  .catch((error) => {
                    console.log('move file error', error)
                  })
              })

          }, (error) => {
            console.error(`Couldn't get the image size: ${error.message}`);
          });
        }
        );
    } else {
      ImagePicker.openCropper({
        // path: `file://${photoSource.path}`,
        path: path,//Platform.OS === 'ios' ? photoSource.uri : `file://${photoSource.path}`,
        width: width ? width : 300,
        height: height ? height : 400,
        freeStyleCropEnabled: freeStyle
      }).then(image => {
        if (freeStyle) {
          this.setState({ photoSource: { uri: image.path, width: image.width, height: image.height } }, () => {
            this.handleChangeText('width')(this.state.width)
          })
        } else {
          this.props.create({ ...this.state }, { uri: image.path, width: image.width, height: image.height })
          this.props.navigation.goBack()
        }
      });
    }

  }



  componentWillMount() {
    const photoSource = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.photoSource || null;
    const item = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.item || null;

    const data = item ? { ...item, photoSource } : { photoSource }
    this.setState({ ...data })
    console.log('photoSource will mount ', data)
  }

  render() {
    const { photoSource, imagePath } = this.state

    const path = photoSource ?
      (Platform.OS === 'ios' ? photoSource.uri : (photoSource.path ? `file://${photoSource.path}` : photoSource.uri))
      : `file://${imagePath}`
    Exif.getExif(path)
      .then(msg => { })
      .catch(msg => console.warn('ERROR: ' + msg))

    const { params } = this.props.navigation;
    const title = params && params.update ? 'Edit Artwork' : 'Add Artwork';

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView scrollEnables={false} style={styles.container}>
          <Text style={styles.sectionname}>
            {title}
          </Text>
          <View style={{ height: 250, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 16, marginBottom: 8 }}>
            <Image
              source={photoSource ? photoSource : { uri: `file://${imagePath}` }}
              style={{ width: 400, height: 250, resizeMode: 'contain' }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 8 }}>
            <FormInput
              underlineColorAndroid='transparent'
              containerStyle={styles.containerStyle}
              inputStyle={[styles.inputStyle, { textAlign: 'center', width: 60 }]}
              keyboardType="numeric"
              placeholder="W"
              value={`${Math.round(this.state.width * 100) / 100}`}
              onChangeText={this.handleChangeText('width')}
            />
            <View>
              <Text style={{ lineHeight: 25, textAlign: 'center' }}> x </Text>
              <Icon name={'link-variant'} type='material-community' color={this.state.chainlink ? "black" : "gray"} size={20} onPress={() => {
                if (!this.state.chainlink) {
                  this.handleChangeText('width')(this.state.width)
                }
                this.setState({ chainlink: !this.state.chainlink });
              }} />
            </View>
            <FormInput
              underlineColorAndroid='transparent'
              containerStyle={styles.containerStyle}
              inputStyle={[styles.inputStyle, { textAlign: 'center', width: 60 }]}
              keyboardType="numeric"
              placeholder="H"
              value={`${Math.round(this.state.height * 100) / 100}`}
              onChangeText={this.handleChangeText('height')}
            />
            <TouchableOpacity onPress={()=>{this.handleCrop()}} style={{ marginBottom: 10 }}>
              <Image source={EditCrop} />
            </TouchableOpacity>
          </View>

          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Title"
            value={this.state.imageName}
            onChangeText={this.handleChangeText('imageName')}
          />

          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Artist Name"
            value={this.state.artistName}
            onChangeText={this.handleChangeText('artistName')}
          />

          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={[styles.containerStyle, { height: 120 }]}
            placeholder="Description"
            multiline
            numberOfLines={8}
            inputStyle={[styles.inputStyle]}
            value={this.state.imageDescription}
            onChangeText={this.handleChangeText('imageDescription')}
          />

          <Text style={styles.subTitle}>Additional Information</Text>
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            keyboardType="numeric"
            placeholder="Year Produced"
            value={`${this.state.yearProduced}`}
            onChangeText={this.handleChangeText('yearProduced')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Materials"
            value={this.state.materials}
            onChangeText={this.handleChangeText('materials')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            keyboardType="numeric"
            placeholder="Price"
            value={`${this.state.price}`}
            onChangeText={this.handleChangeText('price')}
          />
          {/*
          <Text style={styles.subTitle}>Expo Information</Text>
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Expo Name"
            value={this.state.expoName}
            onChangeText={this.handleChangeText('expoName')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            keyboardType="numeric"
            placeholder="Expo Year"
            value={`${this.state.expoYear}`}
            onChangeText={this.handleChangeText('expoYear')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Expo Booth"
            value={this.state.expoBooth}
            onChangeText={this.handleChangeText('expoBooth')}
          />
          */}
          <Text style={styles.subTitle}>Gallery Information</Text>
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Gallery Name"
            value={this.state.galleryName}
            onChangeText={this.handleChangeText('galleryName')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Gallery Contact Person"
            value={this.state.galleryContactPerson}
            onChangeText={this.handleChangeText('galleryContactPerson')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Street 1"
            value={this.state.galleryStreet1}
            onChangeText={this.handleChangeText('galleryStreet1')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Street 2"
            value={this.state.galleryStreet2}
            onChangeText={this.handleChangeText('galleryStreet2')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="City"
            value={this.state.galleryCity}
            onChangeText={this.handleChangeText('galleryCity')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="State"
            value={this.state.galleryState}
            onChangeText={this.handleChangeText('galleryState')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            placeholder="Postal Code"
            value={this.state.galleryZipCode}
            onChangeText={this.handleChangeText('galleryZipCode')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={styles.containerStyle}
            inputStyle={[styles.inputStyle]}
            keyboardType="phone-pad"
            placeholder="Phone Number"
            value={this.state.galleryPhone}
            onChangeText={this.handleChangeText('galleryPhone')}
          />
          <FormInput
            underlineColorAndroid='transparent'
            containerStyle={[styles.containerStyle, { marginBottom: 16 }]}
            inputStyle={[styles.inputStyle]}
            keyboardType="email-address"
            placeholder="Email Address"
            value={this.state.galleryEmail}
            onChangeText={this.handleChangeText('galleryEmail')}
          />
          <View style={styles.bottomButton}>
            <TouchableOpacity style={[styles.confirmBtn, this.state.disabled && { backgroundColor: 'gray' }]}
              activeOpacity={!this.state.disabled ? 1 : 0.2}
              onPress={() => {
                if (this.state.disabled)
                  return;
                params && params.update ? this.update() : this.submit()
              }}>
              <Text style={styles.confirmBtnLabel}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}


const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  create,
  update
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtCreateScreen)
// @flow
import React from 'react'
import { Text, TouchableOpacity, View, Image, Dimensions, PixelRatio } from 'react-native'
import { connect } from 'react-redux'

import styles from './AddModalStyles'
import AppConfig from '../../config/AppConfig'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const window = Dimensions.get('window')
const ratio = PixelRatio.get()
const options = {
    mediaType: 'photo',
    maxWidth: ratio * window.width * 0.8,
    maxHeight: ratio * window.height * 0.8,
    quality: 1,
    noData: true,
    waitUntilSaved: true,
    cameraRoll: true,
    // allowsEditing: true
};

class AddModal extends React.Component {
    onProcessImage(response) {

        // Alert.alert('Response', JSON.stringify(response))
        if (response.didCancel) {

        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            if (this.props.type === 'Art') {
                const { error, uri, originalRotation } = response

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                if (uri && !error) {
                    let rotation = 0

                    if (originalRotation === 90) {
                        rotation = 0
                    } else if (originalRotation === 270) {
                        rotation = 0
                    }

                    ImageResizer.createResizedImage(uri, response.width, response.height, "JPEG", 80, rotation).
                        then(({ uri }) => {
                            this.props.navigation.navigate('ArtCreate', { photoSource: { ...response, uri } });
                        }).catch(err => {
                            console.log(err)
                            return Alert.alert('Unable to resize the photo', 'Please try again!')
                        })
                }
            } else { //Add Wall
                let source = { ...response };
                this.props.navigation.navigate('WallResize', { photoSource: source });
            }
        }
    }
    render() {
        const { isVisible, onClose, type } = this.props;

        return (
            <Modal isVisible={isVisible} style={{ justifyContent: 'flex-end', margin: 0 }} onBackdropPress={() => onClose && onClose()}>
                <View style={{ backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <TouchableOpacity style={styles.pickerItem}
                        onPress={async () => {
                            onClose && onClose();
                            setTimeout(() => {
                                ImagePicker.launchCamera(options, (response) => {
                                    this.onProcessImage(response);
                                });
                            }, 500)
                        }}
                    >
                        <Text style={styles.pickerLabel}>
                            Take {type} Photo
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pickerItem}
                        onPress={async () => {
                            onClose && onClose();
                            setTimeout(() => {
                                ImagePicker.launchImageLibrary(options, (response) => {
                                    this.onProcessImage(response);
                                });
                            }, 500)
                        }}>
                        <Text style={styles.pickerLabel}>
                            Choose from Camera Roll
                            </Text>
                    </TouchableOpacity>
                    {
                        type == 'Art' &&
                        <TouchableOpacity style={styles.pickerItem}
                            onPress={() => {
                                onClose && onClose();
                                this.props.navigation.navigate('GalleryDirectory', { type: 'add' });
                            }}>
                            <Text style={styles.pickerLabel}>
                                Add {type} from ArtSee Library
                            </Text>
                        </TouchableOpacity>
                    }
                    {
                        type == 'Art' &&
                        <TouchableOpacity style={styles.pickerItem}
                            onPress={() => {
                                onClose && onClose();
                                this.props.navigation.navigate('QrCodeScanner');
                            }}>
                            <Text style={styles.pickerLabel}>
                                Scan QR Code
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)
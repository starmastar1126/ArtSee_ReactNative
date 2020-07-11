import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Button, Alert, ActivityIndicator, TouchableWithoutFeedback, Dimensions
} from 'react-native';
import { connect } from 'react-redux'
import { map, size } from 'lodash'
import realm from '@store/realm';

import StandaloneInfo from "../../assets/StandaloneInfo.png"
import StandaloneAdd from "../../assets/StandaloneAdd.png"
import FullWidthImage from "../../components/common/FullWidthImage";
import DragArtItem from "../../components/DragArtItem/DragArtItem";
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import ViewShot from "react-native-view-shot";

import styles from './HangupEditStyles'
import { setXY, rotate, deleteArt, save, setFrame } from '../../reducers/hangup'

let Window = Dimensions.get('window');
const artPadding = 21

class HangupEditScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: null,
      headerRight: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        marginBottom: -1,
        backgroundColor: 'white'
      },
      headerBackTitleStyle: {
        color: 'black',
      },
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',
    }
  }

  constructor(props) {
    super(props)
  }

  state = {
    show: true,
    activeArtId: null,
    showHint: true,
    isVisibleDelete: false,
    deleteArt: null,
    hiddenAddBtn: false
  }

  onChange = (name, changes) => {
    this.forceUpdate();
  }

  // onFocus = () => {
  //   console.log('Hangup Edit focus');
  //   this.refreshData()
  //   this.forceUpdate();
  // }

  handleInfo = (item) => {
    this.handleBlur()
    this.props.navigation.navigate('HangupArtList', { item: item })
  }

  handleAddArt = (item) => {
    this.handleBlur()
    this.props.navigation.navigate('SelectArt', { wall: item.wall, updateId: item.id })
  }


  handleDelete = (id, artId) => {
    this.setState({ isVisibleDelete: true, deleteArt: { id, artId } });
  }

  handleRotateForward = (id, artId) => {
    this.props.rotate(id, artId, 90, () => {
      this.handleSaveImage(id, artId)
    })
  }

  handleRotateBack = (id, artId) => {
    this.props.rotate(id, artId, -90, () => {
      this.handleSaveImage(id, artId)
    })
  }

  handleSaveImage = (id, artId, x = null, y = null) => {
    const imageContainer = { x: this.state.x, y: this.state.y, width: this.state.width, height: this.state.height }

    this.setState({ show: false }, () => {
      this.props.setXY(id, artId,
        x, y,
        imageContainer, this.refs['full'], (res) => {
          this.setState({ show: true })
        })
    })
  }
  handleDrag = (_value, id, art) => {
    const imageContainer = { x: this.state.x, y: this.state.y, width: this.state.width, height: this.state.height }
    this.setState({ show: false }, () => {
      this.props.setXY(id, art.id,
        _value.x + artPadding - (this.state.x + this.state.width / 2), _value.y + artPadding - (this.state.y + this.state.height / 2),
        imageContainer, this.refs['full'], (res) => {
          this.setState({ show: true })
        })
    })

  }

  handleFocus = (id) => {

    this.setState({ activeArtId: id })
  }

  handleBlur = () => {
    this.setState({ activeArtId: null })
  }

  refreshData = () => {
    const item = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.item || {};

    if (item) {
      //this.data_source = realm.objects('hangups').filtered(`id = "${item.id}"`);
      //this.data_source.addListener(this.onChange);
    }
  }

  componentWillMount() {
    this.refreshData()
  }

  componentWillUnmount() {
    // this.willFocusSubscription.remove()
  }

  render() {

    const item = this.props.hangup;
    if (!item) {
      return (<ActivityIndicator size="small" color="gray" />);
    }
    const imageSource = item && item.wall && parseInt(item.wall.imagePath)

    return (
      <View style={{ flex: 1 }}>
        <DeleteModal
          text={`Are you sure you want to delete?`}
          confirmtext={'Artwork has been successfully deleted!'}
          isVisible={this.state.isVisibleDelete}
          onClose={() => this.setState({ isVisibleDelete: false })}
          onDelete={(callback) => {
            this.props.deleteArt(this.state.deleteArt.id, this.state.deleteArt.artId, () => {
              this.handleSaveImage(this.state.deleteArt.id, this.state.deleteArt.artId)
              this.setState({ isVisibleDelete: false })
            })
          }} />

        <TouchableWithoutFeedback onPress={() => this.handleBlur()}>
          <View style={styles.container} ref="full">
            <View style={{ width: '100%', justifyContent: 'flex-start'}}>
              <Text style={styles.sectionname}>
                Hangup
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ViewShot ref="viewShot" style={{ alignSelf: 'stretch'}}>
                <View
                  onLayout={(event) => {
                    return this.setState({
                      x: event.nativeEvent.layout.x,
                      y: event.nativeEvent.layout.y,
                      width: event.nativeEvent.layout.width,
                      height: event.nativeEvent.layout.height
                    }, () => {

                      // if (item && !item.imagePath && item.arts && item.arts[0]) {
                      //     this.handleSaveImage(item.id, item.arts[0].id, 0, 148)
                      // }
                    })
                  }}
                >
                  {(item && item.wall && item.wall.imagePath) || imageSource
                    ? <FullWidthImage isSource={imageSource > 0} source={imageSource > 0 ? imageSource : item && item.wall && `file://${item.wall.imagePath}`} />
                    : null
                  }
                  {
                    !this.state.hiddenAddBtn ?
                      <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }} onPress={() => this.handleAddArt(item)}>
                        <View style={{ backgroundColor: '#282F37', padding: 5, borderRadius: 50 }}>
                          <Icon name="add" size={25} color="white" />
                        </View>
                      </TouchableOpacity> : null
                  }
                </View>

                {this.state.width && this.state.height ?
                  item && item.arts && map(item.arts.slice(), (art, index) => {
                    const k = item.wall.width / art.width
                    const k2 = Window.width / item.wall.pixelWidth
                    let scaleWidth = k2 * item.wall.pixelWidth / k
                    let scaleHeight = art.pixelHeight * scaleWidth / art.pixelWidth

                    let frameWidth = 0;
                    let frameHeight = 0;
                    if (item.frame && item.frame.id) {
                      frameWidth = item.frame.pixel_width * (scaleWidth / item.frame.width)
                      frameHeight = item.frame.pixel_width * (scaleHeight / item.frame.height);
                    }

                    return (
                      <DragArtItem
                        key={art.id}
                        active={this.state.activeArtId === art.id}
                        show={this.state.show}
                        imagePath={art.imagePath}
                        reverse={false}
                        // offsetX={Window.width / 2 + art.x - artPadding}
                        offsetX={this.state.x + this.state.width / 2 + art.x - artPadding}
                        // offsetY={Window.height / 2 + art.y - artPadding}
                        offsetY={this.state.y + this.state.height / 2 + art.y - artPadding}
                        rotate={art.rotation}
                        width={scaleWidth}
                        height={scaleHeight}
                        innerWidth={scaleWidth - 2 * frameWidth}
                        innerHeight={scaleHeight - 2 * frameHeight}
                        onDrag={(state2) => this.handleDrag(state2, item.id, art)}
                        onFocus={() => this.handleFocus(art.id)}
                        onDelete={() => this.handleDelete(item.id, art.id)}
                        onRotateForward={() => this.handleRotateForward(item.id, art.id)}
                        onRotateBack={() => this.handleRotateBack(item.id, art.id)}
                        frame={item.frame}
                      />
                    )
                  })
                  : null
                }
              </ViewShot>
            </View>
            {
              this.state.showHint &&
              <View style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', position: 'absolute', bottom: 0, padding: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => this.setState({ showHint: false })}>
                    <View style={{ backgroundColor: '#282F37', padding: 5, borderRadius: 50 }}>
                      <Icon name="close" size={25} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Use your finger to move the art and the arrows to rotate it</Text>
                  </View>
                </View>
              </View>
            }
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.bottomButton}>
          <View>
            <TouchableOpacity
              style={styles.inactiveBtn}
              onPress={() => {
                if (item.frame && item.frame.id) {
                  this.props.setFrame(null);
                }
                else this.props.navigation.navigate('SelectFrame');
              }}>
              <Text style={styles.inactiveBtnLabel}>{item.frame && item.frame.id ? "Delete a Frame" : "Add a Frame"}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.activeBtn}
              onPress={() => {
                this.setState({ hiddenAddBtn: true, activeArtId: null }, () => {
                  setTimeout(() => {
                    this.refs.viewShot.capture().then(uri => {
                      console.log("capture snapshot with ", uri);
                      this.props.save(uri)
                      this.props.navigation.goBack();
                    }).catch(err =>{
                      this.setState({hiddenAddBtn: false});
                    })
                  }, 200)
                })
              }}>
              <Text style={styles.activeBtnLabel}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  hangup: state.hangup.hangup
})

const mapDispatchToProps = {
  setXY,
  rotate,
  deleteArt,
  save,
  setFrame
}

export default connect(mapStateToProps, mapDispatchToProps)(HangupEditScreen)
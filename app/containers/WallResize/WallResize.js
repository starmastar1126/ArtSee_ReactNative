import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList, Image, ScrollView, Button, Modal } from 'react-native';
import { ButtonGroup, Icon } from "react-native-elements";
import CalibrationMode from '../../assets/CalibrationMode.png'
import CalibrationModeWhite from '../../assets/CalibrationModeWhite.png'
import RetouchWall from '../../assets/RetouchWall.png'
import RetouchWallWhite from '../../assets/RetouchWallWhite.png'
import Help_Drag from '../../assets/Help_Drag.png'
import Help_Pinch from '../../assets/Help_Pinch.png'
import DrawerAbout from '../../assets/DrawerAbout.png'
import PinchableBox from "../../components/PinchableBox/PinchableBox";
import styles from './WallResizeStyles'

const letter = { width: 11, height: 8.5 }

class WallResize extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        marginBottom: -1,
        backgroundColor: 'black'
      },
      // headerLeft: backButton(navigation),
      headerLeft: <Icon
        name={'close'}
        type='fontawesome'
        color={'white'}
        size={25}
        iconStyle={{ paddingLeft: 16 }}
        onPress={() => {
          navigation.goBack()
          // navigation.state.params.onSelect({ backRoute: 'wallResize' });
        }}
      />,
      headerRight: null
    }
  }

  state = {
    width: 0,
    height: 0,
    tab: 0,
    showInfo: false,
    scale: 1,
    showHint: true
  }

  constructor(props) {
    super(props)
  }

  onNavPress = (newTab, force = true) => {
    const { tab } = this.state
    if (tab === newTab && !force) return

    this.setState({ tab: newTab, prevTab: this.state.tab })
  }

  handleResize = (event, styles) => {

    const scale = styles && styles.transform && styles.transform[0] && styles.transform[0].scale || 1
    const width = letter.width * this.state.width / 110 / scale
    

    this.setState({ scale })
  }

  handleInfo = () => {
    this.setState({ showInfo: !this.state.showInfo })
  }

  submit = () => {
    const { scale } = this.state
    const photoSource = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.photoSource || null;
    const width = letter.width * this.state.width / 110 / scale
    const height = letter.height * this.state.height / 110 / scale
    this.props.navigation.navigate('WallCreate', { photoSource, width, height, scale: height / width });
  }

  componentWillMount() {
    const { params } = this.props.navigation && this.props.navigation.state

    this.props.navigation.setParams({ handleInfo: this.handleInfo });
  }

  renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showInfo}
        onRequestClose={() => {
          this.handleInfo()
        }}
      >
        <TouchableWithoutFeedback onPress={this.handleInfo}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <Image source={Help_Pinch} />
            <Text style={styles.infoText}>Pinch to resize and match the size of the sheet on the wall.</Text>
            <Image source={Help_Drag} />
            <Text style={styles.infoText}>Drag to move.</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  render() {
    const { params } = this.props.navigation && this.props.navigation.state
    // const item = params && params.item
    // const imageSource = item && parseInt(item.imagePath)
    const photoSource = params && params.photoSource || null;
    const component1 = () => this.state.tab === 0 ? <Image source={CalibrationModeWhite} /> : <Image source={CalibrationMode} />
    const component2 = () => this.state.tab === 1 ? <Image source={RetouchWallWhite} /> : <Image source={RetouchWall} />
    const width = this.state.scale * letter.width * 10
    const height = this.state.scale * letter.height * 10
    
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}
          onLayout={(event) => {
            return this.setState({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height
            })
          }}
        >
          <Image source={photoSource} style={{ position: 'absolute', width: this.state.width, height: this.state.height, resizeMode: 'contain' }} />
          {this.state.width
            ? (
              <PinchableBox
                initLeft={(this.state.width - width) / 2}
                initTop={(this.state.height - height) / 2}
                changeScale={(scale) => this.setState({ scale })}
              />
            )
            : null
          }
          {
              this.state.showHint &&
              <View style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.3)', position: 'absolute', bottom: 0, padding: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={()=>this.setState({showHint: false})}>
                    <View style={{ backgroundColor: '#2D2D2D', padding: 3, borderRadius: 50 }}>
                      <Icon name="close" size={23} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ color: 'white', fontSize: 13 }}>Stick a normal letter sized piece of paper on your wall. Then, overlap this US letter shape to match the paper you just stuck on the wall. Pinch with two fingers to make it larger or smaller. This is how we determine the wall size based on your camera ratio</Text>
                  </View>
                </View>
              </View>
            }
        </View>
        {/*
        <View style={styles.bottomBar}>
          <View style={{flex: 1, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <ButtonGroup
              onPress={this.onNavPress}
              selectedIndex={this.state.tab}
              buttons={[{ element: component1 }, { element: component2 }]}
              containerStyle={styles.buttonStyle}
              buttonStyle={{backgroundColor: '#fff'}}
              textStyle={{color: '#000'}}
              innerBorderStyle={{color: '#000'}}
              selectedButtonStyle={{backgroundColor: '#000'}}
              selectedTextStyle={{color: '#fff'}}
            />
          </View>
        </View>
        */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.confirmBtn} onPress={() => {this.submit()}}>
            <Text style={styles.confirmBtnLabel}>Add</Text>
          </TouchableOpacity>
        </View>
        {
          this.renderModal()
        }
      </View>
    );
  }
}


//make this component available to the app
export default WallResize;

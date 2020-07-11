// @flow
import React from 'react'
import { Image, ActivityIndicator, FlatList, TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import s from './SelectFrameStyles'

import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons'
import AppConfig from '../../config/AppConfig'
import { getFrames } from '../../reducers/frame'
import { setFrame } from '../../reducers/hangup'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
const { width, height } = Dimensions.get('window')

const framepattern = [
  { "id": 26, "name": "1", "image": "\/media\/29\/-1.png", "height": 1880, "width": 1563, "pixel_width": 218 },
  { "id": 27, "name": "2", "image": "\/media\/30\/-2.png", "height": 700, "width": 606, "pixel_width": 120 },
  { "id": 28, "name": "3", "image": "\/media\/31\/-3.png", "height": 534, "width": 722, "pixel_width": 75 },
  { "id": 29, "name": "4", "image": "\/media\/32\/-4.png", "height": 720, "width": 960, "pixel_width": 65 },
  { "id": 30, "name": "5", "image": "\/media\/33\/-5.png", "height": 983, "width": 791, "pixel_width": 117 },
  { "id": 31, "name": "6", "image": "\/media\/34\/-6.png", "height": 918, "width": 700, "pixel_width": 62 },
  { "id": 32, "name": "7", "image": "\/media\/35\/-7.png", "height": 444, "width": 650, "pixel_width": 44 },
  { "id": 33, "name": "8", "image": "\/media\/36\/-8.png", "height": 615, "width": 615, "pixel_width": 91 },
  { "id": 34, "name": "9", "image": "\/media\/37\/-9.png", "height": 1000, "width": 764, "pixel_width": 19 },
  { "id": 35, "name": "10", "image": "\/media\/38\/-10.png", "height": 1000, "width": 826, "pixel_width": 67 }
];

class SelectFrame extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentWillMount() {
    this.setState({ loading: true });
    this.props.getFrames(() => {
      this.setState({ loading: false });
    });
  }
  renderFrameItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1 / 3, paddingVertical: 10, paddingHorizontal: 10 }}
        onPress={() => {
          const findframe = framepattern.find(frame => frame.id == item.id)
          if (findframe) {
            this.props.setFrame({ ...findframe, name: item.name});
            this.props.navigation.goBack();
          } else {
            alert("The frame have no pixel width.");
          }
        }}
      >
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
          <Image
            source={{ uri: `${AppConfig.siteUrl}${item.image}` }}
            style={{
              width: '100%',
              height: width / 3,
              resizeMode: 'contain'
            }} />
          <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#282F37', padding: 5, borderRadius: 50 }}>
              <Icon name="add" size={25} color="white" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { frames } = this.props;

    return (
      <View style={s.wrapper}>
        <View style={s.header}>
          <TouchableOpacity
            style={s.iconWrapper}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <MaterialIcon style={s.icon} name='arrow-back' />
          </TouchableOpacity>
          <View>
            {/*
              <TouchableOpacity
                style={s.iconWrapper}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon style={s.icon} name='menu' />
              </TouchableOpacity>
            */}
          </View>
        </View>
        <View style={s.container}>
          <Text style={s.sectionname}>
            ArtSee Frame Library
          </Text>
        </View>
        <View style={s.content}>
          {
            this.state.loading &&
            <ActivityIndicator size="small" color="gray" style={{ marginTop: 10 }} />
          }
          <FlatList
            style={{ flex: 1, width: '100%' }}
            keyExtractor={(item) => `${item.id}`}
            data={frames ? frames : []}
            renderItem={this.renderFrameItem}
            numColumns={3}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  frames: state.frame.frames
})

const mapDispatchToProps = {
  getFrames,
  setFrame
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFrame)

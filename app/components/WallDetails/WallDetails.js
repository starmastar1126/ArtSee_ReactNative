// @flow
import React from 'react'
import { ScrollView, TouchableOpacity, View, Image, ActivityIndicator, Dimensions, Text, Modal, InteractionManager } from 'react-native'
import { connect } from 'react-redux'

import styles from './WallDetailsStyles'
import AppConfig from '../../config/AppConfig'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddModal from '../AddModal/AddModal'

const { width, height } = Dimensions.get('window')


class WallDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      modalVisible: false
    }
  }
  addToHandup = () => {
    const wallData = this.props.navigation.getParam('wallData');
    this.props.navigation.navigate('SelectArt', { wall: wallData })
  }
  render() {
    const wallData = this.props.navigation.getParam('wallData');

    const imageSource = parseInt(wallData.imagePath)
    return (
      <View style={styles.wrapper}>
        <AddModal
          {...this.props}
          type='Art'
          isVisible={this.state.modalVisible}
          onClose={() => this.setState({ modalVisible: false })}
        />
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
            Hangup
          </Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {imageSource > 0
              ? <Image source={imageSource > 0 ? imageSource : { uri: `file://${wallData.imagePath}` }} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '100%', height: '100%', resizeMode: 'contain' }} />
              : null
            }
            <View style={styles.buttonwrap}>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonwrap}
                  onPress={() => {
                    //this.setState({modalVisible: true})
                    this.addToHandup();
                  }}>
                  <Icon color="white" size={25} name={'add'} style={styles.linkIcon} />
                </TouchableOpacity>
                <Text style={styles.btnLabel}>Add Artwork</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(WallDetails)

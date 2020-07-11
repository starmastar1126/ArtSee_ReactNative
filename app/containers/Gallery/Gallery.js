// @flow
import React from 'react'
import { Image, ImageBackground, FlatList, TouchableOpacity, View, Text, InteractionManager, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import s from './GalleryStyles'


import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { getGalleryList } from '../../reducers/gallery'
import ExpanableList from 'react-native-expandable-section-flatlist';
import ArtList from '../../components/ArtList/ArtList'
import ArtDetails from '../../components/ArtDetails/ArtDetails'
import { getArtistList, addArt } from '../../reducers/art'

class Gallery extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        marginBottom: -1,
        backgroundColor: '#FBFBFB'
      },
      headerBackTitleStyle: {
        color: 'black',
      },
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',
    };
  };
  state = {
    loading: false,
    mode: 'gallery',
    galleryID: null,
    galleryName: null,
    artistlist: null,
    artData: null,
    message: null
  }
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this._renderSection = this._renderSection.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.navigation.isFocused();
  }
  componentWillMount() {
    this.setState({ loading: true });
    InteractionManager.runAfterInteractions(() => {
      this.props.getGalleryList((res) => {
        this.setState({ loading: !res });
      });
    });
  }
  componentWillUnmount() {

  }
  _renderRow(rowItem, rowId, sectionId) {
    const { mode } = this.state;
    return (
      <TouchableOpacity
        style={s.rowItem}
        onPress={() => {
          if (mode === 'gallery') {
            this.setState({ mode: 'artistlist', galleryID: rowItem.galleryID, galleryName: rowItem.galleryName, loading: true })
            this.props.getArtistList(rowItem.galleryID, (res) => {
              this.setState({ loading: !res });
            })
          } else {
            this.setState({ mode: 'artistItem', artistlist: rowItem })
          }
        }}>
        <Text style={s.itemTitle}>{mode === 'gallery' ? rowItem.galleryName || rowId : rowItem.artistName || rowId}</Text>
        <View style={s.linkIcon}>
          <Icon color="white" size={25} name='chevron-right' />
        </View>
      </TouchableOpacity>
    );
  }
  _renderSection(section, sectionId) {
    return (
      <View style={s.sectionItem}>
        <Text style={s.sectionTitle}>{section}</Text>
      </View>
    );
  };

  render() {
    const { galleryDirectory, artistList, navigation } = this.props;
    const { galleryID, galleryName, mode, loading, artistlist, artData, message } = this.state;

    const { params } = navigation.state;
    const type = params && params.type;

    
    return (
      <View style={s.wrapper}>
        {
          type == 'add' ? null :
            <View style={s.header}>
              {
                mode === 'gallery' ?
                  <View /> :
                  <TouchableOpacity
                    style={s.iconWrapper}
                    onPress={() => {
                      let newmode = 'gallery';
                      switch (mode) {
                        case 'artistlist': {
                          newmode = 'gallery';
                          break;
                        }
                        case 'artistItem': {
                          newmode = 'artistlist';
                          break;
                        }
                        case 'artdetails': {
                          newmode = 'artistItem';
                          break;
                        }
                      }
                      this.setState({ mode: newmode });
                    }}
                  >
                    <Icon style={s.icon} name='arrow-back' />
                  </TouchableOpacity>
              }
              <TouchableOpacity
                style={s.iconWrapper}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon style={s.icon} name='menu' />
              </TouchableOpacity>
            </View>
        }
        <View style={s.container}>
          <Text style={s.sectionname}>
            Gallery
          </Text>
          {
            (mode === 'gallery' || mode === 'artistlist') ?
              <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {loading && <ActivityIndicator size="small" color="gray" />}
                <ExpanableList
                  key={mode}
                  style={{ flex: 1, width: '100%' }}
                  dataSource={mode === 'gallery' ? galleryDirectory : artistList}
                  headerKey="sectionTitle"
                  memberKey="items"
                  renderRow={this._renderRow}
                  renderSectionHeaderX={this._renderSection}
                  openOptions={Array.from(Array(200), (x, i) => i)}
                />
              </View> : null
          }
          {
            message && (mode === 'artistItem') ?
              <View style={s.msgcontent}>
                <View style={s.msgiconWrap}>
                  <Icon name='check' color="#282F37" size={20} />
                </View>
                <Text style={s.msgtext}>{message}</Text>
              </View> : null
          }
          {
            (mode === 'artistItem') ?
              <ArtList key={galleryID + ''} galleryID={galleryID} artistlist={artistlist} type={type}
                onLink={(artData) => {
                  if (type == 'add') {
                    if (this.state.loading) return;

                    this.setState({ loading: true, message: null });
                    this.props.addArt(artData, () => {
                      this.setState({ loading: false, message: 'Artwork has been successfully added to your Library!' });
                    })
                  }
                  else this.props.navigation.navigate('ArtDetails', { artData, type })
                }} /> : null
          }
          {
            (mode === 'artdetails') ?
              <ArtDetails key={artData && artData.qrCode} artData={artData} /> : null
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  galleryDirectory: state.gallery.galleryDirectory,
  artistList: state.art.artistList
})

const mapDispatchToProps = {
  getGalleryList,
  getArtistList,
  addArt
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)

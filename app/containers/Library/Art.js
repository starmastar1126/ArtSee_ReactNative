// @flow
import React from 'react'
import { Image, ImageBackground, FlatList, Dimensions, TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import s from './LibraryStyles'


import AppConfig from '../../config/AppConfig';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import ArtItem from '../../components/ArtItem/ArtItem'
import { toggleArtFavorite } from '../../reducers/art'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import AddModal from '../../components/AddModal/AddModal'

class Art extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisibleDelete: false,
      isVisibleAdd: false,
      deleteArt: null
    }
  }

  handleFavorite = (id) => {
    this.props.toggleArtFavorite(id)
  }
  renderArt = ({ item, index }) => {
    const art = item || {}
    return (
      <ArtItem
        art={art}
        onLink={(artData) => {
          this.props.navigation.navigate('ArtDetails', { artData })
        }}
        onFavorite={(id) => this.handleFavorite(id)}
        onDelete={(deleteArt) => { this.setState({ isVisibleDelete: true, deleteArt }) }}
      />)
  }
  render() {
    const { artData } = this.props;
    const { deleteArt, isVisibleAdd } = this.state;
    
    return (
      <View style={[{ flex: 1, width: '100%', backgroundColor: '#fbfbfb', paddingHorizontal: 10 }]}>
        <AddModal
          {...this.props}
          type='Art'
          isVisible={this.state.isVisibleAdd}
          onClose={() => this.setState({ isVisibleAdd: false })}
        />
        <DeleteModal
          type='art'
          id={deleteArt && deleteArt.id}
          text={`Are you sure you want to delete ${deleteArt && deleteArt.imageName && deleteArt.imageName.toUpperCase()}?`}
          confirmtext={'Artwork has been successfully deleted!'}
          isVisible={this.state.isVisibleDelete}
          onClose={() => this.setState({ isVisibleDelete: false })}
          onDelete={(callback) => { }} />
        <View style={s.topButton}>
          <TouchableOpacity style={s.addBtn} onPress={() => { this.setState({ isVisibleAdd: true }) }}>
            <Text style={s.addBtnLabel}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ flex: 1, width: '100%' }}
          keyExtractor={(item) => `${item.id}`}
          data={artData ? artData : []}
          renderItem={this.renderArt}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  toggleArtFavorite
}

export default connect(mapStateToProps, mapDispatchToProps)(Art)

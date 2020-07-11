// @flow
import React from 'react'
import { Image, ImageBackground, FlatList, Dimensions, TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import s from './LibraryStyles'
import HangupItem from '../../components/HangupItem/HangupItem'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import { toggleHangupFavorite, loadToStore } from '../../reducers/hangup'
import {getPureObject} from '../../utils/utils'

class Hangups extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisibleDelete: false,
      deleteHangup: null
    }
  }
  handleFavorite = (id) => {
    this.props.toggleHangupFavorite(id)
  }
  renderWall = ({ item, index }) => {
    return (
      <HangupItem
        item={item}
        index={index}
        onLink={(hangupData) => {
          const arts = hangupData.arts;
          let new_arts = arts.map(item=>getPureObject(item))
          this.props.loadToStore({...hangupData, arts: new_arts}, ()=>{
            this.props.navigation.navigate('HangupEdit', {item: hangupData})
          });
        }}
        onFavorite={(id) => this.handleFavorite(id)}
        onDelete={(deleteHangup) => { this.setState({ isVisibleDelete: true, deleteHangup }) }}
      />)
  }
  render() {
    const { hangupData } = this.props;
    const { deleteHangup } = this.state;
    
    return (
      <View style={[{ flex: 1, width: '100%', backgroundColor: '#fbfbfb', paddingHorizontal: 10 }]}>
        <DeleteModal
          type='hangup'
          id={deleteHangup && deleteHangup.id}
          text={`Are you sure you want to delete?`}
          confirmtext={'Artwork has been successfully deleted!'}
          isVisible={this.state.isVisibleDelete}
          onClose={() => this.setState({ isVisibleDelete: false })}
          onDelete={(callback) => { }} />
        {/*
        <View style={s.topButton}>
          <TouchableOpacity style={s.addBtn}>
            <Text style={s.addBtnLabel}>Add</Text>
          </TouchableOpacity>
        </View>
        */}
        <FlatList
          style={{ flex: 1, width: '100%' }}
          keyExtractor={(item) => `${item.id}`}
          data={hangupData ? hangupData : []}
          renderItem={this.renderWall}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  toggleHangupFavorite,
  loadToStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Hangups)

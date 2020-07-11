// @flow
import React from 'react'
import { Image, ImageBackground, FlatList, Dimensions, TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import s from './LibraryStyles'
import WallItem from '../../components/WallItem/WallItem'
import { toggleWallFavorite } from '../../reducers/wall'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import AddModal from '../../components/AddModal/AddModal'

class Walls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisibleDelete: false,
      deleteWall: null
    }
  }
  handleFavorite = (id) => {
    this.props.toggleWallFavorite(id)
  }
  renderWall = ({ item, index }) => {
    const wall = item || {}
    return (
      <WallItem
        wall={wall}
        onLink={(wallData) => {
          this.props.navigation.navigate('WallDetails', { wallData })
        }}
        onFavorite={(id) => this.handleFavorite(id)}
        onDelete={(deleteWall) => { this.setState({ isVisibleDelete: true, deleteWall }) }}
      />)
  }
  render() {
    const { wallData } = this.props;
    const { deleteWall } = this.state;
    return (
      <View style={[{ flex: 1, width: '100%', backgroundColor: '#fbfbfb', paddingHorizontal: 10 }]}>
        <AddModal
          {...this.props}
          type='Wall'
          isVisible={this.state.isVisibleAdd}
          onClose={() => this.setState({ isVisibleAdd: false })}
        />
        <DeleteModal
          type='wall'
          id={deleteWall && deleteWall.id}
          text={`Are you sure you want to delete ${deleteWall && deleteWall.wallName && deleteWall.wallName.toUpperCase()}?`}
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
          data={wallData ? wallData : []}
          renderItem={this.renderWall}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  toggleWallFavorite
}

export default connect(mapStateToProps, mapDispatchToProps)(Walls)

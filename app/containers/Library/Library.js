// @flow
import React from 'react'
import { Image, ImageBackground, FlatList, Dimensions, TouchableOpacity, View, Text, TouchableWithoutFeedback, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import s from './LibraryStyles'
import Animated from 'react-native-reanimated';

import {
  TabView,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Art from './Art'
import Walls from './Walls'
import Hangups from './Hangups'

import { autorun_art } from '../../reducers/art'
import { autorun_wall } from '../../reducers/wall'
import { autorun_hangup } from '../../reducers/hangup'
import realm from '@store/realm';
import { forEach, map } from 'lodash'

class Library extends React.Component {

  state = {
    index: 0,
    routes: [
      { key: 'Art', title: 'Art' },
      { key: 'Walls', title: 'Walls' },
      { key: 'Hangups', title: 'Hangups' },
    ],
  };
  constructor(props) {
    super(props)
    this.artdata_source = realm.objects('arts').sorted('isFavorite', true);
    this.artdata_source.addListener(this.onArtChange);

    this.walldata_source = realm.objects('walls').sorted('isFavorite', true);
    this.walldata_source.addListener(this.onWallChange);

    this.hangupdata_source = realm.objects('hangups').sorted('isFavorite', true);
    this.hangupdata_source.addListener(this.onHangupChange);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.navigation.isFocused();
  }
  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.autorun_art();
      this.props.autorun_wall();
      this.props.autorun_hangup();
    });
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.onFocus)
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove()
    this.artdata_source.removeListener(this.onArtChange);
    this.walldata_source.removeListener(this.onWallChange);
    this.hangupdata_source.removeListener(this.onHangupChange);
  }
  onArtChange = (name, changes) => {
    this.forceUpdate();
  }
  onWallChange = (name, changes) => {
    this.forceUpdate();
  }
  onHangupChange = (name, changes) => {
    this.forceUpdate();
  }
  onFocus = () => {
    this.forceUpdate();
  }
  renderItem = ({
    navigationState,
    position,
  }) => ({ route, index }) => {
    const inputRange = navigationState.routes.map((_, i) => i);

    const activeOpacity = Animated.interpolate(position, {
      inputRange,
      outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
    });
    const inactiveOpacity = Animated.interpolate(position, {
      inputRange,
      outputRange: inputRange.map((i) => (i === index ? 0 : 1)),
    });

    return (
      <View style={[s.tabItemWrap, index === navigationState.index && { backgroundColor: '#AAC7FE' }]}>
        <View style={[s.tab, index === navigationState.index && { borderColor: 'black', borderBottomWidth: 2 }]}>
          <Animated.View style={[s.item, { opacity: inactiveOpacity }]}>
            <Text style={[s.label, s.inactive]}>{route.title}</Text>
          </Animated.View>
          <Animated.View
            style={[s.item, s.activeItem, { opacity: activeOpacity }]}
          >
            <Text style={[s.label, s.active]}>{route.title}</Text>
          </Animated.View>
        </View>
      </View>
    );
  };
  renderTabBar = (
    props
  ) => (
      <View style={s.tabbar}>
        {props.navigationState.routes.map((route, index) => {
          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={() => props.jumpTo(route.key)}
            >
              {this.renderItem(props)({ route, index })}
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  render() {
    const artData = map(this.artdata_source.slice(), (i) => { return { ...i, key: i.id } })
    const walldata = map(this.walldata_source.slice(), (i) => { return { ...i, key: i.id } })
    const hangupdata = map(this.hangupdata_source.slice(), (i) => { return { ...i, key: i.id } })

    return (
      <View style={s.wrapper}>
        <View style={s.header}>
          <TouchableOpacity
            style={s.iconWrapper}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon style={s.menuicon} name='menu' />
          </TouchableOpacity>
        </View>
        <View style={s.container}>
          <Text style={s.sectionname}>
            Library
          </Text>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            Art: () => <Art {...this.props} pageIndex={this.state.index} artData={artData} />,
            Walls: () => <Walls {...this.props} pageIndex={this.state.index} wallData={walldata} />,
            Hangups: () => <Hangups {...this.props} pageIndex={this.state.index} hangupData={hangupdata} />
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={this.renderTabBar}
          swipeEnabled={false}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  autorun_art,
  autorun_wall,
  autorun_hangup
}

export default connect(mapStateToProps, mapDispatchToProps)(Library)

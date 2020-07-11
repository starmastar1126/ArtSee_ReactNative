// @flow
import React from 'react'
import { Image, View, Text } from 'react-native'
import { connect } from 'react-redux'
import s from './WelcomeStyles'
import onboard1 from "../../assets/onboard1.png";
import onboard2 from "../../assets/onboard2.png";
import onboard3 from "../../assets/onboard3.png";
import onboard4 from "../../assets/onboard4.png";

import { Swiper } from '../../components';


class Welcome extends React.Component {
  static navigationOptions = {
    header: null,
    headerLeft: null,
    headerRight: null,
    drawerLockMode: 'locked-closed',
  }
  state = {
    index: 0
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  render() {
    return (
      <View style={s.container}>
        <Swiper style={s.wrapper} paginationStyle={s.paginationStyle} showsButtons={false} onSkip={() => { this.props.navigation.navigate("Login") }} onIndexChanged={(index) => {
          if (index === 4) {
            this.props.navigation.navigate("Login")
            return;
          }
        }}>
          <View style={s.slide}>
            <View style={s.slideAbove}>
              <View style={s.slideImageView}>
                <Image style={s.slideImage} source={onboard1} />
              </View>
            </View>
            <View style={s.slideBelow}>
              <Text style={s.title}>Create Hangups</Text>
              <Text style={s.description}>Preview artwork on any of our studio walls and on your walls at home, no matter where you are!</Text>
            </View>
          </View>
          <View style={s.slide}>
            <View style={s.slideAbove}>
              <View style={s.slideImageView}>
                <Image style={s.slideImage} source={onboard2} />
              </View>
            </View>
            <View style={s.slideBelow}>
              <Text style={s.title}>Keep your favorite artworks in one place</Text>
              <Text style={s.description}>Store your favorite artwork in your library to create hangups later, or just to keep the art details handy.</Text>
            </View>
          </View>
          <View style={s.slide}>
            <View style={s.slideAbove}>
              <View style={s.slideImageView}>
                <Image style={s.slideImage} source={onboard3} />
              </View>
            </View>
            <View style={s.slideBelow}>
              <Text style={s.title}>Take live pictures of your space</Text>
              <Text style={s.description}>Add any of your own walls to the app, allowing you to easily create hangups on the go while at a gallery or fair.</Text>
            </View>
          </View>
          <View style={s.slide}>
            <View style={s.slideAbove}>
              <View style={s.slideImageView}>
                <Image style={s.slideImage} source={onboard4} />
              </View>
            </View>
            <View style={s.slideBelow}>
              <Text style={s.title}>Buy contemporary art pieces</Text>
              <Text style={s.description}>Time to buy that piece you like? The gallery and artist information is stored with the artwork, so they're just a call away.</Text>
            </View>
          </View>
          <View style={s.slide}>

          </View>
        </Swiper>
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)

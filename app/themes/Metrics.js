import {Dimensions, Platform, StatusBar, StyleSheet} from 'react-native'
import {isIphoneX} from '../utils/utils'

const { width, height } = Dimensions.get('window')



const margins = {
  exSmallMargin: 5,
  smallMargin: 10,
  baseMargin: 20,
  doubleBaseMargin: 40,
  containerMarginX: 20,
  marginX: 20,
}

// Used via Metrics.baseMargin
const metrics = {
  footerBtnHeight: 65,
  // Buttons
  btnSizes: {
    sm: 45,
    md: 50,
    lg: 65,
    xl: 73,
  },
  btnBorderRadius: 7,
  btnBorderWidth: 2,
  // Inputs
  inputSizes: {
    md: 50,
  },
  inputBorderRadius: 7,
  inputBorderWidth: 1,
  // Margins (also are used as paddings)
  ...margins,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? (isIphoneX() ? 108 : 84) : 56,
  navBarWithOutStatusBarHeight: (Platform.OS === 'ios') ? 64 : 56,
  icons: {
    // tiny: 15,
    // small: 20,
    md: 20,
    lg: 30,
    // xl: 60
  },
  images: {
    // small: 20,
    // medium: 40,
    // large: 60,
    // logo: 300
  },
  // TODO create method to manage properties for ios/android
  boxShadow: {
    // ios
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    // android 5.0+
    elevation: 1,
  },
  backgroundFullScreenImage: {
    width: null,
    height: null,
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    position:'absolute',
    top: Platform.OS ==='ios' ? (isIphoneX() ? -88: -64): -56
  },
}

export default metrics


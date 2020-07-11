import { StyleSheet,Platform } from 'react-native'
import { Metrics, Colors, Fonts } from '../themes'

export default StyleSheet.create({
  iconWrapper: {
    height: Metrics.navBarWithOutStatusBarHeight,
    padding: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
    fontSize: Metrics.icons.lg,
  },
  backBtnText: {
    color: Colors.white,
    fontFamily: Fonts.type.secondary,
  },
  skipBtn: {
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  skipBtnText: {
    color: Colors.white,
    fontFamily: Fonts.type.secondary,
  },
  imageheader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: Metrics.screenWidth,
    height: Metrics.navBarHeight,
  }
})

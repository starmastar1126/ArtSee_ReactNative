import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    backgroundColor: '#FBFBFB'
  },
  container: {
    flex: 1,
    width: '100%'
  },
  header: {
    width: '100%',
    height: Platform.OS == 'ios' ? 82 : 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
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
  sectionname: {
    fontSize: 25,
    color: '#212149',
    marginVertical: 10,
    marginHorizontal: width / 10,
  },
  linkIcon: {
    backgroundColor: '#2B2E37',
    padding: 5,
    borderRadius: 100,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 10
  },
  textStyle: {
    textAlign: 'left',
    color: '#000'
  },
  buttonwrap: {
    alignSelf: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGroup: {
    backgroundColor: 'rgba(43,46,55,0.3)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnLabel: {
    color: 'white',
    fontSize: 13
  }
})

import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    backgroundColor: '#fbfbfb'
  },
  container: {
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    paddingHorizontal: width / 10,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 15
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    width: '100%'
  },
  header: {
    width: '100%',
    height: Platform.OS == 'ios' ? 82 : 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  iconWrapper: {
    height: Metrics.navBarWithOutStatusBarHeight,
    padding: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuicon: {
    color: 'black',
    fontSize: Metrics.icons.lg,
  },
  sectionname: {
    fontSize: 25,
    color: '#212149',
    marginVertical: 10
  },
  
})

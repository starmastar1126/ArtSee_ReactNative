import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fbfbfb'
  },
  container: {
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    paddingHorizontal: width / 10,
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

  tabbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 15
  },
  tabItemWrap:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 0,
    paddingBottom: 3,
    borderRadius: 5,
    marginHorizontal: 10
  },
  tab: {
    alignItems: 'center',
    paddingBottom: 5
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4.5,
  },
  activeItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  active: {
    color: 'black',
  },
  inactive: {
    color: '#939393',
  },
  icon: {
    height: 26,
    width: 26,
  },
  label: {
    fontSize: 18,
    marginTop: 3,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
  },
  /**************** Art **************************/
  topButton: {
    alignSelf: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addBtn: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 100,
    backgroundColor: '#282F37',
    marginVertical: 10,
    flexDirection: 'row'
  },
  addBtnLabel: {
    fontSize: 15,
    color: 'white',
  },
  /**************** Walls **************************/

  /**************** Hangups **************************/
})

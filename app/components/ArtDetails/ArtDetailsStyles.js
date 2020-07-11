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
  scrollContent: {
    marginHorizontal: width / 10,
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
    borderRadius: 100
  },
  textStyle: {
    textAlign: 'left',
    color: '#000'
  },
  panel: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  contactButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: '#E8EBF2'
  },
  contactButtonLabel: {
    fontSize: 14,
    color: 'gray'
  },
  price: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: '#FDD3D4',
    flexDirection: 'row',
    marginVertical: 20
  },
  pricelabel: {
    fontSize: 20,
    color: 'gray',
    marginLeft: 5
  },
  newhangupBtn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#282F37',
    marginVertical: 20,
  },
  newhangupBtnLabel: {
    fontSize: 20,
    color: 'white',
  },
  bottomButton: {
    alignSelf: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

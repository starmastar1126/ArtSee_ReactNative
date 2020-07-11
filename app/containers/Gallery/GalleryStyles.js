import { Platform, StyleSheet, Dimensions } from 'react-native'
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
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    paddingHorizontal: width / 10,
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
    marginVertical: 10
  },
  sectionItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 5
  },
  rowItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  sectionTitle: {
    fontSize: 18,
    color: 'black'
  },
  itemTitle: {
    fontSize: 16,
    color: '#555'
  },
  linkIcon: {
    backgroundColor: '#2B2E37',
    padding: 3,
    borderRadius: 100
  },
  msgcontent: {
    width: '100%',
    backgroundColor: '#282F37',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  msgtext: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  },
  msgiconWrap: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 200,
    marginBottom: 10
  }
})

import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'flex-start',
    backgroundColor: '#fbfbfb',
  },
  content: {
    flex: 1, 
    justifyContent: 'center',
    padding: width / 10,
  },
  topCont: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    width: "100%",
    padding: 15,
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  playerImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 35,
    backgroundColor: '#A4FFEB',
    marginTop: 10,
    overflow: 'hidden'
  },
  avatarText: {
    alignSelf: 'center',
    fontSize: 30,
    color: "#000000",
    fontFamily: "GothamPro-Bold",
    marginTop: 18
  },
  topName: {
    marginLeft: 10,
    fontSize: 15,
    textAlign: "center",
    color: "#000",
    flex: 1
  },
  item: {
    padding: 10,
  },
  itemLabel: {
    fontSize: 20,
    color: '#212149'
  },
  logout: {
    padding: 10,
  },
  logoutLabel: {
    fontSize: 20,
    color: 'red'
  },
})

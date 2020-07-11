import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Fonts } from '../../themes'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: width / 10
  },
  scrollcontainer: {
    alignItems: 'center',
    paddingHorizontal: width / 10
  },
  header: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'flex-start'
  },
  headertitle: {
    fontSize: 25,
    color: 'black',
    marginBottom: 5,
  },
  headersubtitle: {
    fontSize: 18,
    color: '#A0A3A6',
  },
  textContainer: {
    marginVertical: 20
  },
  welcomeText: {
    fontSize: 25,
    color: '#212149',
    marginBottom: 10,
    textAlign: 'center'
  },
  baseText: {
    fontSize: 15,
    color: '#212149',
    lineHeight: 25,
    textAlign: 'center'
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
  },
  buttonColumn: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#282F37',
    marginVertical: 5,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  primaryBtnLabel: {
    color: 'white',
    fontSize: 20
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  secondaryBtnLabel: {
    color: 'black',
    fontSize: 20
  },
  fbBtn: {
    width: '100%',
    backgroundColor: '#3c5a99',
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  fbBtnLabel: {
    color: 'white',
    fontSize: 20
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#A0A3A6',
    padding: 10
  },
  forgotLabel: {
    fontSize: 15,
    color: '#5E8AA2'
  },
  orView: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0
  },
  orLable: {
    backgroundColor: 'white',
    color: '#3c5a99',
    fontSize: 20,
    top: -15,
    paddingHorizontal: 5
  },
  msgContainer: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15
  },
  headerWrapper: {
    marginBottom: 10
  },
  message: {
    fontSize: 18,
    color: "#9864F0"
  },
  inputContainer: {
    width: "100%"
  },
  modalcontent: {
    width: '100%',
    marginHorizontal: 20,
    backgroundColor: '#282F37',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10
  },
  modaliconWrap: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 200,
    marginBottom: 10
  },
  modaltext: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
})

import { StyleSheet } from 'react-native'
import { Fonts } from '../../themes'

export default StyleSheet.create({
  applicationView: {
    flex: 1,
    backgroundColor:'#78CEE4'
  },
  message: {
    fontFamily: Fonts.type.normal,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
  },
  messageTitle: {
    fontFamily: Fonts.type.normal,
    fontSize: Fonts.size.regular,
    textAlign: 'center',
  }
})

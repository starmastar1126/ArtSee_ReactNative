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
})

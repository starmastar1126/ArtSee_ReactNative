import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    pickerItem: {
        padding: 15,
        borderBottomWidth: 2,
        borderColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerLabel: {
        fontSize: 16,
        color: 'black'
    }
})

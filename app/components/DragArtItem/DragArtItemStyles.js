import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    artContainer: {
        alignSelf: 'flex-start',
        borderWidth: 5,
        borderColor: 'transparent',
        borderRadius: 8,
        padding: 16,
        margin: 5
    },
    wrapper: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderColor: '#eee',
        elevation: 2,
    },
    rotate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16
    }
})

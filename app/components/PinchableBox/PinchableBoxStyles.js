import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../themes'


export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    pinchableView: {
        width: 110,
        height: 85,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        borderRadius: 10
    },
    wrapper: {
        flex: 1,
    },
})

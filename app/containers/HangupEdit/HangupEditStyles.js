import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    textStyle: {
        textAlign: 'center',
        color: '#000'
    },
    inactiveBtn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 100,
        backgroundColor: 'transparent',
        marginTop: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#282F37'
    },
    inactiveBtnLabel: {
        fontSize: 14,
        color: '#282F37',
    },
    activeBtn: {
        paddingVertical: 5,
        paddingHorizontal: 45,
        borderRadius: 100,
        backgroundColor: '#282F37',
        marginTop: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#282F37'
    },
    activeBtnLabel: {
        fontSize: 14,
        color: 'white',
    },
    bottomButton: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    sectionname: {
        fontSize: 25,
        color: '#212149',
        marginVertical: 10,
        marginHorizontal: 20,
    },
})

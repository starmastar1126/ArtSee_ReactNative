import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        borderColor: 'grey',
        borderBottomWidth: 1,
        borderRadius: 5,
        margin: 0,
        marginTop: 8,
    },
    inputStyle: {
    },
    subTitle: {
        marginTop: 16,
        color: '#000',
        fontSize: 20,
        marginHorizontal: 16
    },
    textStyle: {
        textAlign: 'center',
        color: '#000'
    },
    bottomTextStyle: {
        fontSize: 14,
        color: '#000'
    },
    contact: {
        color: '#e53935'
    },
    sectionname: {
        fontSize: 25,
        color: '#212149',
        marginHorizontal: 16,
        marginTop: 5
    },
    bottomButton: {
        alignSelf: 'flex-end',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmBtn: {
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 100,
        backgroundColor: '#282F37',
        marginVertical: 20,
        flexDirection: 'row'
    },
    confirmBtnLabel: {
        fontSize: 15,
        color: 'white',
    },
})

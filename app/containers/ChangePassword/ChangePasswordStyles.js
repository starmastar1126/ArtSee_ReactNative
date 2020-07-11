import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width / 10
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
    primaryBtn: {
        width: '100%',
        backgroundColor: 'black',
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    primaryBtnLabel: {
        color: 'white',
        fontSize: 20
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
        fontSize: 20,
        color: "#9864F0"
    },
    inputContainer: {
        width: "100%"
    },
    inputLabel: {
        fontSize: 16,
        color: '#3a5ec1'
    }
})

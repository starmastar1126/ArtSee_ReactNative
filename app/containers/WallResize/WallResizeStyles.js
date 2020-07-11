import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../themes'


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    containerStyle: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        // padding: 0,
        margin: 0,
        paddingTop: 0,
        marginTop: 8,
    },
    infoText: {
        color: '#fff',
        fontSize: 20,
        marginVertical: 32,
        marginHorizontal: '20%',
        textAlign: 'center'
    },
    buttonStyle: {
        height: 30,
        alignSelf: 'center',
        width: '30%',
        borderColor: '#000',
        alignItems: 'center',
        marginRight: 0,
        marginLeft: 0,
    },
    bottomBar: {
        borderTopWidth: 1,
        borderTopColor: 'black',
        alignSelf: 'flex-end',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    textStyle: {
        textAlign: 'center',
        color: '#000'
    },
    confirmBtn: {
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 100,
        backgroundColor: 'transparent',
        marginVertical: 20,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'white'
    },
    confirmBtnLabel: {
        fontSize: 15,
        color: 'white',
    },
})

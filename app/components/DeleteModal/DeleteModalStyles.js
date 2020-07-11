import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    content: {
        width: '100%',
        marginHorizontal: 20,
        backgroundColor: '#282F37',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    backbtn: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 30
    },
    deletebtn:{
        backgroundColor: 'red',
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 30
    },
    btnGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    iconWrap: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 200,
        marginBottom: 10
    }
})

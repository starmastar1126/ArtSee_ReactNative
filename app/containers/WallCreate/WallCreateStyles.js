import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../themes'


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        borderColor: 'grey',
        borderBottomWidth: 1,
        margin: 0,
        padding: 0
    },
    iconWrapper: {
        height: Metrics.navBarWithOutStatusBarHeight,
        padding: Metrics.smallMargin,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: 'black',
        fontSize: Metrics.icons.lg,
    },
    inputStyle: {
        borderColor: 'grey',
        borderBottomWidth: 1,
        marginHorizontal: Metrics.smallMargin,
        padding: 3
    },
    sectionname: {
        fontSize: 25,
        color: 'black',
        marginVertical: 10,
        marginHorizontal: Metrics.smallMargin,
        alignSelf: 'flex-start'
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
    labelstyle: {
        fontSize: 16,
        color: 'black',
        marginHorizontal: Metrics.smallMargin,
        marginTop: 10,
        marginBottom: 5
    }
})

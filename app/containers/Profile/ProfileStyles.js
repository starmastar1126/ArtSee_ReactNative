import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const width = Dimensions.get("window").width;

const rowStyles = {
    width: "100%",
    paddingHorizontal: "5%",
    paddingVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
};
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb'
    },
    header: {
        width: '100%',
        height: Platform.OS == 'ios' ? 82 : 60,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
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
    inputLabel: {
        fontSize: 16,
        color: "#3a5ec1",
        flex: 1,
    },
    input: {
        fontSize: 16,
        color: "#000000",
        flex: 1,
        paddingRight: 10,
    },
    profileCont: {
        flex: 1,
        paddingHorizontal: width / 10,
        backgroundColor: 'transparent'
    },
    topCont: {
        alignItems: "center",
        width: "100%",
        paddingTop: 15,
        paddingBottom: 30,
        marginBottom: 20
    },
    playerImage: {
        width: 67,
        height: 67,
        marginBottom: 10,
        borderRadius: 35,
        backgroundColor: '#A4FFEB',
        marginTop: 10,
        overflow: 'hidden'
    },
    cameraIcon: {
        zIndex: 99999,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 30,
        padding: 5,
        position: 'absolute',
        bottom: 6,
        right: 6,
    },
    topName: {
        width: "100%",
        fontSize: 25,
        textAlign: "center",
        color: "#000"
    },
    topEmail: {
        color: "#9864f0",
        fontSize: 15,
        lineHeight: 20
    },
    absoluteCircle: {
        position: "absolute",
        bottom: 0,
        left: -(1750 / 2) + width / 2,
        width: 1750,
        height: 1750,
        borderRadius: 1750,
        backgroundColor: "#e6d7ff"
    },
    separator: {
        borderTopWidth: 1,
        borderColor: "#d6d2d2"
    },
    itemWrapper: {
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'transparent',
        position: 'relative',
        marginVertical: 10,
        alignItems: 'center'
    },
    itemRow: {
        ...rowStyles,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    itemRowError: {
        ...rowStyles,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "rgba(255,0,0,.5)"
    },
    itemCol: {
        width: "40%"
    },
    itemColRight: {
        width: "100%",
        flex: 1,
        alignItems: "flex-start"
    },
    leftText: {
        fontSize: 16,
        color: "#000000",
        fontFamily: "GothamPro"
    },
    rightText: {
        paddingVertical: 13,
        fontSize: 16,
        color: "#000000",
        fontFamily: "GothamPro-Medium"
    },
    signoutBtn: {
        margin: 30,
        alignSelf: 'center'
    },
    avatarText: {
        alignSelf: 'center',
        fontSize: 30,
        color: "#000000",
        fontFamily: "GothamPro-Bold",
        marginTop: 18
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
    suffix: {
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },
    editbutton: {
        backgroundColor: '#FAD3D1',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        margin: 5
    },
    searchIcon: {
        alignSelf: 'center',
        fontSize: 25,
        color: 'gray',
    },
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

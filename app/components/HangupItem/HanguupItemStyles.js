import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Metrics } from '../../themes'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'flex-start',
        backgroundColor: '#fbfbfb',
      },
      content: {
        flex: 1, 
        justifyContent: 'center',
        padding: width / 10,
      },
      topCont: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        padding: 15,
        borderColor: '#eee',
        borderBottomWidth: 1,
      },
      itemContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 5,
        padding: 10,
        alignItems: 'center'
      },
      textStyle: {
        textAlign: 'left',
        color: '#000'
      },
      linkIcon: {
        backgroundColor: '#2B2E37',
        padding: 5,
        borderRadius: 100
      },
      swipeoutBtn:{
        borderRadius: 10,
        margin: 10,
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      iconWrap:{
        backgroundColor: '#2A2E37',
        padding: 8,
        borderRadius: 50,
      }
})

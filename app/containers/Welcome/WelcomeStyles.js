import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../themes'

const SlideImageWidth = 200;

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tranparent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(243,247,255,0.6)'
  },
  bgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  bgImage: {
    width: "100%",
    flex: 1,
    resizeMode: "cover"
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    color: 'black',
    fontSize: 25,
    //fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  description: {
    color: '#7B7F8A',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 25
  },
  paginationStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  slideAbove: {
    flex: 0.5, 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    marginBottom: 20
  },
  slideImageView: {
    backgroundColor: 'white', 
    width: SlideImageWidth, 
    height: SlideImageWidth*1.16, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden'
  },
  slideImage: {
    width: SlideImageWidth, 
    height: SlideImageWidth*1.16, 
    resizeMode: 'cover'
  },
  slideBelow: {
    flex: 0.5,
    marginTop: 20,
    marginHorizontal: 30
  }
})

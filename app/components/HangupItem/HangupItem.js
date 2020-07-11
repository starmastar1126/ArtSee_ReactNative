import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TouchableHighlight, Animated, Dimensions, TextInput, Keyboard } from 'react-native';
import { size, map } from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import styles from './HanguupItemStyles'
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from "react-native-elements";
import Swipeout from 'react-native-swipeout';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob'
import {updateName} from '../../reducers/hangup'

const Window = Dimensions.get('window')

class HangupItem extends Component {
    constructor(props) {
        super(props);
        const item = props.item;
        this.state = {
            hangupname: item && item.name && item.name.length > 0 ? item.name : 'unknown',
            readonly: true
        }
    }
    handleShare = () => {
        const item = this.props.item;
        
        const imageSource = item && item.wall && parseInt(item.wall.imagePath)
        let name = ''
        let author = ''

        if (size(item.arts.slice()) === 1) {
            name = `${item.arts[0].imageName}`
        } else {
            name = size(item.arts.slice()) === 0 ? item.wall && item.wall.wallName && item.wall.wallName.toUpperCase() : 'MULTIPLE PIECES'
        }

        if (size(item.arts.slice()) > 0) {
            if (size(item.arts.slice()) === 1) {
                author = `by ${item.arts[0].artistName}`
            } else {
                author = `in ${item.wall && item.wall.wallName && item.wall.wallName.toUpperCase()}`
            }
        }
        if (item.imagePath) {
            RNFetchBlob.fs.readFile(item.imagePath, 'base64').then((image) => {
                Share.open(
                    {
                        title: '',
                        message: `Check out ${name} ${author}!\nBrought to you by ArtSee (https://artseeapp.com)\nDownload the app now at http://appstore.com/arthangup`,
                        // url: item.imagePath,  // TODO add image
                        url: 'data:image/jpeg;base64,' + image,
                        type: 'image/jpeg',
                    }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg))
                    .catch((err) => {
                        console.log('error')
                    });
            }).catch(err => {
                console.log(err);
                Share.open(
                    {
                        title: '',
                        message: `Check out ${name} ${author}!\nBrought to you by ArtSee (https://artseeapp.com)\nDownload the app now at http://appstore.com/arthangup`,
                        // url: item.imagePath,  // TODO add image
                        url: 'data:image/jpeg;base64,',
                        type: 'image/jpeg',
                    }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg))
                    .catch((err) => {
                        Share.open(
                            {
                                title: '',
                                message: `Check out ${name} ${author}!\nBrought to you by ArtSee (https://artseeapp.com)\nDownload the app now at http://appstore.com/arthangup`,
                                // url: item.imagePath,  // TODO add image
                                url: 'data:image/jpeg;base64,',
                                type: 'image/jpeg',
                            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg))
                            .catch((err) => {
                                console.log('error')
                            });
                        console.log('error')
                    });
            });
        }
        else {
            Share.open(
                {
                    title: '',
                    message: `Check out ${name} ${author}!\nBrought to you by ArtSee (https://artseeapp.com)\nDownload the app now at http://appstore.com/arthangup`,
                    // url: item.imagePath,  // TODO add image
                    url: 'data:image/jpeg;base64,',
                    type: 'image/jpeg',
                }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg))
                .catch((err) => {
                    console.log('error')
                });
        }
    }
    renderArts = (item, index) => {
        return item && item.arts && map(item.arts.slice(), (art, index2) => {
            const k = item.wall.height / art.height
            const kW = Window.width / item.wall.pixelWidth
            const kWHeight = kW * item.wall.pixelHeight
            const kWW = 150 / kWHeight
            
            const k2 = 150 / Window.height
            const scaleHeight = 150 / k
            
            const scaleWidth = art.pixelWidth * scaleHeight / art.pixelHeight

            const scaleX = kWW * art.x
            const scaleY = kWW * art.y

            const offsetXStyle = index % 2 === 0 ? { left: 75 + scaleX } : { right: 75 - scaleX - scaleWidth, }
            return (
                <Animated.Image
                    key={index2}
                    source={{ uri: `file://${art.imagePath}` }}
                    style={[
                        offsetXStyle,
                        {
                            top: 75 + scaleY,
                            position: 'absolute',
                            transform: [{ rotateZ: `${art.rotation}deg` },],
                            height: scaleHeight || 100,
                            width: scaleWidth || 100,
                            resizeMode: 'contain'
                        }
                    ]}
                />
            )
        })
    }
    render() {
        const { item, disabled, onDelete } = this.props;
        
        var swipeoutBtns = [
            {
                text: '',
                backgroundColor: 'transparent',
                component: <View style={styles.swipeoutBtn}><View style={styles.iconWrap}><Icon name='delete' color="white" size={20} /></View></View>,
                onPress: () => { onDelete && onDelete(item) }
            }
        ]
        //const imageSource = item.imagePath ? item.imagePath : item.wall && item.wall.imagePath && `file://${parseInt(item.wall.imagePath)}` //source={{ uri: `${item.imagePath}?time=${moment().unix()}` }}
        return (
            <Swipeout right={swipeoutBtns} disabled={disabled} style={{ backgroundColor: 'transparent' }} autoClose={true} buttonWidth={120}>
                <TouchableOpacity style={styles.itemContainer} onPress={() => { this.props.onLink && this.props.onLink(item) }}>
                    <View style={{ height: 100, width: 100, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                        {(item.imagePath)
                            ? <Image source={{ uri: `${item.imagePath}` }} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,height: 100, width: 100, resizeMode: 'cover' }} />
                            : null
                        }
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1, paddingHorizontal: 8 }}>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                this.state.readonly ?
                                    <Text
                                        style={[styles.textStyle, { fontSize: 16, color: 'black', textAlignVertical: 'bottom', lineHeight: 25, flex: 1 }]}
                                    >{this.state.hangupname.toUpperCase()}</Text> : null
                            }
                            <TextInput
                                ref={(input) => { this.hangupname = input; }}
                                adjustsFontSizeToFit
                                multiline
                                style={[styles.textStyle, { fontSize: 16, color: 'black', textAlignVertical: 'bottom', lineHeight: 25, padding:0 }, this.state.readonly ? {display: 'none'} : {flex: 1}]}
                                value={this.state.hangupname.toUpperCase()}
                                onChangeText={(hangupname) => { this.setState({ hangupname }) }}
                                readonly={this.state.readonly}
                                onBlur={() => { this.setState({ readonly: true }); Keyboard.dismiss() }}
                                returnKeyType={"done"}
                                blurOnSubmit={true}
                                onSubmitEditing={() => { this.setState({ readonly: true }); Keyboard.dismiss(); this.props.updateName(item.id, this.state.hangupname)}}
                            />
                            {
                                this.state.readonly ?
                                <Icon name={'mode-edit'} type='fontawesome' color="gray" size={25} onPress={() => {
                                    this.setState({ readonly: false });
                                    this.hangupname.focus();
                                }} /> : null
                            }
                        </View>
                        {size(item.arts.slice()) > 0
                            ? <Text adjustsFontSizeToFit style={[styles.textStyle, { fontSize: 16, color: 'gray', marginBottom: 5 }]}>
                                {size(item.arts.slice()) === 1
                                    ? `by ${item.arts[0].artistName}`
                                    : `in ${item.wall && item.wall.wallName && item.wall.wallName.toUpperCase()}`
                                }
                            </Text>
                            : null
                        }
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.linkIcon, { backgroundColor: item.isFavorite ? 'red' : '#CACACA' }]} onPress={() => { this.props.onFavorite && this.props.onFavorite(item.id) }}>
                                <MaterialIcon color="white" size={15} name='favorite' />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.linkIcon, { backgroundColor: '#CACACA', marginLeft: 10 }]}
                                onPress={() => { this.handleShare() }}>
                                <Icon name={'share-alternative'} type='entypo' color="white" size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.linkIcon}>
                        <MaterialIcon color="white" size={25} name='chevron-right' />
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }

}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    updateName
}

export default connect(mapStateToProps, mapDispatchToProps)(HangupItem)

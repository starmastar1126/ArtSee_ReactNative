import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { size, trim } from 'lodash'
import { FormInput } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from './WallCreateStyles'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { create, update } from '../../reducers/wall'

class WallCreateScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state

        return {
            title: null,
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                marginBottom: -1,
                backgroundColor: 'white'
            },
            headerLeft: params && params.update ? (<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginHorizontal: 16 }}>
                <Text>Cancel</Text>
            </TouchableOpacity>) :
                <TouchableOpacity
                    style={styles.iconWrapper}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Icon style={styles.icon} name='arrow-back' />
                </TouchableOpacity>,
            headerRight: null /*(<TouchableOpacity
                onPress={navigation.state.params.handleSave}
                disabled={navigation.state.params.disabled}
                style={{ marginRight: 16 }}
            >
                <Text style={{ color: navigation.state.params.disabled ? '#aaa' : '#000' }}>{params && params.update ? 'Save' : 'Add'}</Text>
            </TouchableOpacity>)*/
        }
    }

    state = {
        width: '',
        height: '',
        title: '',
        wallName: '',
        wallDescription: '',
    }

    constructor() {
        super()
    }

    validate = () => {
        const { params } = this.props.navigation && this.props.navigation.state
        const item = params && params.item
        const { width, height, wallName } = this.state
        let disabled = true

        if (parseFloat(width) > 0 && parseFloat(height) > 0 && size(wallName) > 0) {
            disabled = false
        }

        this.props.navigation.setParams({ handleSave: item ? this.update : this.submit, update: !!item, disabled: disabled });
    }

    submit = () => {
        const photoSource = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.photoSource || null;

        this.props.create({ ...this.state }, photoSource)
        this.props.navigation.popToTop()
    }

    update = () => {
        this.props.update({ ...this.state }, () => {
            this.props.navigation.popToTop()
        })
    }

    handleChangeText = (name) => (value) => {

        const newState = { [name]: value }
        const { params } = this.props.navigation && this.props.navigation.state
        const item = params && params.item

        const photoSource = this.state.photoSource
        const k = item ? item.height / item.width : (photoSource ? photoSource.height / photoSource.width : (params && params.scale ? params.scale : 1))

        if (name === 'width') {
            newState['height'] = parseFloat(value) > 0 ? `${k * parseFloat(value)}` : ''
        }

        if (name === 'height') {
            newState['width'] = k > 0 && parseFloat(value) > 0 ? `${parseFloat(value) / k}` : ''
        }

        this.setState(newState, () => {
            this.validate()
        })
    }

    onPressItem = (item) => {
        this.props.navigation.navigate('ArtDetail', { item: item })
    }

    componentWillMount() {
        const { params } = this.props.navigation && this.props.navigation.state
        const item = params && params.item

        this.props.navigation.setParams({ handleSave: item ? this.update : this.submit, update: !!item, disabled: true });

        const width = params && params.width || {}
        const height = params && params.height || {}

        if (width) {
            this.handleChangeText('width')(width)
        }
        if (height) {
            this.handleChangeText('height')(height)
        }
        if (item) {
            this.setState({ ...item })
        }
    }

    render() {
        const { params } = this.props.navigation && this.props.navigation.state
        const item = params && params.item
        const imageSource = item && parseInt(item.imagePath)
        const photoSource = item
            ? (imageSource > 0 ? imageSource : { uri: `file://${item.imagePath}` })
            : params && params.photoSource || null;


        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView scrollEnables={false} style={styles.container}>
                    <Text style={styles.sectionname}>
                        {params && params.update ? 'Edit Wall' : 'Add Wall'}
                    </Text>
                    <View style={{ height: 250, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 16, marginBottom: 8 }}>
                        <Image source={photoSource} style={{ width: 400, height: 250, resizeMode: 'contain' }} />
                    </View>
                    <Text style={[styles.labelstyle, { alignSelf: 'center' }]}>Size</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            containerStyle={styles.containerStyle}
                            style={[styles.inputStyle, { textAlign: 'center', width: 60 }]}
                            keyboardType="numeric"
                            placeholder="W"
                            value={`${Math.round(this.state.width * 100) / 100}`}
                            onChangeText={this.handleChangeText('width')}
                        />
                        <Text style={{ lineHeight: 35, color: 'black' }}> x </Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            containerStyle={styles.containerStyle}
                            style={[styles.inputStyle, { textAlign: 'center', width: 60 }]}
                            keyboardType="numeric"
                            placeholder="H"
                            value={`${Math.round(this.state.height * 100) / 100}`}
                            onChangeText={this.handleChangeText('height')}
                        />
                    </View>
                    <Text style={[styles.labelstyle]}>Title</Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        containerStyle={styles.containerStyle}
                        style={[styles.inputStyle]}
                        value={this.state.wallName}
                        onChangeText={this.handleChangeText('wallName')}
                    />
                    <Text style={[styles.labelstyle]}>Description</Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        containerStyle={[styles.containerStyle, { height: 120, borderWidth: 1 }]}
                        multiline
                        numberOfLines={8}
                        style={[styles.inputStyle , { height: 120, borderWidth: 1 }]}
                        value={this.state.wallDescription}
                        onChangeText={this.handleChangeText('wallDescription')}
                    />
                    <View style={styles.bottomButton}>
                        <TouchableOpacity style={styles.confirmBtn} onPress={() => { item ? this.update() : this.submit() }}>
                            <Text style={styles.confirmBtnLabel}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}
const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    create,
    update
}

export default connect(mapStateToProps, mapDispatchToProps)(WallCreateScreen)


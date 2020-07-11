// @flow
import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'

import styles from './DeleteModalStyles'
import AppConfig from '../../config/AppConfig'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Modal from "react-native-modal";
import { deleteArtFromLibrary } from '../../reducers/art'
import { deleteWallFromLibrary } from '../../reducers/wall'
import { deleteHangupFromLibrary } from '../../reducers/hangup'

class DeleteModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isConfirm: false,
            result: null
        }
    }
    getResult(res) {
        this.setState({ isConfirm: true, result: res });
    }
    render() {
        const { isVisible, onClose, text, confirmtext, type, id, onDelete } = this.props;
        const { result } = this.state;
        return (
            <Modal style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={isVisible} onBackdropPress={() => { onClose && onClose() }} swipeDirection={['left', 'right', 'up', 'down']}>
                {
                    this.state.isConfirm ?
                        <View style={styles.content}>
                            {
                                result && result.success &&
                                <View style={styles.iconWrap}>
                                    <Icon name='check' color="#282F37" size={40} />
                                </View>
                            }
                            <Text style={styles.text}>{result && result.msg}</Text>
                        </View> :
                        <View style={styles.content}>
                            <Text style={styles.text}>{text}</Text>
                            <View style={styles.btnGroup}>
                                <TouchableOpacity style={styles.backbtn} onPress={() => { onClose && onClose() }}>
                                    <Text style={styles.text}>
                                        Go Back
                            </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.deletebtn}
                                    onPress={() => {
                                        if (type === 'art')
                                            this.props.deleteArtFromLibrary(id, (res) => { this.getResult(res) });
                                        if (type === 'wall')
                                            this.props.deleteWallFromLibrary(id, (res) => { this.getResult(res) });
                                        if (type === 'hangup')
                                            this.props.deleteHangupFromLibrary(id, (res) => { this.getResult(res) });
                                        onDelete && onDelete();    
                                    }}
                                >
                                    <Text style={styles.text}>
                                        Delete
                            </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                }
            </Modal>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = { deleteArtFromLibrary, deleteWallFromLibrary, deleteHangupFromLibrary }

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal)
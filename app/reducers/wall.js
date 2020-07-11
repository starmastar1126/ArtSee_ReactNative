import createReducer, { RESET_STORE } from '../createReducer'
import {
    authStoreUserData,
    authGetToken,
} from "./auth";
import AppConfig from '../config/AppConfig'
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import { NavigationActions as navigation } from 'react-navigation'
import { AsyncStorage, Image, Platform } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import UUIDGenerator from 'react-native-uuid-generator';
import { replace, findIndex, find, forEach, map, size } from 'lodash'
import realm from '@store/realm';

import Room1 from '../assets/Room1.jpg'
import Room2 from '../assets/Room2.jpg'
import Room3 from '../assets/Room3.jpg'
import Room4 from '../assets/Room4.jpg'

export const SET_WALLLOADED = 'Wall.SET_WALLLOADED';

const walls = [
    {
        height: 103.51,
        width: 138.01,
        wallName: "Den",
        wallDescription: "A sample room.",
        pixelHeight: 1152,
        pixelWidth: 1536,
        image: Room3,
    },
    {
        height: 113.28,
        width: 151.05,
        wallName: "Living Room 1",
        wallDescription: "A sample room.",
        pixelHeight: 1152,
        pixelWidth: 1536,
        image: Room1,
    },
    {
        height: 168.18,
        width: 221.36,
        wallName: "Living Room 2",
        wallDescription: "A sample room.",
        pixelHeight: 1152,
        pixelWidth: 1536,
        image: Room2,
    },
    {
        height: 108.8,
        width: 105.25,
        wallName: "Hearth Room",
        wallDescription: "A sample room.",
        pixelHeight: 1152,
        pixelWidth: 1536,
        image: Room4,
    }
]
export const autorun_wall = () => (dispatch, getState, { fetch }) => {
    AsyncStorage.getItem('wallLoaded')
        .then(json => {
            const wallLoaded = json === 'true'
            dispatch({ type: SET_WALLLOADED, wallLoaded })
            if (json !== 'true') {
                
                forEach(walls, (data, index) => {
                    UUIDGenerator.getRandomUUID((uuid) => {
                        

                        const record = {
                            ...data,
                            id: uuid,
                            width: parseFloat(data.width),
                            height: parseFloat(data.height),
                            pixelWidth: data.pixelWidth,
                            pixelHeight: data.pixelHeight,
                            imagePath: `${data.image}`,
                            // imageName: photo.fileName || '',
                        }

                        try {
                            realm.write(() => {
                                const art = realm.create('walls', record, true);
                            });
                        } catch (error) {
                            console.log('realm create art error', error)
                        }
                    })
                })

                AsyncStorage.setItem('wallLoaded', 'true')
                    .then(res => {
                        dispatch({ type: SET_WALLLOADED, wallLoaded: true })
                    })
                    .catch(error => {
                        console.log('wallLoaded error', error);
                        dispatch({ type: SET_WALLLOADED, wallLoaded: false })
                    });
            }
        })
        .catch(error => { console.log('artLoaded error', error); dispatch({ type: SET_WALLLOADED, wallLoaded: false }) });
};

export const create = (data, photo, cb) => (dispatch, getState, { fetch }) => {
    UUIDGenerator.getRandomUUID((uuid) => {
        // const payload = {...data, username: stateStore.user.username}
        
        const PATH_TO_WRITE = Platform.OS === 'ios'
            ? (photo && photo.uri ? `${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/${photo.uri.substring(photo.uri.lastIndexOf('/') + 1, photo.uri.length)}` : '')
            : (photo && photo.fileName ? `${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/${photo.fileName}` : '')
        const record = {
            ...data,
            id: uuid,
            width: Number(data.width),
            height: Number(data.height),
            pixelWidth: photo.width,
            pixelHeight: photo.height,
            imagePath: PATH_TO_WRITE,
            // imageName: photo.fileName || '',
        }

        try {
            realm.write(() => {
                realm.create('walls', record, true);
                // fsStore.scanFile(record.imagePath)
                let PATH_FROM = ''

                if (Platform.OS === 'ios') {
                    if (photo.uri) {
                        PATH_FROM = photo.uri.replace('file://', '')
                    }
                } else {
                    if (photo.path && photo.fileName) {
                        PATH_FROM = photo.path
                    }
                }

                
                if (PATH_FROM) {
                    RNFetchBlob.fs.cp(PATH_FROM, PATH_TO_WRITE)
                        .then((res) => {
                            
                        })
                        .catch((error) => {
                            console.log('move file error', error)
                        })
                }
            });
        } catch (error) {
            console.log('realm create wall', error)
        }
    })
}
export const update = (data, cb) => (dispatch, getState, { fetch }) => {
    const record = {
        ...data,
        width: Number(data.width),
        height: Number(data.height),
        // pixelWidth: 0,
        // pixelHeight: 0,
    }

    try {
        realm.write(() => {
            realm.create('walls', record, true);
            // fsStore.scanFile(record.imagePath)
        });
    } catch (error) {
        console.log('realm update wall', error)
    }

    if (cb && typeof cb === 'function') {
        cb(true)
    }
}
export const toggleWallFavorite = (id) => (dispatch, getState, { fetch }) => {
    try {
        realm.write(() => {
            const item = realm.objectForPrimaryKey('walls', id);

            if (item) {
                item.isFavorite = !item.isFavorite
            }
        });
    } catch (error) {
        console.log('realm toggle Favorit wall', error)
    }
};

export const deleteWallFromLibrary = (id, callback) => (dispatch, getState, { fetch }) => {
    try {
        realm.write(() => {
            const item = realm.objectForPrimaryKey('walls', id);

            if (item) {
                const hangups = realm.objects('hangups').slice()
                const exist = find(hangups, (item) => { return item.wall.id === id })

                if (exist) {
                    callback && callback({ success: false, msg: 'The wall can`t be deleted from your library because it has been added to a hangup. To remove it from your library first remove it from any hangups.' });
                } else {
                    realm.delete(item);
                    callback && callback({ success: true, msg: 'Artwork has been successfully deleted!' });
                }

            }
        });
    } catch (error) {
        console.log('realm delete wall error', error)
        callback && callback({ success: false, msg: JSON.parse(error) });
    }
}
const initialState = {
    wallLoaded: false
}

export default createReducer(initialState, {
    [SET_WALLLOADED]: (state, { wallLoaded }) => ({
        wallLoaded
    }),
})
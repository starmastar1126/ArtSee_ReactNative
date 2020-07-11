import createReducer, { RESET_STORE } from '../createReducer'
import {
    authStoreUserData,
    authGetToken,
} from "./auth";
import AppConfig from '../config/AppConfig'
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import { NavigationActions as navigation } from 'react-navigation'
import { AsyncStorage, Image, Alert, Platform } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import UUIDGenerator from 'react-native-uuid-generator';
import { replace, findIndex, find, forEach, map, size } from 'lodash'
import realm from '@store/realm';

export const GET_ARTLIST = 'Art.GET_ARTLIST';
export const GET_ARTISTLIST = 'Art.GET_ARTISTLIST';
export const SET_ARTLOADED = 'Art.SET_ARTLOADED';

export const autorun_art = () => (dispatch, getState, { fetch }) => {

    RNFetchBlob.fs.mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/`)
        .then(() => { })
        .catch((err) => { })

    RNFetchBlob.fs.ls(`${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/`)
        // files will an array contains filenames
        .then((files) => {

        })
    AsyncStorage.getItem('artLoaded')
        .then(json => {

            const artLoaded = json === 'true'
            dispatch({ type: SET_ARTLOADED, artLoaded })
            if (json !== 'true') {

                try {
                    //stateStore.isLoading = true
                    return fetch(`/defaultArt`, {
                        method: 'GET',
                        success: async (response) => {

                            if (response) {

                                forEach(response, (data) => {
                                    dispatch(addArt(data));
                                })

                                AsyncStorage.setItem('artLoaded', 'true')
                                    .then(res => {
                                        dispatch({ type: SET_ARTLOADED, artLoaded: true })
                                    })
                                    .catch(error => { console.log('artLoaded error', error); dispatch({ type: SET_ARTLOADED, artLoaded: false }) });
                            }
                        },
                        failure: (err) => {
                            console.log("/defaultArt err", err);

                        }
                    })
                } catch (error) {
                    // stateStore.isLoading = false
                    console.log("--------------", error);
                    if (error.response) {

                    }
                }
            }
        })
        .catch(error => { console.log('artLoaded error', error); dispatch({ type: SET_ARTLOADED, artLoaded: false }) });
};
export const addArtByQrCode = (qrCode, cb) => async (dispatch, getState, { fetch }) => {

    const isAdded = realm.objects('arts').filtered(`qrCode = "${qrCode}"`);

    if (!!isAdded.length) {
        Alert.alert('Art Already In Library', 'The artwork for the QR code is already in your library.')
    }

    if (qrCode) {
        try {
            return fetch(`/art?qr=${qrCode}`, {
                method: 'GET',
                success: async (response) => {

                    if (response.qrCode) {
                        dispatch(addArt(response, () => {
                            Alert.alert('Artwork has been successfully added to your Library!')
                        }))

                        if (cb && typeof cb === 'function') {
                            cb(true)
                        }
                    }
                },
                failure: (err) => {
                    console.log(' addArtByQrCoderesponse err', err)
                    Alert.alert('Invalid QR code.')
                }
            })
        } catch (error) {
            console.log(' err', error)
            if (error.response) {
                Alert.alert(JSON.stringify(error.response))
            }
        }
    } else {
        Alert.alert('Invalid QR code.')
    }
}
export const addArt = (data, cb) => (dispatch, getState, { fetch }) => {
    UUIDGenerator.getRandomUUID((uuid) => {

        const record = {
            ...data,
            id: uuid,
            width: parseFloat(data.width),
            height: parseFloat(data.height),
            pixelWidth: 0,
            pixelHeight: 0,
            yearProduced: parseInt(data.yearProduced),
            price: parseFloat(data.price),
            canReserve: !!(size(data.qrCode) && size(data.galleryEmail)),
            // imagePath: photo.path || '',
            // imageName: photo.fileName || '',
        }
        const imageName = data.serverImagePath.replace('/storage/image/', '')
        const PATH_TO_WRITE = `${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/${imageName}`

        record.imagePath = PATH_TO_WRITE

        Image.getSize(`${AppConfig.siteUrl}${data.serverImagePath}`, (width, height) => {

            record.pixelWidth = width
            record.pixelHeight = height
            try {
                realm.write(() => {
                    const art = realm.create('arts', record, true);
                });
            } catch (error) {
                console.log('realm create art error', error)
            }

        });

        const { artList } = getState().art;
        const index = artList.find((item) => {
            return item.qrCode === record.qrCode
        })

        if (index) {
            index.isAdded = true
        }

        if (cb && typeof cb === 'function') {
            cb(true)
        }


        if (data.serverImagePath) {

            //stateStore.isLoading = true
            RNFetchBlob
                .config({
                    // useDownloadManager : true,
                    fileCache: true
                })
                .fetch('GET', `${AppConfig.siteUrl}${data.serverImagePath}`, {})
                .then((res) => {

                    RNFetchBlob.fs.mv(res.path(), PATH_TO_WRITE)
                        .then((res) => {

                        })
                        .catch((error) => {
                            console.log('move file error', error)
                        })
                })
                .catch((err) => {
                    //stateStore.isLoading = false
                    console.log('RNFetchBlob err', err)
                })
        }
    })
};
export const getArtList = (galleryID, firstName, lastName, callback) => (dispatch, getState, { fetch }) => {
    dispatch({ type: GET_ARTLIST, artist: [] });
    return fetch(`/artList?galleryID=${galleryID}&firstName=${firstName}&lastName=${lastName}`, {
        method: 'GET',
        success: (response) => {

            if (response) {
                dispatch({ type: GET_ARTLIST, artList: response });
                if (callback) callback(true);
            } else if (callback) callback(false);
        },
        failure: (err) => {
            if (callback) callback(false);
        }
    })
};
export const getArtistList = (galleryID, callback) => (dispatch, getState, { fetch }) => {
    dispatch({ type: GET_ARTISTLIST, artistList: [] });
    return fetch(`/artistList?galleryID=${galleryID}`, {
        method: 'GET',
        success: (response) => {
            if (response) {
                const artistList = Object.values(response);
                dispatch({ type: GET_ARTISTLIST, artistList });
                if (callback) callback(true);
            } else if (callback) callback(false);
        },
        failure: (err) => {
            if (callback) callback(false);
        }
    })
};
export const toggleArtFavorite = (id) => (dispatch, getState, { fetch }) => {
    try {
        realm.write(() => {
            const item = realm.objectForPrimaryKey('arts', id);

            if (item) {
                item.isFavorite = !item.isFavorite
            }
        });
    } catch (error) {
        console.log('realm create art', error)
    }
};
export const deleteArtFromLibrary = (id, callback) => (dispatch, getState, { fetch }) => {
    try {
        realm.write(() => {
            const item = realm.objectForPrimaryKey('arts', id);
            if (item) {
                const hangups = realm.objects('hangups').slice()
                const exist = find(hangups, (item) => { return find(item.arts.slice(), (i) => i.artId === id) })

                if (exist) {
                    callback && callback({ success: false, msg: 'The artwork can`t be deleted from your library because it has been added to a hangup. To remove it from your library first remove it from any hangups.' });
                } else {
                    realm.delete(item);
                    callback && callback({ success: true, msg: 'Artwork has been successfully deleted!' });
                }
            }
        });
    } catch (error) {
        console.log('realm delete art error', error)
        callback && callback({ success: false, msg: JSON.parse(error) });
    }
}
export const create = (data, photo, cb) => (dispatch, getState, { fetch }) => {
    // const payload = {...data, username: stateStore.user.username}
    UUIDGenerator.getRandomUUID((uuid) => {

        const PATH_TO_WRITE = Platform.OS === 'ios'
            ? (photo && photo.uri ? `${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/${photo.uri.substring(photo.uri.lastIndexOf('/') + 1, photo.uri.length)}` : '')
            : (photo && photo.fileName
                ? `${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/${photo.fileName}`
                : (photo && photo.uri ? `${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/${photo.uri.substring(photo.uri.lastIndexOf('/') + 1, photo.uri.length)}` : '')
            )

        const record = {
            ...data,
            id: uuid,
            width: parseFloat(data.width),
            height: parseFloat(data.height),
            pixelWidth: photo.width,
            pixelHeight: photo.height,
            yearProduced: parseInt(data.yearProduced || 0),
            price: parseFloat(data.price || 0),
            imagePath: PATH_TO_WRITE,
            canReserve: !!(size(data.qrCode) && size(data.galleryEmail)),
            // imageName: photo.fileName || '',
        }

        try {
            realm.write(() => {
                realm.create('arts', record, true);
                // fsStore.scanFile(record.imagePath)
                let PATH_FROM = ''

                if (Platform.OS === 'ios') {
                    if (photo.uri) {
                        PATH_FROM = photo.uri.replace('file://', '')
                    }
                } else {
                    if (photo.path && photo.fileName) {
                        PATH_FROM = photo.path
                    } else if (photo.uri) {
                        PATH_FROM = photo.uri
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
            console.log('realm create art', error)
        }
    })
}

export const reserve = (data, cb) => (dispatch, getState, { fetch }) => {
    const { email, password } = getState().auth.user;

    return fetch(`/reserve`, {
        method: 'POST',
        body: { ...data, email, password },
        success: async (res) => {
            if (res) {
                MessageBarManager.showAlert({
                    title: '',
                    message: 'Artwork Successfully reserved',
                    alertType: 'success',
                });
            } else {
                MessageBarManager.showAlert({
                    title: '',
                    message: 'Something went wrong. Please try again.',
                    alertType: 'error',
                });
            }
        },
        failure: (err) => {
            MessageBarManager.showAlert({
                title: '',
                message: err.error || err.description,
                alertType: 'error',
            });

        }
    })

}
export const update = (data, photo, cb) => (dispatch, getState, { fetch }) => {

    const record = {
        ...data,
        width: Number(data.width),
        height: Number(data.height),
        yearProduced: parseInt(data.yearProduced || 0),
        price: parseFloat(data.price || 0),
    }
    let PATH_TO_WRITE = ''
    if (photo) {
        PATH_TO_WRITE = Platform.OS === 'ios'
            ? (photo && photo.uri ? `${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/${photo.uri.substring(photo.uri.lastIndexOf('/') + 1, photo.uri.length)}` : '')
            : (photo && photo.fileName
                ? `${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/${photo.fileName}`
                : (photo && photo.uri ? `${RNFetchBlob.fs.dirs.DocumentDir}/Pictures/${photo.uri.substring(photo.uri.lastIndexOf('/') + 1, photo.uri.length)}` : '')
            )

        record.imagePath = PATH_TO_WRITE
    }

    try {
        realm.write(() => {
            realm.create('arts', record, true);
            // fsStore.scanFile(record.imagePath)

            if (photo) {
                let PATH_FROM = ''

                if (Platform.OS === 'ios') {
                    if (photo.uri) {
                        PATH_FROM = photo.uri.replace('file://', '')
                    }
                } else {
                    if (photo.path && photo.fileName) {
                        PATH_FROM = photo.path
                    } else if (photo.uri) {
                        PATH_FROM = photo.uri
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
            }
        });
    } catch (error) {
        console.log('realm update art', error)
    }

    if (cb && typeof cb === 'function') {
        cb(true)
    }
}
const initialState = {
    artLoaded: false,
    artList: [],
    artistList: []
}

export default createReducer(initialState, {
    [SET_ARTLOADED]: (state, { artLoaded }) => ({
        artLoaded
    }),
    [GET_ARTLIST]: (state, { artList }) => ({
        artList
    }),
    [GET_ARTISTLIST]: (state, { artistList }) => ({
        artistList
    }),
})
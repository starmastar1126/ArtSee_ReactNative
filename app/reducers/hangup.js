import createReducer, { RESET_STORE } from '../createReducer'
import {
    authStoreUserData,
    authGetToken,
} from "./auth";
import AppConfig from '../config/AppConfig'
import { AsyncStorage, Platform, ImageEditor, Image, PixelRatio } from "react-native";
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import { NavigationActions as navigation } from 'react-navigation'
import RNFetchBlob from 'react-native-fetch-blob'
import UUIDGenerator from 'react-native-uuid-generator';
import realm from '@store/realm';
import { findIndex, find, forEach, filter, map } from 'lodash'
import { captureRef } from "react-native-view-shot"
import ImageResizer from 'react-native-image-resizer';

export const SET_HANGUP = 'Hangup.SET_HANGUP';

export const autorun_hangup = () => (dispatch, getState, { fetch }) => {
    RNFetchBlob.fs.mkdir(`${RNFetchBlob.fs.dirs.DocumentDir}/Hangups/`)
        .then(() => { })
        .catch((err) => { })
};

export const create = (data, cb) => (dispatch, getState, { fetch }) => {
    UUIDGenerator.getRandomUUID((uuid) => {

        UUIDGenerator.getRandomUUID((artUuid) => {

            const record = {
                id: uuid,
                name: 'unknown',
                width: parseFloat(data.wall.width),
                height: parseFloat(data.wall.height),
                pixelWidth: data.wall.pixelWidth,
                pixelHeight: data.wall.pixelHeight,
                wall: {
                    // ...data.wall
                    id: data.wall.id,
                    wallName: data.wall.wallName,
                    imagePath: data.wall.imagePath,
                    width: data.wall.width,
                    height: data.wall.height,
                    pixelWidth: data.wall.pixelWidth,
                    pixelHeight: data.wall.pixelHeight,
                },
                frame: data.frame && data.frame.id ? {
                    ...data.frame
                } : null,
                arts: [{
                    // ...data.art,
                    id: artUuid,
                    artId: data.art.id,
                    x: - data.art.width / 2,
                    y: - data.art.height / 2,
                    pixelWidth: data.art.pixelWidth,
                    pixelHeight: data.art.pixelHeight,

                    imageName: data.art.imageName,
                    imagePath: data.art.imagePath,
                    artistName: data.art.artistName,
                    width: data.art.width,
                    height: data.art.height,
                    rotation: data.art.rotation,
                }]
            }
            dispatch({ type: SET_HANGUP, hangup: record })
            if (cb && typeof cb === 'function') {
                cb(record)
            }
        })
    })
};
export const deleteArt = (id, artId, cb) => (dispatch, getState, { fetch }) => {
    const { hangup } = getState().hangup;
    if (hangup && artId) {
        const arts = filter(hangup.arts.slice(), (a) => a.id !== artId) || []
        dispatch({ type: SET_HANGUP, hangup: { ...hangup, arts } })
    }
    if (cb && typeof cb === 'function') {
        cb(true)
    }
}
export const addArt = (id, data, cb) => (dispatch, getState, { fetch }) => {
    const { hangup } = getState().hangup;
    if (hangup && data.art) {
        const artData = data.art
        console.log("addArt", artData);
        UUIDGenerator.getRandomUUID((artId) => {
            dispatch({
                type: SET_HANGUP,
                hangup: {
                    ...hangup,
                    arts: [
                        ...hangup.arts,
                        {
                            id: artId,
                            artId,
                            x: - artData.width / 2,
                            y: - artData.height / 2,
                            pixelWidth: artData.width,
                            pixelHeight: artData.height,
                            imageName: artData.imageName,
                            imagePath: artData.imagePath,
                            artistName: artData.artistName,
                            width: artData.width,
                            height: artData.height,
                            rotation: artData.rotation
                        }
                    ]
                }
            })
        })

    }
    if (cb && typeof cb === 'function') {
        cb(true)
    }
}
export const rotate = (id, artId, value, cb) => (dispatch, getState, { fetch }) => {
    const { hangup } = getState().hangup;
    if (hangup) {
        const art = find(hangup.arts, (a) => a.id === artId)
        const arts = filter(hangup.arts, (a) => a.id !== artId)

        if (art) {
            let rotation = (!!art.rotation && art.rotation != undefined ? art.rotation : 0) + value

            if (rotation >= 360) {
                rotation = 0
            }

            if (rotation < 0) {
                rotation = 360 + rotation
            }

            dispatch({
                type: SET_HANGUP, hangup: {
                    ...hangup,
                    arts: [...arts, { ...art, rotation }]
                }
            })
            if (cb && typeof cb === 'function') {
                cb(true)
            }
        }
    }
}
export const update = (id, data, cb) => (dispatch, getState, { fetch }) => {

    UUIDGenerator.getRandomUUID((artId) => {

        try {
            realm.write(() => {
                const hangup = realm.objectForPrimaryKey('hangups', id)

                if (hangup && data.art) {
                    // const arts = hangup.arts.slice() || []
                    // arts.push({...data.art})
                    hangup.arts.push({ ...data.art, id: artId, artId: data.art.id, x: - data.art.width / 2, y: - data.art.height / 2 })
                }

                if (cb && typeof cb === 'function') {
                    cb(true)
                }
            });
        } catch (error) {
            console.log('realm create hangup', error)
            if (cb && typeof cb === 'function') {
                cb(false)
            }
        }
    })
}
export const updateName = (id, name, cb) => (dispatch, getState, { fetch }) => {
    try {
        realm.write(() => {
            const hangup = realm.objectForPrimaryKey('hangups', id)

            hangup.name = name ? name : ''

            if (cb && typeof cb === 'function') {
                cb(true)
            }
        });
    } catch (error) {
        if (cb && typeof cb === 'function') {
            cb(false)
        }
    }
}
saveHangup = (file, filename) => {
    return new Promise((resolve, reject) => {
        let source = file.replace('file://', '')

        const outputPath = `${RNFetchBlob.fs.dirs.DocumentDir}/`;

        // The imageStore path here is "rct-image-store://0"
        ImageResizer.createResizedImage(
            source,
            1280,
            1280,
            'JPEG',
            80,
            0,
            outputPath,
        ).then((success) => {
            source = success.path

            RNFetchBlob.fs.exists(source)
                .then((exist) => {

                    if (exist) {
                        const target = `${RNFetchBlob.fs.dirs.DocumentDir}/Hangups/${filename}`


                        RNFetchBlob.fs.cp(source, target)
                            .then(() => {
                                // Alert.alert(`img moved`, `${path} to ${target}`)
                                resolve(`file://${target}`)
                            })
                            .catch((err) => {
                                reject(err)
                            })
                    } else {
                        reject()
                    }

                })
                .catch((err) => {
                    reject(err)
                })
            //If you console success.path then it will give you something like this
            // /var/mobile/Containers/Data/Application/3BA7E152-E21E-4ADD-84A3-8CCCBC7FBFAE
            // /Documents/var/mobile/Containers/Data/Application/3BA7E152-E21E-4ADD-84A3-8CCCBC7FBFAE/Documents/194D4C64-8EA9-4058-9307-BA1316347DA0.jpg
        }).catch((err) => {
            console.log('ImageResizer error', err)
            // reject(err)
        })
    }
    )
}
const cropOptions = {
    format: "jpg",
    quality: 0.8,
    result: "tmpfile",
    snapshotContentContainer: false
}
snapshot = (ref, id, container, cb) =>
    (ref
        ? captureRef(ref, cropOptions)
        : null
    )
        .then((res) => {
            if (cb && typeof cb === 'function') {
                cb('123')
            }
            return cropOptions.result !== "tmpfile"
                ? res
                : new Promise((success, failure) =>
                    // just a test to ensure res can be used in Image.getSize
                    Image.getSize(
                        res,
                        (width, height) => (
                            console.log('getSize', res, width, height), success({ res, width, height })
                        ),
                        failure
                    )
                )
        }
        )
        .then(data => {
            console.log('after resize')
            // return this.saveHangup(data.res, `${id}.jpg`)
            // return data.res
            previewSource = {
                uri:
                    cropOptions.result === "base64"
                        ? "data:image/" + cropOptions.format + ";base64," + data.res
                        : data.res
            }

            const cropData = {
                offset: {
                    x: PixelRatio.getPixelSizeForLayoutSize(container.x),
                    y: PixelRatio.getPixelSizeForLayoutSize(container.y)
                },
                size: {
                    width: (
                        PixelRatio.getPixelSizeForLayoutSize(container.width)
                    ),
                    height: (
                        PixelRatio.getPixelSizeForLayoutSize(container.height)
                    )
                },
            };

            return new Promise((resolve, reject) => {
                ImageEditor.cropImage(
                    previewSource.uri,
                    cropData,
                    (croppedUri) => {

                        resolve(this.saveHangup(croppedUri, `${id}.jpg`))
                        // resolve(croppedUri)
                        // this.resize(
                        //
                        //   croppedUri,
                        //   (cropData.size.width),
                        //   (cropData.size.height)
                        // ).then((resizedUri) =>
                        //   resolve(resizedUri)
                        // );
                    },
                    (failure) => reject(failure)
                );
            });
        })
        // .then(res =>
        //   ({previewSource: {
        //       uri:
        //         this.cropOptions.result === "base64"
        //           ? "data:image/" + this.cropOptions.format + ";base64," + res
        //           : res
        //     }
        //   })
        // )
        .catch(
            error => (
                console.log(error)
                // this.setState({ error, res: null, previewSource: null })
            )
        );
export const setXY = (id, artId, x, y, container, ref, cb) => (dispatch, getState, { fetch }) => {
    this.snapshot(ref, id, container, cb).then((res) => {
        const { hangup } = getState().hangup;
        if (hangup) {
            try {
                realm.write(() => {
                    const art = find(hangup.arts, (a) => a.id === artId)
                    const arts = filter(hangup.arts, (a) => a.id !== artId)
                    if (art && x !== null && y !== null) {

                        if (art && x !== null && y !== null) {
                            art.x = x
                            art.y = y
                        }

                        dispatch({
                            type: SET_HANGUP, hangup: {
                                ...hangup,
                                arts: [...arts, art],
                                imagePath: res
                            }
                        })
                    }
                });
            } catch (error) {
                console.log('realm create art error', error)
            }
        }

    })
};
export const loadToStore = (hangup, cb) => async (dispatch, getState, { fetch }) => {
    await dispatch({
        type: SET_HANGUP, hangup
    })
    if (cb && typeof cb === 'function') {
        cb(true)
    }
};
export const save = (uri) => (dispatch, getState, { fetch }) => {
    const { hangup } = getState().hangup;
    if (hangup) {
        try {
            realm.write(() => {
                const item = realm.objectForPrimaryKey('hangups', hangup.id);
                if (item) {
                    item.arts = hangup.arts;
                    item.wall = hangup.wall;
                    item.frame = hangup.frame;
                    item.imagePath = uri;
                }
                else {
                    const art = realm.create('hangups', { ...hangup, imagePath: uri }, true);
                }
            });
        } catch (error) {
            console.log('realm create art error', error)
        }
    }
};
export const toggleHangupFavorite = (id) => (dispatch, getState, { fetch }) => {
    try {
        realm.write(() => {
            const item = realm.objectForPrimaryKey('hangups', id);

            if (item) {
                item.isFavorite = !item.isFavorite
            }
        });
    } catch (error) {
        console.log('realm toggle Favorit hangup', error)
    }
};
export const deleteHangupFromLibrary = (id, callback) => (dispatch, getState, { fetch }) => {
    try {
        realm.write(() => {
            const item = realm.objectForPrimaryKey('hangups', id);

            if (item) {
                realm.delete(item);
                callback && callback({ success: true, msg: 'Artwork has been successfully deleted!' });
            } else callback && callback({ success: false, msg: 'Something went wrong.' });
        });
    } catch (error) {
        console.log('realm delete hangup error', error)
        callback && callback({ success: false, msg: JSON.parse(error) });
    }
}
export const setFrame = (frame) => (dispatch, getState, { fetch }) => {
    const { hangup } = getState().hangup;
    if (hangup) {
        dispatch({
            type: SET_HANGUP,
            hangup: {
                ...hangup,
                frame: frame && frame.id ? {
                    id: frame.id + '',
                    name: frame.name + '',
                    image: frame.image,
                    width: frame.width,
                    height: frame.height,
                    pixel_width: frame.pixel_width,
                    pixel_height: 0,
                } : null
            }
        })
    }
}
const initialState = {
    hangup: null
}

export default createReducer(initialState, {
    [SET_HANGUP]: (state, { hangup }) => ({
        hangup
    }),
})
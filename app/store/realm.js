'use strict';

import Realm from 'realm';

const artSchema = {
  name: 'arts',
  primaryKey: 'id',
  properties: {
    id: 'string',
    width: 'float',
    height: 'float',
    pixelWidth: 'float',
    pixelHeight: 'float',
    imageName: { type: 'string', optional: true },
    artistName: { type: 'string', optional: true },
    imageDescription: { type: 'string', optional: true },
    yearProduced: { type: 'int', optional: true },
    materials: { type: 'string', optional: true },
    price: { type: 'double', optional: true },
    expoName: { type: 'string', optional: true },
    expoYear: { type: 'string', optional: true },
    expoBooth: { type: 'string', optional: true },
    galleryName: { type: 'string', optional: true },
    galleryContactPerson: { type: 'string', optional: true },
    galleryStreet1: { type: 'string', optional: true },
    galleryStreet2: { type: 'string', optional: true },
    galleryCity: { type: 'string', optional: true },
    galleryState: { type: 'string', optional: true },
    galleryZipCode: { type: 'string', optional: true },
    galleryPhone: { type: 'string', optional: true },
    galleryEmail: { type: 'string', optional: true },
    serverImagePath: { type: 'string', optional: true },
    serverThumbPath: { type: 'string', optional: true },
    qrCode: { type: 'string', optional: true },
    isCustom: { type: 'bool', default: false },
    isFavorite: { type: 'bool', default: false },
    imageAttachmentName: { type: 'string', optional: true },
    imagePath: { type: 'string', optional: true },
    shortDescription: { type: 'string', optional: true },
    canReserve: { type: 'bool', default: true },
    creationDateStamp: { type: 'date', optional: true },
  }
};

const wallSchema = {
  name: 'walls',
  primaryKey: 'id',
  properties: {
    id: 'string',
    width: 'float',
    height: 'float',
    pixelWidth: 'float',
    pixelHeight: 'float',
    wallName: { type: 'string', optional: true },
    wallDescription: { type: 'string', optional: true },
    isFavorite: { type: 'bool', default: false },
    imagePath: { type: 'string', optional: true },
    creationDateStamp: { type: 'date', optional: true },
  }
};


const hangupArtSchema = {
  name: 'hangupArts',
  primaryKey: 'id',
  properties: {
    id: 'string',
    artId: 'string',
    imageName: { type: 'string', optional: true },
    imagePath: { type: 'string', optional: true },
    artistName: { type: 'string', optional: true },
    width: 'float',
    height: 'float',
    pixelWidth: 'float',
    pixelHeight: 'float',
    x: { type: 'float', default: 0 },
    y: { type: 'float', default: 0 },
    rotation: { type: 'float', default: 0 },
  }
};

const hangupWallSchema = {
  name: 'hangupWall',
  primaryKey: 'id',
  properties: {
    id: 'string',
    wallName: { type: 'string', optional: true },
    imagePath: { type: 'string', optional: true },
    width: 'float',
    height: 'float',
    pixelWidth: 'float',
    pixelHeight: 'float',
  }
};

const hangupFrameSchema = {
  name: 'hangupFrame',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: { type: 'string', optional: true },
    image: { type: 'string', optional: true },
    width: { type: 'float', optional: true },
    height: { type: 'float', optional: true },
    pixel_width: { type: 'float', optional: true },
    pixel_height: { type: 'float', optional: true },
  }
};

const hangupSchema = {
  name: 'hangups',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    width: 'float',
    height: 'float',
    pixelWidth: 'float',
    pixelHeight: 'float',
    imagePath: { type: 'string', optional: true },
    wall: { type: 'hangupWall' },
    frame: { type: 'hangupFrame', optional: true },
    arts: { type: 'list', objectType: 'hangupArts' },
    isFavorite: { type: 'bool', default: false },
    creationDateStamp: { type: 'date', optional: true },
  }
};

export default new Realm({
  schema: [artSchema, wallSchema, hangupArtSchema, hangupWallSchema, hangupFrameSchema, hangupSchema]
});

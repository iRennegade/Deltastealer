"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_WIN = void 0;
exports.getElectronMajorVersion = getElectronMajorVersion;

const process = require('process');

function getElectronMajorVersion() {
  return process.versions.electron != null ? parseInt(process.versions.electron.split('.')[0]) : 0;
}

const IS_WIN = process.platform === 'win32';
exports.IS_WIN = IS_WIN;
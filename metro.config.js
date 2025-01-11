const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('tflite'); // Add .tflite as a supported asset extension

module.exports = config;

'use strict';

exports.__esModule = true;
exports.default = transformImport;

var _utils = require('../utils');

function transformImport(nodePath, state) {
  (0, _utils.mapPathString)(nodePath.get('source'), state);
}
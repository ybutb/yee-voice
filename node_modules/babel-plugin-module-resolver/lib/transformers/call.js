'use strict';

exports.__esModule = true;
exports.default = transformCall;

var _utils = require('../utils');

function transformCall(nodePath, state) {
  const calleePath = nodePath.get('callee');
  const isNormalCall = state.normalizedOpts.transformFunctions.some(pattern => (0, _utils.matchesPattern)(state.types, calleePath, pattern));

  if (isNormalCall || (0, _utils.isImportCall)(state.types, nodePath)) {
    (0, _utils.mapPathString)(nodePath.get('arguments.0'), state);
  }
}
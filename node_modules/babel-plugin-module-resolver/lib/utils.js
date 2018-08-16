'use strict';

exports.__esModule = true;
exports.nodeResolvePath = nodeResolvePath;
exports.toPosixPath = toPosixPath;
exports.toLocalPath = toLocalPath;
exports.stripExtension = stripExtension;
exports.replaceExtension = replaceExtension;
exports.matchesPattern = matchesPattern;
exports.mapPathString = mapPathString;
exports.isImportCall = isImportCall;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nodeResolvePath(modulePath, basedir, extensions) {
  try {
    return _resolve2.default.sync(modulePath, { basedir, extensions });
  } catch (e) {
    return null;
  }
}

function toPosixPath(modulePath) {
  return modulePath.replace(/\\/g, '/');
}

function toLocalPath(modulePath) {
  return modulePath.replace(/\/index$/, '') // remove trailing /index
  .replace(/^(?!\.)/, './'); // insert `./` to make it a local path
}

function stripExtension(modulePath, extensions) {
  var _path$basename$split = _path2.default.basename(modulePath).split('.');

  const name = _path$basename$split[0],
        splits = _path$basename$split.slice(1);

  const fileExtension = `.${splits.join('.')}`;
  return extensions.reduce((filename, extension) => {
    // To allow filename to contain a dot
    if (extension === fileExtension) {
      // Strip extension
      return name;
    }
    return filename;
  }, _path2.default.basename(modulePath, _path2.default.extname(modulePath)));
}

function replaceExtension(modulePath, ext, opts) {
  const filename = stripExtension(modulePath, opts.extensions) + ext;
  return _path2.default.join(_path2.default.dirname(modulePath), filename);
}

function matchesPattern(types, calleePath, pattern) {
  const node = calleePath.node;


  if (types.isMemberExpression(node)) {
    return calleePath.matchesPattern(pattern);
  }

  if (!types.isIdentifier(node) || pattern.includes('.')) {
    return false;
  }

  const name = pattern.split('.')[0];

  return node.name === name;
}

function mapPathString(nodePath, state) {
  if (!state.types.isStringLiteral(nodePath)) {
    return;
  }

  const sourcePath = nodePath.node.value;
  const currentFile = state.file.opts.filename;

  const modulePath = state.normalizedOpts.resolvePath(sourcePath, currentFile, state.opts);
  if (modulePath) {
    if (nodePath.node.pathResolved) {
      return;
    }

    nodePath.replaceWith(state.types.stringLiteral(modulePath));
    nodePath.node.pathResolved = true;
  }
}

function isImportCall(types, calleePath) {
  return types.isImport(calleePath.node.callee);
}
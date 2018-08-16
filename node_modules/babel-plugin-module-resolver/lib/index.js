'use strict';

exports.__esModule = true;
exports.resolvePath = undefined;

var _normalizeOptions = require('./normalizeOptions');

var _normalizeOptions2 = _interopRequireDefault(_normalizeOptions);

var _resolvePath = require('./resolvePath');

var _resolvePath2 = _interopRequireDefault(_resolvePath);

var _call = require('./transformers/call');

var _call2 = _interopRequireDefault(_call);

var _import = require('./transformers/import');

var _import2 = _interopRequireDefault(_import);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Public API for external plugins
exports.resolvePath = _resolvePath2.default;


const importVisitors = {
  CallExpression: _call2.default,
  'ImportDeclaration|ExportDeclaration': _import2.default
};

const visitor = {
  Program: {
    enter(programPath, state) {
      programPath.traverse(importVisitors, state);
    }
  }
};

exports.default = ({ types }) => ({
  name: 'module-resolver',

  pre(file) {
    this.types = types;

    const currentFile = file.opts.filename;
    this.normalizedOpts = (0, _normalizeOptions2.default)(currentFile, this.opts);
  },

  visitor
});
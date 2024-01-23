'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

var MissingLocalizationError = function (_Error) {
  _inherits(MissingLocalizationError, _Error);

  function MissingLocalizationError(module, name, value) {
    _classCallCheck(this, MissingLocalizationError);

    var _this = _possibleConstructorReturn(this, (MissingLocalizationError.__proto__ || Object.getPrototypeOf(MissingLocalizationError)).call(this));

    Error.captureStackTrace(_this, MissingLocalizationError);
    _this.name = 'MissingLocalizationError';
    _this.requests = [{ name, value }];
    _this.module = module;
    // small workaround for babel
    Object.setPrototypeOf(_this, MissingLocalizationError.prototype);
    _this._buildMessage();
    return _this;
  }

  _createClass(MissingLocalizationError, [{
    key: '_buildMessage',
    value: function _buildMessage() {
      this.message = this.requests.map(function (request) {
        if (request.name === request.value) {
          return `Missing localization: ${request.name}`;
        }
        return `Missing localization: (${request.name}) ${request.value}`;
      }).join('\n');
    }
  }, {
    key: 'add',
    value: function add(name, value) {
      for (var i = 0; i < this.requests.length; i++) {
        if (this.requests[i].name === name) return;
      }
      this.requests.push({ name, value });
      this._buildMessage();
    }
  }]);

  return MissingLocalizationError;
}(Error);

exports.default = MissingLocalizationError;
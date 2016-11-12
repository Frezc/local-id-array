'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalIdArray = function () {
  function LocalIdArray(arrayOrObj) {
    var _this = this;

    _classCallCheck(this, LocalIdArray);

    if (arrayOrObj instanceof LocalIdArray) {
      this.array = arrayOrObj.array.slice();
      this.__map__ = (0, _objectAssign2.default)({}, arrayOrObj.__map__);
      this.__autoIncrement__ = arrayOrObj.__autoIncrement__;
    } else if (Array.isArray(arrayOrObj)) {
      this.__map__ = {};
      this.__autoIncrement__ = 1;
      this.array = arrayOrObj.map(function (item, index) {
        var currentIndex = _this.__autoIncrement__++;
        _this.__map__[currentIndex] = item;
        return currentIndex;
      });
    } else {
      this.array = [];
      this.__map__ = {};
      this.__autoIncrement__ = 1;
    }
  }

  _createClass(LocalIdArray, [{
    key: 'push',
    value: function push() {
      var newObj = new LocalIdArray(this);

      for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }

      newObj.array = newObj.array.concat(items.map(function (item) {
        var currentIndex = newObj.__autoIncrement__++;
        newObj.__map__[currentIndex] = item;
        return currentIndex;
      }));
      return newObj;
    }
  }, {
    key: 'concat',
    value: function concat() {
      var _ref;

      var data = (_ref = []).concat.apply(_ref, arguments);
      return this.push.apply(this, _toConsumableArray(data));
    }
  }, {
    key: 'unshift',
    value: function unshift() {
      var newObj = new LocalIdArray(this);

      for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      newObj.array = items.map(function (item) {
        var currentIndex = newObj.__autoIncrement__++;
        newObj.__map__[currentIndex] = item;
        return currentIndex;
      }).concat(newObj.array);
      return newObj;
    }
  }, {
    key: 'toArray',
    value: function toArray() {
      var _this2 = this;

      return this.array.map(function (id) {
        return _this2.__map__[id];
      });
    }
  }, {
    key: 'map',
    value: function map(cb) {
      var _this3 = this;

      return this.array.map(function (id, index) {
        return cb && cb(_this3.__map__[id], id, index);
      });
    }
  }, {
    key: 'slice',
    value: function slice() {
      var _array,
          _this4 = this;

      var newObj = new LocalIdArray();
      newObj.array = (_array = this.array).slice.apply(_array, arguments).map(function (id) {
        newObj.__map__[id] = _this4.__map__[id];
        return id;
      });
      newObj.__autoIncrement__ = this.__autoIncrement__;
      return newObj;
    }
  }, {
    key: 'splice',
    value: function splice() {
      var _newObj$array,
          _this5 = this;

      for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      var newObj = new LocalIdArray();
      newObj.__autoIncrement__ = this.__autoIncrement__;
      params = params.slice(0, 2).concat(params.slice(2).map(function (item) {
        var currentIndex = newObj.__autoIncrement__++;
        newObj.__map__[currentIndex] = item;
        return currentIndex;
      }));
      newObj.array = this.array.slice();
      (_newObj$array = newObj.array).splice.apply(_newObj$array, _toConsumableArray(params));
      newObj.array.forEach(function (id) {
        if (!newObj.__map__.hasOwnProperty(id)) {
          newObj.__map__[id] = _this5.__map__[id];
        }
      });
      return newObj;
    }
  }]);

  return LocalIdArray;
}();

exports.default = LocalIdArray;
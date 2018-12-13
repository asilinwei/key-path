if (!window.zipObjectDeep) {
  var zipObjectDeep = (function() {
    "use strict";

    var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        regTrim = /^\[["']?|["']?\]$/g;

    var isArray = Array.isArray,
        isInteger = Number.isInteger;

    var hasOwnProperty = function(object, property) {
      return object.hasOwnProperty(property);
    };

    var addProperty = function(object, keys, length, value, index) {
      var key = ('' + keys[index]).replace(regTrim, '');
      if (index < length - 1) {
        if (!hasOwnProperty(object, key)) {
          var next = ('' + keys[index + 1]).replace(regTrim, '');
          object[key] = isInteger(+next) && next !== null && next !== false && next !== '' ? [] : {};
        }
        addProperty(object[key], keys, length, value, index + 1);
      } else {
        object[key] = value;
      }
    };

    var baseZipObjectDeep = function(props, values) {
      var result = {},
          index = -1,
          length = props.length;

      while (++index < length) {
        var path = props[index],
            keys = isArray(path) ? path : ('' + path).match(regPropName) || [''];

        if (keys.length) {
          addProperty(result, keys, keys.length, values[index], 0);
        }
      }
      return result;
    };

    return function(props, values) {
      if (props === undefined) {
        props = [];
      }
      if (values === undefined) {
        values = [];
      }
      if (!isArray(props) || !isArray(values)) {
        return {};
      }
      return baseZipObjectDeep(props, values);
    };
  })();
}
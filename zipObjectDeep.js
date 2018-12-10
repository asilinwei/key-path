if (!window.zipObjectDeep) {
  var zipObjectDeep = (function() {
    "use strict";

    var regSplit = /\[["']|["']\]|\[\.|\[(?=-?\d+\.\d+)|\.?\[|\]\.?|\.(?!.*["']|\d+\])|\.(?=\d*[^\d\]]+)/;

    var isArray = Array.isArray,
        isInteger = Number.isInteger;

    var hasOwnProperty = function(object, property) {
      return object.hasOwnProperty(property);
    };

    var addProperty = function(object, keys, length, value, index) {
      var key = keys[index];
      if (index < length - 1) {
        if (!hasOwnProperty(object, key)) {
          var next = keys[index + 1];
          object[key] = isInteger(+next) && next !== null && next !== false ? [] : {};
        }
        addProperty(object[key], keys, length, value, index + 1);
      } else {
        object[key] = value;
      }
    };

    var removeEmpty = function(array) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (!('' + array[index])) {
          array.splice(index, 1);
        }
      }   
      return array; 
    };

    var baseZipObjectDeep = function(props, values) {
      var result = {},
          index = -1,
          length = props.length;

      while (++index < length) {
        var path = props[index],
            keys = removeEmpty(isArray(path) ? path : ('' + path).split(regSplit));

        addProperty(result, keys, keys.length, values[index], 0);
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
/**
 * 2018-12-13
 * @copyright LinWei 2018
 * 
 * Create object with key-path and corresponding values.
 * 
 * @param {Array} [props=[]] The array of key-path.
 * @param {Array} [values=[]] The array of corresponding values.
 * @return {Object} The result object.
 * @example
 *
 * zipObjectDeep(['a', 'b'], [1, 2]);
 * // => {'a': 1, 'b': 2}
 *
 * zipObjectDeep(['a.a.a', 'a.a.b'], [1, 2]);
 * // => {'a': {'a': {'a': 1, 'b': 2}}}
 *
 * zipObjectDeep(['["a"]["a"]["a"]', '["a"]["a"]["b"]'], [1, 2]);
 * // => {'a': {'a': {'a': 1, 'b': 2}}}
 *
 * zipObjectDeep(['a[0]', 'a[1]'], [1, 2]);
 * // => {'a': [1, 2]}
 *
 * zipObjectDeep([['a', 'a'], ['a', 'b']], [1, 2]);
 * // => {'a': {'a': 1, 'b': 2}}
 */
if (!window.zipObjectDeep) {
  var zipObjectDeep = (function() {
    "use strict";

    /** Used to process the property name. */
    var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        regTrim = /^\[["']?|["']?\]$/g;

    /** Bulid-in method. */
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

    // Base implement of zipObjectDeep.
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
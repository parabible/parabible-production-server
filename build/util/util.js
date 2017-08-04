"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var convertSetToArray = function convertSetToArray(s) {
	var retArr = [];
	s.forEach(function (v) {
		return retArr.push(v);
	});
	return retArr;
};

var setDiff = function setDiff(setA, setB) {
	return new Set([].concat(_toConsumableArray(setA)).filter(function (x) {
		return !setB.has(x);
	}));
};
var arrayDiff = function arrayDiff(arrA, arrB) {
	var a = new Set(arrA);
	var b = new Set(arrB);
	return convertSetToArray(setDiff(a, b));
};

function setIntersect() {
	for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
		sets[_key] = arguments[_key];
	}

	if (!sets.length) return new Set();
	var i = sets.reduce(function (m, s, i) {
		return s.size < sets[m].size ? i : m;
	}, 0);

	var _sets$splice = sets.splice(i, 1),
	    _sets$splice2 = _slicedToArray(_sets$splice, 1),
	    smallest = _sets$splice2[0];

	var res = new Set();
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		var _loop = function _loop() {
			var val = _step.value;

			if (sets.every(function (s) {
				return s.has(val);
			})) res.add(val);
		};

		for (var _iterator = smallest[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			_loop();
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return res;
}
function arrayIntersect() {
	for (var _len2 = arguments.length, arrays = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		arrays[_key2] = arguments[_key2];
	}

	var sets = arrays.map(function (a) {
		return new Set(a);
	});
	return convertSetToArray(setIntersect.apply(undefined, _toConsumableArray(sets)));
}

exports.arrayIntersect = arrayIntersect;
exports.arrayDiff = arrayDiff;
exports.setIntersect = setIntersect;
exports.setDiff = setDiff;
exports.convertSetToArray = convertSetToArray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3V0aWwuanMiXSwibmFtZXMiOlsiY29udmVydFNldFRvQXJyYXkiLCJzIiwicmV0QXJyIiwiZm9yRWFjaCIsInB1c2giLCJ2Iiwic2V0RGlmZiIsInNldEEiLCJzZXRCIiwiU2V0IiwiZmlsdGVyIiwiaGFzIiwieCIsImFycmF5RGlmZiIsImFyckEiLCJhcnJCIiwiYSIsImIiLCJzZXRJbnRlcnNlY3QiLCJzZXRzIiwibGVuZ3RoIiwiaSIsInJlZHVjZSIsIm0iLCJzaXplIiwic3BsaWNlIiwic21hbGxlc3QiLCJyZXMiLCJ2YWwiLCJldmVyeSIsImFkZCIsImFycmF5SW50ZXJzZWN0IiwiYXJyYXlzIiwibWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsQ0FBRCxFQUFPO0FBQ2hDLEtBQUlDLFNBQVMsRUFBYjtBQUNBRCxHQUFFRSxPQUFGLENBQVU7QUFBQSxTQUFLRCxPQUFPRSxJQUFQLENBQVlDLENBQVosQ0FBTDtBQUFBLEVBQVY7QUFDQSxRQUFPSCxNQUFQO0FBQ0EsQ0FKRDs7QUFNQSxJQUFNSSxVQUFVLFNBQVZBLE9BQVUsQ0FBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQWdCO0FBQy9CLFFBQU8sSUFBSUMsR0FBSixDQUFRLDZCQUFJRixJQUFKLEdBQVVHLE1BQVYsQ0FBaUI7QUFBQSxTQUFLLENBQUNGLEtBQUtHLEdBQUwsQ0FBU0MsQ0FBVCxDQUFOO0FBQUEsRUFBakIsQ0FBUixDQUFQO0FBQ0EsQ0FGRDtBQUdBLElBQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDakMsS0FBSUMsSUFBSSxJQUFJUCxHQUFKLENBQVFLLElBQVIsQ0FBUjtBQUNBLEtBQUlHLElBQUksSUFBSVIsR0FBSixDQUFRTSxJQUFSLENBQVI7QUFDQSxRQUFPZixrQkFBa0JNLFFBQVFVLENBQVIsRUFBVUMsQ0FBVixDQUFsQixDQUFQO0FBQ0EsQ0FKRDs7QUFNQSxTQUFTQyxZQUFULEdBQStCO0FBQUEsbUNBQU5DLElBQU07QUFBTkEsTUFBTTtBQUFBOztBQUMzQixLQUFJLENBQUNBLEtBQUtDLE1BQVYsRUFBa0IsT0FBTyxJQUFJWCxHQUFKLEVBQVA7QUFDbEIsS0FBTVksSUFBSUYsS0FBS0csTUFBTCxDQUFZLFVBQUNDLENBQUQsRUFBSXRCLENBQUosRUFBT29CLENBQVA7QUFBQSxTQUFhcEIsRUFBRXVCLElBQUYsR0FBU0wsS0FBS0ksQ0FBTCxFQUFRQyxJQUFqQixHQUF3QkgsQ0FBeEIsR0FBNEJFLENBQXpDO0FBQUEsRUFBWixFQUF3RCxDQUF4RCxDQUFWOztBQUYyQixvQkFHUkosS0FBS00sTUFBTCxDQUFZSixDQUFaLEVBQWUsQ0FBZixDQUhRO0FBQUE7QUFBQSxLQUdwQkssUUFIb0I7O0FBSTNCLEtBQU1DLE1BQU0sSUFBSWxCLEdBQUosRUFBWjtBQUoyQjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLE9BS2xCbUIsR0FMa0I7O0FBTXZCLE9BQUlULEtBQUtVLEtBQUwsQ0FBVztBQUFBLFdBQUs1QixFQUFFVSxHQUFGLENBQU1pQixHQUFOLENBQUw7QUFBQSxJQUFYLENBQUosRUFDS0QsSUFBSUcsR0FBSixDQUFRRixHQUFSO0FBUGtCOztBQUszQix1QkFBZ0JGLFFBQWhCO0FBQUE7QUFBQTtBQUwyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVM5QixRQUFPQyxHQUFQO0FBQ0E7QUFDRCxTQUFTSSxjQUFULEdBQW1DO0FBQUEsb0NBQVJDLE1BQVE7QUFBUkEsUUFBUTtBQUFBOztBQUNsQyxLQUFJYixPQUFPYSxPQUFPQyxHQUFQLENBQVc7QUFBQSxTQUFLLElBQUl4QixHQUFKLENBQVFPLENBQVIsQ0FBTDtBQUFBLEVBQVgsQ0FBWDtBQUNBLFFBQU9oQixrQkFBa0JrQixpREFBZ0JDLElBQWhCLEVBQWxCLENBQVA7QUFDQTs7UUFHUVksYyxHQUFBQSxjO1FBQWdCbEIsUyxHQUFBQSxTO1FBQVdLLFksR0FBQUEsWTtRQUFjWixPLEdBQUFBLE87UUFBU04saUIsR0FBQUEsaUIiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNvbnZlcnRTZXRUb0FycmF5ID0gKHMpID0+IHtcblx0bGV0IHJldEFyciA9IFtdXG5cdHMuZm9yRWFjaCh2ID0+IHJldEFyci5wdXNoKHYpKVxuXHRyZXR1cm4gcmV0QXJyXG59XG5cbmNvbnN0IHNldERpZmYgPSAoc2V0QSwgc2V0QikgPT4ge1xuXHRyZXR1cm4gbmV3IFNldChbLi4uc2V0QV0uZmlsdGVyKHggPT4gIXNldEIuaGFzKHgpKSlcbn1cbmNvbnN0IGFycmF5RGlmZiA9IChhcnJBLCBhcnJCKSA9PiB7XG5cdGxldCBhID0gbmV3IFNldChhcnJBKVxuXHRsZXQgYiA9IG5ldyBTZXQoYXJyQilcblx0cmV0dXJuIGNvbnZlcnRTZXRUb0FycmF5KHNldERpZmYoYSxiKSlcbn1cblxuZnVuY3Rpb24gc2V0SW50ZXJzZWN0KC4uLnNldHMpIHtcbiAgICBpZiAoIXNldHMubGVuZ3RoKSByZXR1cm4gbmV3IFNldCgpO1xuICAgIGNvbnN0IGkgPSBzZXRzLnJlZHVjZSgobSwgcywgaSkgPT4gcy5zaXplIDwgc2V0c1ttXS5zaXplID8gaSA6IG0sIDApO1xuICAgIGNvbnN0IFtzbWFsbGVzdF0gPSBzZXRzLnNwbGljZShpLCAxKTtcbiAgICBjb25zdCByZXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgdmFsIG9mIHNtYWxsZXN0KVxuICAgICAgICBpZiAoc2V0cy5ldmVyeShzID0+IHMuaGFzKHZhbCkpKVxuICAgICAgICAgICAgIHJlcy5hZGQodmFsKTtcblx0XG5cdHJldHVybiByZXNcbn1cbmZ1bmN0aW9uIGFycmF5SW50ZXJzZWN0KC4uLmFycmF5cykge1xuXHRsZXQgc2V0cyA9IGFycmF5cy5tYXAoYSA9PiBuZXcgU2V0KGEpKVxuXHRyZXR1cm4gY29udmVydFNldFRvQXJyYXkoc2V0SW50ZXJzZWN0KC4uLnNldHMpKVxufVxuXG5cbmV4cG9ydCB7IGFycmF5SW50ZXJzZWN0LCBhcnJheURpZmYsIHNldEludGVyc2VjdCwgc2V0RGlmZiwgY29udmVydFNldFRvQXJyYXkgfVxuIl19
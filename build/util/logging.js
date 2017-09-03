'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var envTransport = [];
if (process.env == "PRODUCTION") {
	envTransport.push(new _winston2.default.transports.File({ filename: 'log/output.log' }));
} else {
	envTransport.push(new _winston2.default.transports.Console());
}
var logger = new _winston2.default.Logger({
	transports: envTransport
});

console.log = function () {
	throw new Error("You aren't allowed to use console.log; import logging.js instead.");
};

var Log = function Log() {
	var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'info';
	var message = arguments[1];

	logger.log(type, message);
};
exports.default = Log;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2xvZ2dpbmcuanMiXSwibmFtZXMiOlsiZW52VHJhbnNwb3J0IiwicHJvY2VzcyIsImVudiIsInB1c2giLCJ0cmFuc3BvcnRzIiwiRmlsZSIsImZpbGVuYW1lIiwiQ29uc29sZSIsImxvZ2dlciIsIkxvZ2dlciIsImNvbnNvbGUiLCJsb2ciLCJFcnJvciIsIkxvZyIsInR5cGUiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsZUFBZSxFQUFyQjtBQUNBLElBQUlDLFFBQVFDLEdBQVIsSUFBZSxZQUFuQixFQUFpQztBQUNoQ0YsY0FBYUcsSUFBYixDQUFrQixJQUFLLGtCQUFRQyxVQUFSLENBQW1CQyxJQUF4QixDQUE4QixFQUFFQyxVQUFVLGdCQUFaLEVBQTlCLENBQWxCO0FBQ0EsQ0FGRCxNQUdLO0FBQ0pOLGNBQWFHLElBQWIsQ0FBa0IsSUFBSyxrQkFBUUMsVUFBUixDQUFtQkcsT0FBeEIsRUFBbEI7QUFDQTtBQUNELElBQUlDLFNBQVMsSUFBSyxrQkFBUUMsTUFBYixDQUFxQjtBQUNqQ0wsYUFBWUo7QUFEcUIsQ0FBckIsQ0FBYjs7QUFJQVUsUUFBUUMsR0FBUixHQUFjLFlBQU07QUFDbkIsT0FBTSxJQUFJQyxLQUFKLENBQVUsbUVBQVYsQ0FBTjtBQUNBLENBRkQ7O0FBSUEsSUFBTUMsTUFBTSxTQUFOQSxHQUFNLEdBQTBCO0FBQUEsS0FBekJDLElBQXlCLHVFQUFwQixNQUFvQjtBQUFBLEtBQVpDLE9BQVk7O0FBQ3JDUCxRQUFPRyxHQUFQLENBQVdHLElBQVgsRUFBaUJDLE9BQWpCO0FBQ0EsQ0FGRDtrQkFHZUYsRyIsImZpbGUiOiJsb2dnaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3RvbidcblxuY29uc3QgZW52VHJhbnNwb3J0ID0gW11cbmlmIChwcm9jZXNzLmVudiA9PSBcIlBST0RVQ1RJT05cIikge1xuXHRlbnZUcmFuc3BvcnQucHVzaChuZXcgKHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKSh7IGZpbGVuYW1lOiAnbG9nL291dHB1dC5sb2cnIH0pKVxufVxuZWxzZSB7XG5cdGVudlRyYW5zcG9ydC5wdXNoKG5ldyAod2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUpKCkpXG59XG52YXIgbG9nZ2VyID0gbmV3ICh3aW5zdG9uLkxvZ2dlcikoe1xuXHR0cmFuc3BvcnRzOiBlbnZUcmFuc3BvcnRcbn0pXG5cbmNvbnNvbGUubG9nID0gKCkgPT4ge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJZb3UgYXJlbid0IGFsbG93ZWQgdG8gdXNlIGNvbnNvbGUubG9nOyBpbXBvcnQgbG9nZ2luZy5qcyBpbnN0ZWFkLlwiKVxufVxuXG5jb25zdCBMb2cgPSAodHlwZT0naW5mbycsIG1lc3NhZ2UpID0+IHtcblx0bG9nZ2VyLmxvZyh0eXBlLCBtZXNzYWdlKVxufVxuZXhwb3J0IGRlZmF1bHQgTG9nIl19
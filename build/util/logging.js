'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var envTransport = [];
envTransport.push(new _winston2.default.transports.File({ filename: 'log/output.log' }));
var logger = new _winston2.default.Logger({
	transports: envTransport
});

// console.log = () => {
// 	throw new Error("You aren't allowed to use console.log; import logging.js instead.")
// }

var Log = function Log(message) {
	logger.log("info", message);
	console.log("pushing to log?");
};
logger.log("info", "just a test");
console.log("running test...");
exports.default = Log;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2xvZ2dpbmcuanMiXSwibmFtZXMiOlsiZW52VHJhbnNwb3J0IiwicHVzaCIsInRyYW5zcG9ydHMiLCJGaWxlIiwiZmlsZW5hbWUiLCJsb2dnZXIiLCJMb2dnZXIiLCJMb2ciLCJtZXNzYWdlIiwibG9nIiwiY29uc29sZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLGVBQWUsRUFBckI7QUFDQUEsYUFBYUMsSUFBYixDQUFrQixJQUFLLGtCQUFRQyxVQUFSLENBQW1CQyxJQUF4QixDQUE4QixFQUFFQyxVQUFVLGdCQUFaLEVBQTlCLENBQWxCO0FBQ0EsSUFBSUMsU0FBUyxJQUFLLGtCQUFRQyxNQUFiLENBQXFCO0FBQ2pDSixhQUFZRjtBQURxQixDQUFyQixDQUFiOztBQUlBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNTyxNQUFNLFNBQU5BLEdBQU0sQ0FBQ0MsT0FBRCxFQUFhO0FBQ3hCSCxRQUFPSSxHQUFQLENBQVcsTUFBWCxFQUFtQkQsT0FBbkI7QUFDQUUsU0FBUUQsR0FBUixDQUFZLGlCQUFaO0FBQ0EsQ0FIRDtBQUlBSixPQUFPSSxHQUFQLENBQVcsTUFBWCxFQUFtQixhQUFuQjtBQUNBQyxRQUFRRCxHQUFSLENBQVksaUJBQVo7a0JBQ2VGLEciLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3aW5zdG9uIGZyb20gJ3dpbnN0b24nXG5cbmNvbnN0IGVudlRyYW5zcG9ydCA9IFtdXG5lbnZUcmFuc3BvcnQucHVzaChuZXcgKHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKSh7IGZpbGVuYW1lOiAnbG9nL291dHB1dC5sb2cnIH0pKVxudmFyIGxvZ2dlciA9IG5ldyAod2luc3Rvbi5Mb2dnZXIpKHtcblx0dHJhbnNwb3J0czogZW52VHJhbnNwb3J0XG59KVxuXG4vLyBjb25zb2xlLmxvZyA9ICgpID0+IHtcbi8vIFx0dGhyb3cgbmV3IEVycm9yKFwiWW91IGFyZW4ndCBhbGxvd2VkIHRvIHVzZSBjb25zb2xlLmxvZzsgaW1wb3J0IGxvZ2dpbmcuanMgaW5zdGVhZC5cIilcbi8vIH1cblxuY29uc3QgTG9nID0gKG1lc3NhZ2UpID0+IHtcblx0bG9nZ2VyLmxvZyhcImluZm9cIiwgbWVzc2FnZSlcblx0Y29uc29sZS5sb2coXCJwdXNoaW5nIHRvIGxvZz9cIilcbn1cbmxvZ2dlci5sb2coXCJpbmZvXCIsIFwianVzdCBhIHRlc3RcIilcbmNvbnNvbGUubG9nKFwicnVubmluZyB0ZXN0Li4uXCIpXG5leHBvcnQgZGVmYXVsdCBMb2ciXX0=
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const envTransport = [];
envTransport.push(new _winston.default.transports.File({
  filename: 'log/output.log'
}));
var logger = new _winston.default.Logger({
  transports: envTransport
}); // console.log = () => {
// 	throw new Error("You aren't allowed to use console.log; import logging.js instead.")
// }

const Log = message => {
  logger.log("info", message);
};

logger.log("info", "STARTING LOG FOR PID: " + process.pid);
var _default = Log;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2xvZ2dpbmcuanMiXSwibmFtZXMiOlsiZW52VHJhbnNwb3J0IiwicHVzaCIsIndpbnN0b24iLCJ0cmFuc3BvcnRzIiwiRmlsZSIsImZpbGVuYW1lIiwibG9nZ2VyIiwiTG9nZ2VyIiwiTG9nIiwibWVzc2FnZSIsImxvZyIsInByb2Nlc3MiLCJwaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBLE1BQU1BLFlBQVksR0FBRyxFQUFyQjtBQUNBQSxZQUFZLENBQUNDLElBQWIsQ0FBa0IsSUFBS0MsaUJBQVFDLFVBQVIsQ0FBbUJDLElBQXhCLENBQThCO0FBQUVDLEVBQUFBLFFBQVEsRUFBRTtBQUFaLENBQTlCLENBQWxCO0FBQ0EsSUFBSUMsTUFBTSxHQUFHLElBQUtKLGlCQUFRSyxNQUFiLENBQXFCO0FBQ2pDSixFQUFBQSxVQUFVLEVBQUVIO0FBRHFCLENBQXJCLENBQWIsQyxDQUlBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNUSxHQUFHLEdBQUlDLE9BQUQsSUFBYTtBQUN4QkgsRUFBQUEsTUFBTSxDQUFDSSxHQUFQLENBQVcsTUFBWCxFQUFtQkQsT0FBbkI7QUFDQSxDQUZEOztBQUdBSCxNQUFNLENBQUNJLEdBQVAsQ0FBVyxNQUFYLEVBQW1CLDJCQUEyQkMsT0FBTyxDQUFDQyxHQUF0RDtlQUNlSixHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3RvbidcblxuY29uc3QgZW52VHJhbnNwb3J0ID0gW11cbmVudlRyYW5zcG9ydC5wdXNoKG5ldyAod2luc3Rvbi50cmFuc3BvcnRzLkZpbGUpKHsgZmlsZW5hbWU6ICdsb2cvb3V0cHV0LmxvZycgfSkpXG52YXIgbG9nZ2VyID0gbmV3ICh3aW5zdG9uLkxvZ2dlcikoe1xuXHR0cmFuc3BvcnRzOiBlbnZUcmFuc3BvcnRcbn0pXG5cbi8vIGNvbnNvbGUubG9nID0gKCkgPT4ge1xuLy8gXHR0aHJvdyBuZXcgRXJyb3IoXCJZb3UgYXJlbid0IGFsbG93ZWQgdG8gdXNlIGNvbnNvbGUubG9nOyBpbXBvcnQgbG9nZ2luZy5qcyBpbnN0ZWFkLlwiKVxuLy8gfVxuXG5jb25zdCBMb2cgPSAobWVzc2FnZSkgPT4ge1xuXHRsb2dnZXIubG9nKFwiaW5mb1wiLCBtZXNzYWdlKVxufVxubG9nZ2VyLmxvZyhcImluZm9cIiwgXCJTVEFSVElORyBMT0cgRk9SIFBJRDogXCIgKyBwcm9jZXNzLnBpZClcbmV4cG9ydCBkZWZhdWx0IExvZyJdfQ==
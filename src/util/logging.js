import winston from 'winston'

const envTransport = []
envTransport.push(new (winston.transports.File)({ filename: 'log/output.log' }))
var logger = new (winston.Logger)({
	transports: envTransport
})

// console.log = () => {
// 	throw new Error("You aren't allowed to use console.log; import logging.js instead.")
// }

const Log = (message) => {
	logger.log("info", message)
}
logger.log("info", "STARTING LOG FOR PID: " + process.pid)
export default Log
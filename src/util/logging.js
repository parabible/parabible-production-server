import winston from 'winston'

const envTransport = []
if (process.env == "PRODUCTION") {
	envTransport.push(new (winston.transports.File)({ filename: 'log/output.log' }))
}
else {
	envTransport.push(new (winston.transports.Console)())
}
var logger = new (winston.Logger)({
	transports: envTransport
})

console.log = () => {
	throw new Error("You aren't allowed to use console.log; import logging.js instead.")
}

const Log = (type='info', message) => {
	logger.log(type, message)
}
export default Log
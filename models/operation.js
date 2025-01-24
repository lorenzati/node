const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema({
	operation: { type: String, required: true },
	inputs: {
		numberOne: { type: Number, required: true },
		numberTwo: { type: Number, required: true },
	},
	result: { type: Number, required: true },
	timestamp: { type: Date, default: Date.now },
	responseTime: { type: Number, required: true },
});

const Operation = mongoose.model("Operation", operationSchema);

module.exports = Operation;

const Joi = require("joi");
const { Operations } = require("../config");
const Operation = require("../models/operation");
const { connectToRedis } = require("../db/connection");
const client = connectToRedis();
const jwt = require("jsonwebtoken");

const login = (req, res) => {
	const { username, password } = req.body;
	if (username === "user" && password === "password") {
		const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
		return res.json({ token });
	}

	return res.status(400).json({ message: "Invalid credentials" });
};

const calculate = async (req, res) => {
	const { numberOne, numberTwo, operation } = req.body;

	const schema = Joi.object({
		numberOne: Joi.number().required(),
		numberTwo: Joi.number().required(),
		operation: Joi.string().valid(Operations.ADD, Operations.SUBTRACT, Operations.MULTIPLY, Operations.DIVIDE).required().messages({
			"any.only": "Invalid operation",
		}),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ status: "error", message: error.details[0].message });
	}

	const startTime = Date.now();
	let result;

	switch (operation) {
		case Operations.ADD:
			result = numberOne + numberTwo;
			break;
		case Operations.SUBTRACT:
			result = numberOne - numberTwo;
			break;
		case Operations.MULTIPLY:
			result = numberOne * numberTwo;
			break;
		case Operations.DIVIDE:
			if (numberTwo === 0) {
				return res.status(400).json({ status: "error", message: "Can't divide by zero" });
			}
			result = numberOne / numberTwo;
			break;
		default:
			return res.status(400).json({ status: "error", message: "Invalid operation" });
	}

	const responseTime = Date.now() - startTime;

	const operationRecord = new Operation({
		operation,
		inputs: { numberOne, numberTwo },
		result,
		responseTime,
	});

	await operationRecord.save();

	client.set(`${operation}:${numberOne}:${numberTwo}`, JSON.stringify({ status: "success", result }), "EX", 60);

	res.json({
		status: "success",
		operation,
		inputs: { numberOne, numberTwo },
		result,
		timestamp: new Date(),
		responseTime,
	});
};

module.exports = { calculate, login };

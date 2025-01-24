require("dotenv").config();
module.exports = {
	Operations: Object.freeze({
		ADD: "add",
		SUBTRACT: "subtract",
		MULTIPLY: "multiply",
		DIVIDE: "divide",
	}),
	JWT_SECRET: process.env.JWT_SECRET || "123",
	MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/calculatorAPI",
	REDIS_HOST: process.env.REDIS_HOST || "localhost",
};

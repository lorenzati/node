const mongoose = require("mongoose");
const { createClient } = require("redis");

async function connectToMongoDB() {
	try {
		await mongoose.connect("mongodb://localhost:27017/calculatorAPI");
		console.log("Conectado a MongoDB");
	} catch (err) {
		console.error("Error al conectar a MongoDB:", err);
	}
}

function connectToRedis() {
	const client = createClient();
	client
		.connect()
		.then(() => {
			console.log("Conectado a Redis");
		})
		.catch((err) => {
			console.error("Error al conectar a Redis", err);
		});
	return client;
}

module.exports = { connectToMongoDB, connectToRedis };

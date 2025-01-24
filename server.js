const express = require("express");
const { connectToMongoDB, connectToRedis } = require("./db");
const operationRoutes = require("./routes/operationRoutes");

const app = express();
const port = 3000;

app.use(express.json());

connectToMongoDB();
const redisClient = connectToRedis();

app.use("/api", operationRoutes);

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`Servidor corriendo en http://localhost:${port}`);
	});
}

module.exports = app;

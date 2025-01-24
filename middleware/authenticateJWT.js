const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authenticateJWT = (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];

	if (!token) {
		return res.status(403).json({ message: "No token provided" });
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		req.user = decoded;
		next();
	});
};

module.exports = authenticateJWT;

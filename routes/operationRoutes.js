const express = require("express");
const { calculate } = require("../controllers/operationController");
const { login } = require("../controllers/operationController");
const authenticateJWT = require("../middleware/authenticateJWT");

const router = express.Router();

router.post("/login", login);
router.post("/calculate", authenticateJWT, calculate);

module.exports = router;

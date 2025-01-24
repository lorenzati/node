const validateNumbers = (req, res, next) => {
	const { numberOne, numberTwo } = req.body;

	if (isNaN(numberOne) || isNaN(numberTwo)) {
		return res.status(400).json({ status: "error", message: "Both numberOne and numberTwo must be valid numbers" });
	}

	next();
};

module.exports = validateNumbers;

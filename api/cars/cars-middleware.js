const carsModel = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = () => async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const car = await carsModel.getById(req.params.id);
		if (car) {
			next();
		} else {
			res.status(404).json({
				messagE: 'Car not found.'
			});
		}
	} catch (err) {
		next(err);
	}
};

const checkCarPayload = () => (req, res, next) => {
	// DO YOUR MAGIC
	const { vin, make, model, mileage } = req.body;
	if (!vin || vin === '') {
		return res.status(400).json({
			message: `vin number is required.`
		});
	}
	if (!make || make === '') {
		return res.status(400).json({
			message: `make is required.`
		});
	}
	if (!model || model === '') {
		return res.status(400).json({
			message: `model is required.`
		});
	}
	if (!mileage || mileage === '') {
		return res.status(400).json({
			message: `mileage is required.`
		});
	}
	next();
};

const checkVinNumberValid = () => (req, res, next) => {
	// DO YOUR MAGIC
	const isValidVin = vinValidator.validate(req.body.vin);
	if (!isValidVin) {
		return res.status(400).json({
			message: `Vin ${req.body.vin} is invalid.`
		});
	}
	next();
};

const checkVinNumberUnique = () => async (req, res, next) => {
	// DO YOUR MAGIC
	const cars = await carsModel.getAll();
	const car = cars.filter(c => c.vin === req.body.vin);
	console.log(car);
	if (car.vin === req.body.vin) {
		return res.status(400).json({
			message: `Vin ${req.body.vin} already exists.`
		});
	} else {
		next();
	}
};

module.exports = {
	checkCarId,
	checkCarPayload,
	checkVinNumberUnique,
	checkVinNumberValid
};

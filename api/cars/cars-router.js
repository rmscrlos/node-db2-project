// DO YOUR MAGIC
const router = require('express').Router();
const carsModel = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');

//get all cars
router.get('/api/cars', async (req, res, next) => {
	try {
		const cars = await carsModel.getAll();
		res.json(cars);
	} catch (err) {
		next(err);
	}
});

//get car by ID
router.get('/api/cars/:id', checkCarId(), async (req, res, next) => {
	try {
		const car = await carsModel.getById(req.params.id);
		res.status(200).json(car);
	} catch (err) {
		next(err);
	}
});

//create car
router.post('/api/cars', checkCarPayload(), checkVinNumberValid(), checkVinNumberUnique(), async (req, res, next) => {
	try {
		const car = await carsModel.create(req.body);
		res.status(201).json(car);
	} catch (err) {
		next(err);
	}
});

module.exports = router;

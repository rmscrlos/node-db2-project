const db = require('../../data/db-config');

const getAll = () => {
	// DO YOUR MAGIC
	return db('cars');
};

const getById = id => {
	// DO YOUR MAGIC
	return db('cars').where('id', id).first();
};

const create = async car => {
	// DO YOUR MAGIC
	const [id] = await db.insert(car).into('cars');
	const carAdded = await db('cars').where('id', id).first();
	return carAdded;
};

module.exports = {
	getAll,
	getById,
	create
};

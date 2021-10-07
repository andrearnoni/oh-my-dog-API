const service = require('../services/dogService');
const messages = require('../helpers/validationMessages');

const getAllDogs = async (_req, res) => {
  try {
    const dogs = await service.getAllDogs();

    return res.status(200).json(dogs);
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;
    const dog = await service.getDogById(id);

    if (dog === null) return res.status(404).json(messages.DOG_NOT_FOUND);

    return res.status(200).json(dog);
  } catch (err) {
    return res.status(404).json(messages.DOG_NOT_FOUND);
  }
};

const createDogProfile = async (req, res) => {
  try {
    const { name, weight, age } = req.body;
    const { _id } = req.user;
    const id = _id.toString();
    const result = await service.createDogProfile({ name, weight, age, userId: id });

    if (result === false) return res.status(400).json(messages.INVALID_ENTRY);

    return res.status(201).json({ dog: {
      name,
      weight,
      age,
      userId: id,
      dogId: result.insertedId,
    } });
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

const updateDogProfile = async (req, res) => {
  try {
    const { name, weight, age } = req.body;
    const { id } = req.params;
    const { _id } = req.user;
    const getUserId = _id.toString();
    const dog = await service.getDogById(id);

    if (dog.userId !== getUserId) {
      res.status(403).json(messages.ACCESS_DENIED);
    } else {
      await service.updateDogProfile({ id, name, weight, age });
    }
    
    return res.status(200).json({
      _id: id,
      name,
      weight,
      age,
      userId: getUserId,
    })
  } catch (err) {
    console.log(messages.ERROR);
  }
};

module.exports = {
  getAllDogs,
  getDogById,
  createDogProfile,
  updateDogProfile,
};
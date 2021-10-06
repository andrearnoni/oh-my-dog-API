const service = require('../services/dogService');
const messages = require('../helpers/validationMessages');

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

module.exports = {
  createDogProfile,
};
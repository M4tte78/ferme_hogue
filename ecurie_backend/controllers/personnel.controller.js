const db = require('../models');
const Personnel = db.Personnel;

exports.getAll = async (req, res) => {
  try {
    const list = await Personnel.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const personnel = await Personnel.create(req.body);
    res.status(201).json(personnel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await Personnel.update(req.body, {
      where: { id_personnel: req.params.id }
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Personnel.destroy({
      where: { id_personnel: req.params.id }
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

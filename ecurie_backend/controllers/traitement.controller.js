const db = require('../models');
const Traitement = db.Traitement;

exports.getAll = async (req, res) => {
  try {
    const traitements = await Traitement.findAll();
    res.json(traitements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const traitement = await Traitement.create(req.body);
    res.status(201).json(traitement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await Traitement.update(req.body, {
      where: { id_traitement: req.params.id }
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Traitement.destroy({
      where: { id_traitement: req.params.id }
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
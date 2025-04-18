const db = require('../models');
const Loyer = db.Loyer;
const Depense = db.Depense;

exports.getLoyers = async (req, res) => {
  try {
    const loyers = await Loyer.findAll();
    res.json(loyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLoyer = async (req, res) => {
  try {
    const loyer = await Loyer.create(req.body);
    res.status(201).json(loyer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDepenses = async (req, res) => {
  try {
    const depenses = await Depense.findAll();
    res.json(depenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDepense = async (req, res) => {
  try {
    const depense = await Depense.create(req.body);
    res.status(201).json(depense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLoyersByUser = async (req, res) => {
  try {
    const loyers = await Loyer.findAll({
      where: { proprietaire_id: req.userId }
    });
    res.json(loyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
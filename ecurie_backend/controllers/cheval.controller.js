const db = require('../models');
const Cheval = db.Cheval;

exports.getAll = async (req, res) => {
  try {
    const chevaux = await Cheval.findAll();
    res.json(chevaux);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const cheval = await Cheval.create(req.body);
    res.status(201).json(cheval);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMesChevaux = async (req, res) => {
  try {
    const chevaux = await Cheval.findAll({ where: { proprietaire_id: req.userId } });
    res.json(chevaux);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    console.log("📩 Requête pour créer un cheval :", req.body);
    const cheval = await Cheval.create(req.body);
    res.status(201).json(cheval);
  } catch (error) {
    console.error("❌ ERREUR dans cheval.controller > create :", error);
    res.status(500).json({ error: error.message });
  }
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Utilisateur = db.Utilisateur;

exports.register = async (req, res) => {
  const { nom, prenom, email, mot_de_passe } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const newUser = await Utilisateur.create({ nom, prenom, email, mot_de_passe: hashedPassword });
    const role = await db.Role.findOne({ where: { nom: 'proprietaire' } });
    await newUser.addRole(role);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('❌ Erreur REGISTER :', error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const user = await Utilisateur.findOne({
      where: { email },
      include: db.Role
    });

    if (!user || !(await bcrypt.compare(mot_de_passe, user.mot_de_passe))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const roles = user.Roles.map(role => role.nom);
    const token = jwt.sign({ id: user.id_user, roles }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, roles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

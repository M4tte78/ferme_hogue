const db = require('../models');
const Utilisateur = db.Utilisateur;
const Role = db.Role;

exports.getAll = async (req, res) => {
    try {
      const include = [];
  
      if (req.query.role) {
        include.push({
          model: Role,
          where: { nom: req.query.role },
          through: { attributes: [] }
        });
      } else {
        include.push(Role);
      }
  
      const utilisateurs = await Utilisateur.findAll({ include });
      res.json(utilisateurs);
    } catch (error) {
      console.error('❌ ERREUR dans utilisateur.controller.js > getAll:', error);
      res.status(500).json({ error: error.message });
    }
  };
  

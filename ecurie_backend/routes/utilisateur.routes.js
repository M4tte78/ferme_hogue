const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/authz');
const utilisateurController = require('../controllers/utilisateur.controller');

// Récupérer tous les utilisateurs (option : filtrer par rôle)
router.get('/', verifyToken, isAdmin, utilisateurController.getAll);

module.exports = router;

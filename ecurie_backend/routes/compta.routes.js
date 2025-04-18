const express = require('express');
const router = express.Router();
const comptaController = require('../controllers/compta.controller');
const { verifyToken } = require('../middleware/auth');
const { isAdmin, isProprietaire } = require('../middleware/authz');

// Admin
router.get('/loyers', verifyToken, isAdmin, comptaController.getLoyers);
router.post('/loyers', verifyToken, isAdmin, comptaController.createLoyer);
router.get('/depenses', verifyToken, isAdmin, comptaController.getDepenses);
router.post('/depenses', verifyToken, isAdmin, comptaController.createDepense);

// Propriétaire
router.get('/mon-loyer', verifyToken, isProprietaire, comptaController.getLoyersByUser);

module.exports = router;
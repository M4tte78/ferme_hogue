const express = require('express');
const router = express.Router();
const traitementController = require('../controllers/traitement.controller');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/authz');

router.get('/', verifyToken, traitementController.getAll);
router.post('/', verifyToken, isAdmin, traitementController.create);
router.put('/:id', verifyToken, isAdmin, traitementController.update);
router.delete('/:id', verifyToken, isAdmin, traitementController.delete);

module.exports = router;

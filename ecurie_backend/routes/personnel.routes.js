const express = require('express');
const router = express.Router();
const personnelController = require('../controllers/personnel.controller');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/authz');

router.get('/', verifyToken, isAdmin, personnelController.getAll);
router.post('/ajout-personnel', verifyToken, isAdmin, personnelController.create);
router.put('/:id', verifyToken, isAdmin, personnelController.update);
router.delete('/:id', verifyToken, isAdmin, personnelController.delete);

module.exports = router;
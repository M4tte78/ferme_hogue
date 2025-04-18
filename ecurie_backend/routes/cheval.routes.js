const express = require('express');
const router = express.Router();
const chevalController = require('../controllers/cheval.controller');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, chevalController.getAll);
router.post('/', verifyToken, chevalController.create);
router.get('/mes-chevaux', verifyToken, chevalController.getMesChevaux);


module.exports = router;
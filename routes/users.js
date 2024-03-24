const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const userController = require('../controllers/users');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

router.post('/', isAuthenticated, validation.saveUser, userController.create);
router.put('/:id', isAuthenticated, validation.saveUser, userController.update);
router.delete('/:id', isAuthenticated, userController.deleteSingle);

module.exports = router;
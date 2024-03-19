const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const userController = require('../controllers/users');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

router.post('/', validation.saveUser, userController.create);
router.put('/:id', validation.saveUser, userController.update);
router.delete('/:id', userController.deleteSingle);

module.exports = router;
const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteSingle);

module.exports = router;
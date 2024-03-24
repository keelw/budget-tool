const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const budgetController = require('../controllers/budget');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', budgetController.getAll);
router.get('/:id', budgetController.getSingle);

router.post('/', validation.saveBudget, budgetController.create);
router.put('/:id', isAuthenticated, validation.saveBudget, budgetController.update);
router.delete('/:id', isAuthenticated, budgetController.deleteSingle);
router.delete('/deleteAll', isAuthenticated, budgetController.deleteAll);

module.exports = router;
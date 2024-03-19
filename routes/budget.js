const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const budgetController = require('../controllers/budget');

router.get('/', budgetController.getAll);
router.get('/:id', budgetController.getSingle);

router.post('/', validation.saveBudget, budgetController.create);
router.put('/:id', validation.saveBudget, budgetController.update);
router.delete('/:id', budgetController.deleteSingle);
router.delete('/deleteAll', budgetController.deleteAll);

module.exports = router;
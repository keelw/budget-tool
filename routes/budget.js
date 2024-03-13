const express = require('express');
const router = express.Router();

const budgetController = require('../controllers/budget');

router.get('/', budgetController.getAll);
router.get('/:id', budgetController.getSingle);

router.post('/', budgetController.create);
router.put('/:id', budgetController.update);
router.delete('/:id', budgetController.deleteSingle);
router.delete('/deleteAll', budgetController.deleteAll);

module.exports = router;
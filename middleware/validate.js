const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    email: 'required|email',
    firstName: 'required|string',
    lastName: 'required|string',
    creationDate: 'date',
    lastLogin: 'required|date',
    // oAuthId: '',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveBudget = (req, res, next) => {
    const validationRule = {
      budgetName: 'required|string',
      userId: 'required|string',
      category: 'required|string',
      amount: 'required|numeric',
      frequency: 'string',
      startDate: 'date',
      endDate: 'date',
      status: 'string',
      creationDate: 'required|date',
      lastUpdated: 'date',
      notes: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  

module.exports = {
  saveUser,
  saveBudget
};
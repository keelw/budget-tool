mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Budget']
    const result = await mongodb.getDatabase().db().collection('cse341-budget').find();
    result.toArray().then((budget) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(budget);
    })
    
    try {
        const result = await mongodb.getDatabase().db().collection('cse341-budget').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching all budget items:', error);
        res.status(500).json({ message: 'Internal server error' });    
    }
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Budget']
    
    // data validation for budget ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid budget id to find a budget item.');
    }
    
    try {
        const budgetId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('cse341-budget').findOne({ _id: budgetId });
        if (!result) {
            res.status(404).json({ message: 'Budget item not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);    
    } catch (error) {
        console.error('Error fetching single budget item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const create = async(req, res) => {
    //#swagger.tags=['Budget]
    const budget = {
        budgetName: req.body.budgetName,
        userId: req.body.userId,
        category: req.body.category,
        amount: req.body.amount,
        frequency: req.body.frequency,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        creationDate: req.body.creationDate,
        lastUpdated: req.body.lastUpdated,
        notes: req.body.notes
    };

    const response = await mongodb.getDatabase().db().collection('cse341-budget').insertOne(budget);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something went wrong when adding a budget item.');
    }
};

const update = async(req, res) => {
    //#swagger.tags=['Budget']
    
    // data validation for budget ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid budget id to find a budget item.');
    }

    const budgetId = new ObjectId(req.params.id);
    const budget = {
        budgetName: req.body.budgetName,
        userId: req.body.userId,
        category: req.body.category,
        amount: req.body.amount,
        frequency: req.body.frequency,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        creationDate: req.body.creationDate,
        lastUpdated: req.body.lastUpdated,
        notes: req.body.notes
    };

    const response = await mongodb.getDatabase().db().collection('cse341-budget').replaceOne({ _id: budgetId }, budget);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something went wrong when updating the budget item.');
    }

};

const deleteSingle = async(req, res) => {
    //#swagger.tags=['Budget']
    
    // data validation for budget ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid budget id to find a budget item.');
    }

    const budgetId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('cse341-budget').deleteOne({ _id: budgetId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something went wrong when deleting the budget item.');
    }

};

const deleteAll = async(req, res) => {
    
};

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    deleteSingle,
    deleteAll
}
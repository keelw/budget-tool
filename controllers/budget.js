mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async(req, res) => {
    //#swagger.tags=['Budget']
    const result = await mongodb.getDatabase().db().collection('cse341-budget').find();
    result.toArray().then((budget) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(budget);
    })
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Budget']
    const budgetId = ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('cse341-budget').findOne({ _id: budgetId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
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

    const response = await mongodb.getDatabase().db().collection('budget').insertOne(budget);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something went wrong when adding a budget item.');
    }
};

const update = async(req, res) => {
    
};

const deleteSingle = async(req, res) => {
    
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
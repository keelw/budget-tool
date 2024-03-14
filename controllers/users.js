mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('cse341-users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

const getSingle = async(req, res) => {
    //#swagger.tags=['users']
    const userId = ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('cse341-users').findOne({ _id: userId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const create = async(req, res) => {
    //#swagger.tags=['users]
    const user = {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        creationDate: req.body.creationDate,
        lastLogin: req.body.lastLogin,
        oAuthId: req.body.oAuthId,
    };

    const response = await mongodb.getDatabase().db().collection('cse341-users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something went wrong when adding a user.');
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
    deleteSingle
}
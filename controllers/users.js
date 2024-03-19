mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('cse341-users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Internal server error' });    
    }
};

const getSingle = async(req, res) => {
    //#swagger.tags=['users']

    // data validation for user ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to find a user.');
    }
    
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('cse341-users').findOne({ _id: userId });
        if (!result) {
            res.status(404).json({ message: 'User not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);    
    } catch (error) {
        console.error('Error fetching single user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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
    //#swagger.tags=['users]

    // data validation for user ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to find a user.');
    }

    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        creationDate: req.body.creationDate,
        lastLogin: req.body.lastLogin,
        oAuthId: req.body.oAuthId,
    };

    const response = await mongodb.getDatabase().db().collection('cse341-users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something went wrong when updating the user.');
    }
};

const deleteSingle = async(req, res) => {
    //#swagger.tags=['users]

    // data validation for user ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to find a user.');
    }

    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('cse341-users').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something went wrong when deleting the user.');
    }

};

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    deleteSingle
}
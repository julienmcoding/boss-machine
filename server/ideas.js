const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send()
    };
});

//GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'));
});

//POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

//GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res) => {
    res.send(req.idea);
});

//PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

//DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea) {
        res.status(204);
    } else {
        res.status(500);
    };
    res.send();
});
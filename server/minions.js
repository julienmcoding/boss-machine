const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db');


minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    };
});

//GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('minions'));
});


// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

//GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res) => {
    res.send(req.minion);
});

//PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

//DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res) => {
    const minionDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (minionDeleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

//GET /api/minions/:minionId/work to get an array of all work for the specified minon
minionsRouter.get('/:minionId/work', (req, res) => {
    const minionWork = getAllFromDatabase('work').filter((workUnit) => {
        return workUnit.minionId === req.params.minionId;
    });
    res.send(minionWork);
});

//POST /api/minions/:minionId/work to create a new work object and save it to the database.
minionsRouter.post('/:minionId/work', (req, res) => {
    const addedWork = req.body;
    addedWork.minionId = req.params.minionId;
    const newWork = addToDatabase('work', addedWork);
    res.status(201).send(newWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
  });

//PUT /api/minions/:minionId/work/:workId to update a single work by id.
minionsRouter.put('/:minionId/work/:workId', (req, res) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
    let updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
    };
});

//DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
    const workDeleted = deleteFromDatabasebyId('work', req.params.workId);
    if (workDeleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});
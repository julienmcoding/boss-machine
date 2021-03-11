const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const { getAllFromDatabase,
    createMeeting,
    deleteAllFromDatabase,
    addToDatabase
} = require('./db');

//GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
});

//POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res) => {
    let newMeetings = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeetings);
});

//DELETE /api/meetings to delete _all_ meetings from the database.
meetingsRouter.delete('/', (req, res) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
});
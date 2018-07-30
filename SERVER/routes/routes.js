import express from 'express';
import EntriesController from '../controllers/entriesController';
import UsersController from '../controllers/usersController';
import DbQueries from '../db/dbQueries';


const {
  fetchUserEntries, fetchEntryById, createNewEntry, modifyEntry,
} = EntriesController;
const { login, register } = UsersController;
const {
  addUserToDb, getUser, getEntriesByUserId, getEntryById, addEntryToDb, modifyDbEntry
} = DbQueries;


const router = express.Router();
router.post('/auth/signup', addUserToDb, register);
router.post('/auth/login', getUser, login);
router.get('/entries/user/:userId', getEntriesByUserId, fetchUserEntries);
router.get('/entries/:entryId', getEntryById, fetchEntryById);
router.post('/entries', addEntryToDb, createNewEntry);
router.put('/entries/:entryId', modifyDbEntry, modifyEntry);

export default router;

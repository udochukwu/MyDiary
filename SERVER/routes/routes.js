import express from 'express';
import EntriesController from '../controllers/entriesController';
import UsersController from '../controllers/usersController';
import DbQueries from '../db/dbQueries';
import Authenticator from '../middlewares/authenticator';
import Validator from '../helpers/validator';


const {
  fetchUserEntries, fetchEntryById, createNewEntry, modifyEntry,
} = EntriesController;
const { login, register } = UsersController;
const {
  addUserToDb, getUser, getEntriesByUserId, getEntryById, addEntryToDb, modifyDbEntry
} = DbQueries;
const { checkToken } = Authenticator;
const { regValidation, loginValidation } = Validator;

const router = express.Router();
router.post('/auth/signup', regValidation, addUserToDb, register);
router.post('/auth/login', loginValidation, getUser, login);
router.get('/entries/user/:userId', checkToken, getEntriesByUserId, fetchUserEntries);
router.get('/entries/:entryId', checkToken, getEntryById, fetchEntryById);
router.post('/entries', checkToken, addEntryToDb, createNewEntry);
router.put('/entries/:entryId', checkToken, modifyDbEntry, modifyEntry);

export default router;

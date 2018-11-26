import express from 'express';
import EntriesController from '../controllers/entriesController';
import UsersController from '../controllers/usersController';
import Authenticator from '../middlewares/authenticator';
import Validator from '../helpers/validator';


const {
  fetchUserEntries,fetchEntryById, createNewEntry, modifyEntry, deleteEntry
} = EntriesController;
const { login, register } = UsersController;
const { checkToken } = Authenticator;
const { regValidation, loginValidation, entriesValidation } = Validator;

const router = express.Router();
router.post('/auth/signup', regValidation, register);
router.post('/auth/login', loginValidation, login);
router.get('/entries/', checkToken, fetchUserEntries);
router.get('/entries/:entryId', checkToken, fetchEntryById);
router.post('/entries', checkToken, entriesValidation, createNewEntry);
router.put('/entries/:entryId', checkToken, entriesValidation, modifyEntry);
router.delete('/entries/:entryId', checkToken, deleteEntry);

export default router;

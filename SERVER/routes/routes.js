import express from 'express';
import EntriesController from '../controllers/entriesController';
import UsersController from '../controllers/usersController';

const {
  fetchUserEntries, fetchEntryById, createNewEntry
} = EntriesController;
const { registerUser, login } = UsersController;

const router = express.Router();
router.post('/auth/signup', registerUser);
router.post('/auth/login', login);
router.get('/entries/user/:userId', fetchUserEntries);
router.get('/entries/:entryId', fetchEntryById);
router.post('/entries', createNewEntry);

export default router;

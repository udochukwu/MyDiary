import express from 'express';
import EntriesController from '../controllers/entriesController';
import UsersController from '../controllers/usersController';

const {
  fetchAllEntries, fetchEntryById, createEntry, updateEntry
} = EntriesController;
const { registerUser, login } = UsersController;

const router = express.Router();
router.post('/auth/signup', registerUser);
router.post('/auth/login', login);
router.get('/entries', fetchAllEntries);
router.get('/entries/:entryId', fetchEntryById);
router.post('/entries', createEntry);
router.put('/entries/:entryId', updateEntry);


export default router;

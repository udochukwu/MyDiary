import express from 'express';
import EntriesController from '../controllers/entriesController';


const router = express.Router();
router.get('/entries',fetchAllEntries);


export default router;

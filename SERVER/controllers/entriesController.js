import Queries from '../db/queries';
import db from '../db/dbConfig';

const {
  queryEntriesByUserId, queryEntriesByEntryId, insertIntoEntries, updateEntry, deleteEntry
} = Queries;

class EntriesController {
  static fetchUserEntries(req, res) {
    const userId = req.user.userid;
    db.query(queryEntriesByUserId, [userId], (err, dbRes) => {
      if (err) {
        return res.json({ sucess: false, message: 'Entries could not be fetched', err });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount === 0) {
        return res.status(200).json({ success: false, message: 'No Entries for user', rows });
      }
      return res.status(200).json({ success: true, message: 'Entries successfully Loaded', entries: rows });
    });
  }

  static fetchEntryById(req, res) {
    const userId = req.user.userid;
    const { entryId } = req.params;

    db.query(queryEntriesByEntryId, [userId, entryId], (err, dbRes) => {
      if (err) {
        return res.json({ sucess: false, message: 'Entry could not be fetched', err });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount === 0) {
        return res.status(404).json({ success: false, message: 'Entry not found', rows });
      }
      return res.status(200).json({ success: true, message: 'Entry successfully Loaded', entries: rows });
    });
  }

  static createNewEntry(req, res) {
    const { entryTitle, entryContent } = req.body;
    const userId = req.user.userid;
    db.query(insertIntoEntries, [userId, entryTitle, entryContent], (err, dbRes) => {
      if (err) {
        return res.json({ success: false, message: 'Could not post data', err });
      }
      const { rows } = dbRes;
      const entry = rows[0];
      return res.status(201).send({ success: true, message: 'New Enry Was succesfully added', entry });
    });
  }

  static modifyEntry(req, res) {
    const { entryTitle, entryContent } = req.body;
    const userId = req.user.userid;
    const { entryId } = req.params;

    db.query(updateEntry, [entryTitle, entryContent, entryId, userId], (err, dbRes) => {
      if (err) {
        return res.json({ sucess: false, message: 'Could not update entry', err });
      }
      return res.status(201).send({ success: true, message: 'Entry Was succesfully updated', dbRes });
    });
  }

  static deleteEntry(req, res) {
    const userId = req.user.userid;
    const { entryId } = req.params;
    db.query(deleteEntry, [entryId, userId], (err, dbRes) => {
      if (err) {
        return res.json({ sucess: false, message: 'Could not Delete entry', err });
      }
      return res.status(200).send({ success: true, message: 'Entry Was succesfully deleted', dbRes });
    });
  }
}

export default EntriesController;

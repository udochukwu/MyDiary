import Queries from '../db/queries';
import db from '../db/dbConfig';

const { queryEntriesByUserId } = Queries;
class EntriesController {
  static fetchUserEntries(req, res) {
    const userId = req.user.userid;
    db.query(queryEntriesByUserId, [userId], (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Entries could not be fetched', err });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount === 0) {
        return res.status(200).json({ success: false, message: 'No Entries for user', rows });
      }
      return res.status(200).json({success: true, message: 'Entries successfully Loaded', entries: rows });
    });
  }

  static fetchEntryById(req, res) {
    const { rows, rowCount } = res.locals.dbRes;

    if (rowCount === 0) {
      return res.status(200).json({ message: 'No Entry found', rows });
    }
    return res.status(200).json({ message: 'Entry successfully Loaded', entry: rows });
  }

  static createNewEntry(req, res) {
    const { rows } = res.locals.dbRes;
    const entry = rows[0];
    return res.status(201).send({ message: 'New Enry Was succesfully added', entry });
  }

  static modifyEntry(req, res) {
    return res.status(201).send({ message: 'New Enry Was succesfully updated' });
  }
}

export default EntriesController;

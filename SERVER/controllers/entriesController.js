import db from '../db/dbConfig';


/**
  * @class entriesController
  * @description CRUD operations on Entries
  */
class EntriesController {
  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and list of all entries*
  * @memberOf EntriesController
  */
  static fetchUserEntries(req, res) {
    db.query(`SELECT * FROM entries WHERE userId = ${req.params.userId}`, (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Entries could not be fetched', err });
      }
      const response = dbRes;
      if (response.rowCount === 0) {
        return res.status(404).json({ message: 'No entry available at this time', entries: response.rows });
      }
      return res.json({ message: `Entries list for user with ID ${req.params.userId} loaded successfully`, entries: response.rows });
    });
  }

  /**
    * @static
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - status Message and the particular entry by id.
    * @memberOf entriesController
    */
  static fetchEntryById(req, res) {
    db.query(`SELECT * FROM entries WHERE entryId = ${req.params.entryId}`, (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Entry could not be fetched', err });
      }
      const response = dbRes;
      if (response.rowCount === 0) {
        return res.status(404).json({ message: 'No entry available at this time', entries: response.rows });
      }
      return res.json({ message: `Entry  with ID ${req.params.entryId} loaded successfully`, entries: response.rows });
    });
  }

  /**
   * @static
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status Message and the particular entry created.
   * @memberOf entriesController
   */
  static createNewEntry(req, res) {
    const dateTime = new Date();
    const data = {
      userId: req.body.userId,
      entryTitle: req.body.entryTitle,
      entryContent: req.body.entryContent,
      dateTime
    };
    db.query('INSERT INTO entries(userId, entryTitle, entryContent, dateTime) values($1, $2, $3, $4)', [data.userId, data.entryTitle, data.entryContent, data.dateTime], (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Could not create new Entry', err });
      }
      return res.status(201).send({ message: 'New Enry Was succesfully added', dbRes });
    });
  }
}

export default EntriesController;

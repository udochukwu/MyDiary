import entries from '../dummyDatabase/dummyDatabase';

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
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and list of all entries*
  * @memberOf EntriesController
  */
  static fetchAllEntries(req, res) {
    if (entries.length === 0) {
      return res.status(404).json({ message: 'No entry available at this time', entries });
    }
    return res.json({ message: 'Entries list loaded successfully', entries });
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
   * @memberOf BusinessController
   */
  static createEntry(req, res) {
    const entryId = entries.length === 0 ? 1
      : entries.length + 1;
    const dateTime = new Date();
    const newEntry = req.body;
    newEntry.entryId = entryId;
    newEntry.dateTime = dateTime;
    entries.push(newEntry);
    return res.status(201).send({ message: 'New Entry successfully added', newEntry });
  }

  /**
    * @static
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - status Message and the particular updated entry created.
    * @memberOf BusinessController
    */
  static updateEntry(req, res) {
    const id = req.params.entryId;
    const entry = entries.find(entryItem => +entryItem.entryId === +id);
    Object.assign(entry, req.body);
    return res.json({ message: 'entry updated successfully', entry });
  }
}

export default EntriesController;

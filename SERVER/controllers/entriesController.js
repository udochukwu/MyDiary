class EntriesController {
  static fetchUserEntries(req, res) {
    const { rows, rowCount } = res.locals.dbRes;

    if (rowCount === 0) {
      return res.status(200).json({ message: 'No Entries for user', rows });
    }
    return res.status(200).json({ message: 'Entries successfully Loaded', entries: rows });
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

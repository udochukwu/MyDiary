
import db from './dbConfig';

/**
  * @class usersController
  * @description CRUD operations on users and entries
  */
class DbQueries {
  // add a user to database
  static addUserToDb(req, res, next) {
    const registerdon = new Date();
    const { email, password } = req.body;
    db.query('INSERT INTO users(email, password, registerdon) values($1, $2, $3) RETURNING *', [email, password, registerdon], (err, dbRes) => {
      if (err) {
        if (err.code !== '23505') {
          return res.json({ message: 'Could not post data', err });
        }
        return res.status(201).json({ message: 'Email Address Already Exists on our database' });
      }
      res.locals.dbRes = dbRes;
      next();
    });
  }

  // get a user from database
  static getUser(req, res, next) {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}' `, (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Could not post data', err });
      }
      res.locals.dbRes = dbRes;
      next();
    });
  }

  // fetch entries by userID
  static getEntriesByUserId(req, res, next) {
    db.query(`SELECT * FROM entries WHERE userId = ${req.params.userId}`, (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Entries could not be fetched', err });
      }
      res.locals.dbRes = dbRes;
      next();
    });
  }

  // fetch entry by entryID
  static getEntryById(req, res, next) {
    db.query(`SELECT * FROM entries WHERE entryId = ${req.params.entryId}`, (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Entries could not be fetched', err });
      }
      res.locals.dbRes = dbRes;
      next();
    });
  }

  // add an entry to database
  static addEntryToDb(req, res, next) {
    const dateTime = new Date();
    const { userId, entryTitle, entryContent } = req.body;
    db.query('INSERT INTO entries(userId, entryTitle, entryContent, dateTime) values($1, $2, $3, $4) RETURNING *', [userId, entryTitle, entryContent, dateTime], (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Could not post data', err });
      }
      res.locals.dbRes = dbRes;
      next();
    });
  }

  // add an entry to database
  static modifyDbEntry(req, res, next) {
    const { entryTitle, entryContent } = req.body;
    db.query(`UPDATE entries SET entryTitle = '${entryTitle}', entryContent = '${entryContent}' WHERE entryId = ${req.params.entryId}`, (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Could not update entry', err });
      }
      res.locals.dbRes = dbRes;
      next();
    });
  }
}


export default DbQueries;

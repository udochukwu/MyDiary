
import db from './dbConfig';

/**
  * @class usersController
  * @description CRUD operations on users and entries
  */
class DbQueries {
  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @param {object} next - The Callback argument to the middleware function
  *
  * @returns {object} - status Message and request response*
  * @memberOf DbQueries
  */
  static addUserToDb(req, res) {
    const registerdon = new Date();
    const { email, password } = req.body;
    db.query('INSERT INTO users(email, password, registerdon) values($1, $2, $3) RETURNING *', [email, password, registerdon], (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Could not post data', err });
      }
      const response = dbRes;
      return res.status(201).json({ message: 'User successfully registerd', response });
    });
  }
}


export default DbQueries;

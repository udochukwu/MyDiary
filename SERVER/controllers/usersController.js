
import db from '../db/dbConfig';

/**
  * @class usersController
  * @description CRUD operations on users
  */
class UsersController {
  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and list of all users*
  * @memberOf UsersController
  */
  static login(req, res) {
    const data = { email: req.body.email, password: req.body.password };
    db.query(`SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}' `, (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Could not post data', err });
      }
      const response = dbRes;
      const user = dbRes.rows[0];
      if (response.rowCount === 0) {
        return res.status(404).json({ message: 'Incorrect Email or password', response });
      }

      return res.status(200).json({ message: 'User successfully Logged In', user });
    });
  }
}


export default UsersController;

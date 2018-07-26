
const db = require('../db/dbConfig');


/**
  * @class usersController
  * @description CRUD operations on users
  */
class UsersController {
  /**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and request response*
  * @memberOf UsersController
  */
  static registerUser(req, res) {
    const registerdon = new Date();
    const data = { email: req.body.email, password: req.body.password, registerdon };
    db.query('INSERT INTO users(email, password, registerdon) values($1, $2, $3)', [data.email, data.password, data.registerdon], (err, dbRes) => {
      if (err) {
        return res.json({ message: 'Could not post data', err });
      }
      const response = dbRes;
      return res.status(200).json({ message: 'User successfully registerd', response });
    });
  }
}


export default UsersController;

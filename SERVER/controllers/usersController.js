
import Authenticator from '../middlewares/authenticator';
import Queries from '../db/queries';
import db from '../db/dbConfig';


const { generateToken } = Authenticator;
const { insertIntoUsers, queryUsersByEmail } = Queries;


class UsersController {
  static login(req, res) {
    const { email, password } = req.body;
    db.query(queryUsersByEmail, [email, password], (err, dbRes) => {
      const errors = {};
      if (err) {
        errors.unknown = 'Cannot signup at the moment';
        return res.json({ success: false, err, errors });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount !== 1) {
        errors.email = 'Incorrect Email or password';
        return res.status(401).json({ success: false, errors });
      }
      const user = rows[0];
      const { userid } = rows[0];
      const token = generateToken({ email, userid });
      res.status(200).json({
        success: true, message: 'User successfully Logged In', user, token
      });
    });
  }

  static register(req, res) {
    const { email, password } = req.body;
    db.query(insertIntoUsers, [email, password], (err, dbRes) => {
      if (err) {
        const errors = {};
        if (err.code !== '23505') {
          errors.unknown = 'Cannot signup at the moment';
          return res.json({ message: 'Could not post data', err, errors });
        }
        errors.email = 'Email Address Already Exists on our database';
        return res.status(409).json({ success: false, message: 'Email Address Already Exists on our database', errors });
      }
      const { rows } = dbRes;
      const user = rows[0];
      const { userid } = rows[0];

      const token = generateToken({ email, userid });
      return res.status(201).json({
        success: true, message: 'User successfully Registerd', user, token
      });
    });
  }
}


export default UsersController;

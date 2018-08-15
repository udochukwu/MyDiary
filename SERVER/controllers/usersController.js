
import Authenticator from '../middlewares/authenticator';
import Queries from '../db/queries';
import db from '../db/dbConfig';


const { generateToken } = Authenticator;
const { insertIntoUsers, queryUsersByEmail } = Queries;


class UsersController {
  static login(req, res) {
    const { email, password } = req.body;
    db.query(queryUsersByEmail, [email, password], (err, dbRes) => {
      if (err) {
        return res.json({ success: false, message: 'Could not get data', err });
      }
      const { rows, rowCount } = dbRes;
      if (rowCount !== 1) {
        return res.status(401).json({ success: false, message: 'Incorrect Email or password' });
      }
      const { userid } = rows[0];
      const token = generateToken({ email, userid });
      res.status(200).json({
        success: true, message: 'User successfully Logged In', token
      });
    });
  }

  static register(req, res) {
    const { email, password } = req.body;
    db.query(insertIntoUsers, [email, password], (err, dbRes) => {
      if (err) {
        if (err.code !== '23505') {
          return res.json({ message: 'Could not post data', err });
        }
        const errors = {};
        errors.email = 'Email Address Already Exists on our database';
        return res.status(409).json({ success: false, message: 'Email Address Already Exists on our database', errors });
      }
      const { rows } = dbRes;
      const { userid } = rows[0];

      const token = generateToken({ email, userid });
      return res.status(201).json({
        success: true, message: 'User successfully Registerd', token
      });
    });
  }
}


export default UsersController;

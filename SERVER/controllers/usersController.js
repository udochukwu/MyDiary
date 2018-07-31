
import Authenticator from '../middlewares/authenticator';

const { generateToken } = Authenticator;

class UsersController {
  static login(req, res) {
    const { rows, rowCount } = res.locals.dbRes;

    const user = rows[0];
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Incorrect Email or password', rows });
    }
    const token = generateToken(user);
    res.status(200).json({ message: 'User successfully Logged In', user, token });
  }

  static register(req, res) {
    const { rows, rowCount } = res.locals.dbRes;

    const user = rows[0];
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Incorrect Email or password', rows });
    }
    return res.status(201).json({ message: 'User successfully Registerd', user });
  }
}


export default UsersController;


class UsersController {
  static login(req, res) {
    const { rows, rowCount } = res.locals.dbRes;

    const user = rows[0];
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Incorrect Email or password', rows });
    }
    return res.status(200).json({ message: 'User successfully Logged In', user });
  }

  static register(req, res) {
    const { rows, rowCount } = res.locals.dbRes;

    const user = rows[0];
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Incorrect Email or password', rows });
    }
    return res.status(200).json({ message: 'User successfully Registerd', user });
  }
}


export default UsersController;

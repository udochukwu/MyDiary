
import jwt from 'jsonwebtoken';

import 'dotenv/config';

class Authenticator {
  static generateToken(req, res, next) {
    const { email, password } = req.body;
    const user = { email, password };
    const token = jwt.sign({ user }, process.env.JWTKEY, { expiresIn: '1200s' });
    res.locals.token = token;
    next();
  }
}


export default Authenticator;

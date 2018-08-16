import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {
  generateToken(user) {
    const token = jwt.sign({ user }, process.env.JWTKEY, { expiresIn: '2000s' });
    return token;
  },

  checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(403)
        .json({
          success: false,
          error: 'Missing Token'
        });
    } else {
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
        if (err) {
          if (err.message.includes('signature')) {
            res.status(403)
              .json({
                success: false,
                error: 'Invalid token supplied',
              });
          } else {
            res.status(403)
              .json({
                success: false,
                error: err,
              });
          }
        }
        req.user = decoded.user;

        next();
      });
    }
  }
};

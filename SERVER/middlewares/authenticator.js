import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {
  generateToken(user) {
    const token = jwt.sign({ user }, process.env.JWTKEY, { expiresIn: '1200s' });
    return token;
  },

  checkToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.token;
    if (!token) {
      res.status(403)
        .json({
          success: false,
          message: 'Missing Token'
        });
    } else {
      jwt.verify(token, process.env.JWTKEY, (err, user) => {
        if (err) {
          if (err.message.includes('signature')) {
            res.status(403)
              .json({
                message: 'Invalid token supplied',
              });
          } else {
            res.status(403)
              .json({
                message: err,
              });
          }
        }
        req.user = user;
        return next();
      });
    }
  }
};
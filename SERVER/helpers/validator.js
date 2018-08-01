import validator from 'validator';

export default {
  regValidation(req, res, next) {
    const errors = [];
    const { email, password, confirmPassword } = req.body;
    if (!validator.isEmail(email)) {
      errors.email = 'invalid email';
    }
    if (validator.isEmpty(password)) {
      errors.password = 'Password Empty';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Password does not match Empty';
    }
    if (errors === undefined || errors.length === 0) {
      next();
    } else {
      res.status(406).json({ message: 'Please check your inputs', errors });
    }
  }
};

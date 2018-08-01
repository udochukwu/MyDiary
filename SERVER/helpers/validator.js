import validator from 'validator';

export default {
  //validate registration inputs
  regValidation(req, res, next) {
    const errors = {};
    const { email, password, confirmPassword } = req.body;
    
    if ((!validator.isEmail(email)) || (validator.isEmpty(email)) ) {
      errors.email = 'invalid email';
    }
    if (validator.isEmpty(password)) {
      errors.password = 'Password Empty';
    }
    if (validator.isEmpty(confirmPassword)) {
      errors.confirmPassword = 'Please Retype Password';
    }else{
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Password does not match';
      }
    }
    
    // check if there where any errors
    const errorLength = Object.keys(errors).length;
    if (errorLength === 0){
      next();
    } else {
      res.status(406).json({ success: false, message: 'Please check your inputs', errors });
    }
  },

  //validate login inputs
  loginValidation(req, res, next) {
    const errors = {};
    const { email, password} = req.body;
    
    if ((!validator.isEmail(email)) || (validator.isEmpty(email)) ) {
      errors.email = 'invalid email';
    }
    if (validator.isEmpty(password)) {
      errors.password = 'Password Empty';
    }
    
    const errorLength = Object.keys(errors).length;
    if (errorLength === 0){
      next();
    } else {
      res.status(406).json({ success: false, message: 'Please check your inputs', errors });
    }
  }
};

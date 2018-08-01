import validator from 'validator';

export default {
  regValidation(req, res, next) {
    console.log(req.body);    
    const errors = {};
    const { email, password, confirmPassword } = req.body;
    if (!validator.isEmail(email)) {
      errors['email'] = 'invalid email';
    }
    if (validator.isEmpty(password)) {
      errors['password'] = 'Password Empty';
    }
    if (password !== confirmPassword) {
      errors['confirmPassword'] = 'Password does not match';
    }

    if ( errors.length === 0) {
    console.log('no errors');  
      next();
    } else {
    console.log(`length  equals ${errors.length}`);              
      
    console.log(errors);            
      res.status(406).json({ message: 'Please check your inputs', errors });
    }
  }
};
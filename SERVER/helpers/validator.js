
export default {
  regValidation(req, res, next) {
    const{email, password, confirm_password } = req.body;

    
    next();
  }
};

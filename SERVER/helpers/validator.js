export default {
  // validate registration inputs


  regValidation(req, res, next) {
    const errors = {};
    const { email, password, confirmPassword } = req.body;
    // https://www.w3resource.com/javascript/form/email-validation.php
    if (email) {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.email = 'invalid email';
      } else if (email === '') {
        errors.email = 'invalid email';
      } else if (email.length > 30) {
        errors.email = 'Email too long';
      }
    } else {
      errors.email = 'Email is not defined';
    }

    if (password) {
      if (password === '') {
        errors.password = 'Password Empty';
      } else if (password.length < 8) {
        errors.password = 'password too Short';
      } else if (password.length > 20) {
        errors.password = 'password too long';
      } else if (/\s/.test(password)) {
        errors.password = 'space not allowed on password';
      }
    } else {
      errors.password = 'Password is not defined';
    }

    if (confirmPassword) {
      if (confirmPassword === '') {
        errors.confirmPassword = 'Please Retype Password';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password does not match';
      }
    } else {
      errors.confirmPassword = 'Undefined field confirmPassword';
    }


    // check if there where any errors
    const errorLength = Object.keys(errors).length;
    if (errorLength === 0) {
      next();
    } else {
      res.status(400).json({ success: false, message: 'Please check your inputs', errors });
    }
  },

  // validate login inputs
  loginValidation(req, res, next) {
    const errors = {};
    const { email, password } = req.body;

    // https://www.w3resource.com/javascript/form/email-validation.php
    if (email) {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.email = 'invalid email';
      } else if (email === '') {
        errors.email = 'invalid email';
      }
    } else {
      errors.email = 'Email is not defimed';
    }

    if (password) {
      if (password === '') {
        errors.password = 'Password Empty';
      } else if (/\s/.test(password)) {
        errors.password = 'space not allowed on password';
      }
    } else {
      errors.password = 'Password is not defined';
    }

    const errorLength = Object.keys(errors).length;
    if (errorLength === 0) {
      next();
    } else {
      res.status(400).json({ success: false, message: 'Please check your inputs', errors });
    }
  },

  // validate login inputs
  entriesValidation(req, res, next) {
    const errors = {};
    const { entryTitle, entryContent } = req.body;
    const userId = req.user.userid;

    if (entryTitle) {
      if (entryTitle === '') {
        errors.entryTitle = 'Entry title Empty';
      } else if (entryTitle.length > 30) {
        errors.entryTitle = 'Entry title too long';
      }
    } else {
      errors.entryTitle = 'Entry Title is not defined';
    }

    if (entryContent) {
      req.body.entryContent = entryContent;
      if (entryContent === '') {
        errors.entryContent = 'Entry content Empty';
      }
    } else {
      errors.entryContent = 'Entry content is not defined';
    }

    if (userId) {
      if (userId === '') {
        errors.userId = 'User ID Empty';
      } else if (!Number.isInteger(+userId)) {
        errors.userId = 'Invalid UserID';
      }
    } else {
      errors.entryContent = 'User ID is not defined';
    }

    const errorLength = Object.keys(errors).length;
    if (errorLength === 0) {
      next();
    } else {
      res.status(400).json({ success: false, message: 'Please check your inputs', errors });
    }
  }
};

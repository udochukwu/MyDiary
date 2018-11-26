'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // validate registration inputs


  regValidation: function regValidation(req, res, next) {
    var errors = {};
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password,
        confirmPassword = _req$body.confirmPassword;
    // https://www.w3resource.com/javascript/form/email-validation.php

    if (email) {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(email)) {
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
      } else if (password.length > 15) {
        errors.password = 'password too long';
      } else if (/\s/.test(password)) {
        errors.password = 'space not allowed on password';
      }
    } else {
      errors.password = 'Password muust be defined';
    }

    if (confirmPassword) {
      if (confirmPassword === '') {
        errors.confirmPassword = 'Please Retype Password';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password does not match';
      }
    } else {
      errors.confirmPassword = 'confirm Password is missing';
    }

    // check if there where any errors
    var errorLength = Object.keys(errors).length;
    if (errorLength === 0) {
      next();
    } else {
      res.status(400).json({ success: false, message: 'Please check your inputs', errors: errors });
    }
  },


  // validate login inputs
  loginValidation: function loginValidation(req, res, next) {
    var errors = {};
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

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

    var errorLength = Object.keys(errors).length;
    if (errorLength === 0) {
      next();
    } else {
      res.status(400).json({ success: false, message: 'Please check your inputs', errors: errors });
    }
  },


  // validate login inputs
  entriesValidation: function entriesValidation(req, res, next) {
    var errors = {};
    var _req$body3 = req.body,
        entryTitle = _req$body3.entryTitle,
        entryContent = _req$body3.entryContent;

    var userId = req.user.userid;

    if (entryTitle) {
      if (entryTitle === '') {
        errors.entryTitle = 'Entry title Empty';
      } else if (entryTitle.length > 100) {
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

    var errorLength = Object.keys(errors).length;
    if (errorLength === 0) {
      next();
    } else {
      res.status(400).json({ success: false, message: 'Please check your inputs', errors: errors });
    }
  }
};
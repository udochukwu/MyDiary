'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _entriesController = require('../controllers/entriesController');

var _entriesController2 = _interopRequireDefault(_entriesController);

var _usersController = require('../controllers/usersController');

var _usersController2 = _interopRequireDefault(_usersController);

var _authenticator = require('../middlewares/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

var _validator = require('../helpers/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchUserEntries = _entriesController2.default.fetchUserEntries,
    fetchEntryById = _entriesController2.default.fetchEntryById,
    createNewEntry = _entriesController2.default.createNewEntry,
    modifyEntry = _entriesController2.default.modifyEntry,
    deleteEntry = _entriesController2.default.deleteEntry;
var login = _usersController2.default.login,
    register = _usersController2.default.register;
var checkToken = _authenticator2.default.checkToken;
var regValidation = _validator2.default.regValidation,
    loginValidation = _validator2.default.loginValidation,
    entriesValidation = _validator2.default.entriesValidation;


var router = _express2.default.Router();
router.post('/auth/signup', regValidation, register);
router.post('/auth/login', loginValidation, login);
router.get('/entries/', checkToken, fetchUserEntries);
router.get('/entries/:entryId', checkToken, fetchEntryById);
router.post('/entries', checkToken, entriesValidation, createNewEntry);
router.put('/entries/:entryId', checkToken, entriesValidation, modifyEntry);
router.delete('/entries/:entryId', checkToken, deleteEntry);

exports.default = router;
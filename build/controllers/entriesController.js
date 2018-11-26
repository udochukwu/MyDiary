'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queries = require('../db/queries');

var _queries2 = _interopRequireDefault(_queries);

var _dbConfig = require('../db/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var queryEntriesByUserId = _queries2.default.queryEntriesByUserId,
    queryEntriesByEntryId = _queries2.default.queryEntriesByEntryId,
    insertIntoEntries = _queries2.default.insertIntoEntries,
    updateEntry = _queries2.default.updateEntry,
    _deleteEntry = _queries2.default.deleteEntry;

var EntriesController = function () {
  function EntriesController() {
    _classCallCheck(this, EntriesController);
  }

  _createClass(EntriesController, null, [{
    key: 'fetchUserEntries',
    value: function fetchUserEntries(req, res) {
      var userId = req.user.userid;
      _dbConfig2.default.query(queryEntriesByUserId, [userId], function (err, dbRes) {
        if (err) {
          return res.json({ sucess: false, message: 'Entries could not be fetched', err: err });
        }
        var rows = dbRes.rows;

        return res.status(200).json({ success: true, message: 'Entries successfully Loaded', entries: rows });
      });
    }
  }, {
    key: 'fetchEntryById',
    value: function fetchEntryById(req, res) {
      var userId = req.user.userid;
      var entryId = req.params.entryId;


      _dbConfig2.default.query(queryEntriesByEntryId, [userId, entryId], function (err, dbRes) {
        if (err) {
          return res.json({ sucess: false, message: 'Entry could not be fetched', err: err });
        }
        var rows = dbRes.rows,
            rowCount = dbRes.rowCount;

        if (rowCount === 0) {
          return res.status(404).json({ success: false, message: 'Entry not found', rows: rows });
        }
        return res.status(200).json({ success: true, message: 'Entry successfully Loaded', entry: rows[0] });
      });
    }
  }, {
    key: 'createNewEntry',
    value: function createNewEntry(req, res) {
      var _req$body = req.body,
          entryTitle = _req$body.entryTitle,
          entryContent = _req$body.entryContent;

      var finalTitle = entryTitle.replace(/\s+/g, ' ').trim();
      var finalContent = entryContent.replace(/\s+/g, ' ').trim();
      var userId = req.user.userid;
      _dbConfig2.default.query(insertIntoEntries, [userId, finalTitle, finalContent], function (err, dbRes) {
        if (err) {
          return res.json({ success: false, message: 'Could not post data', err: err });
        }
        var rows = dbRes.rows;

        var entry = rows[0];
        return res.status(201).send({ success: true, message: 'New Enry Was succesfully added', entry: entry });
      });
    }
  }, {
    key: 'modifyEntry',
    value: function modifyEntry(req, res) {
      var _req$body2 = req.body,
          entryTitle = _req$body2.entryTitle,
          entryContent = _req$body2.entryContent;

      var userId = req.user.userid;
      var entryId = req.params.entryId;


      _dbConfig2.default.query(updateEntry, [entryTitle, entryContent, entryId, userId], function (err) {
        if (err) {
          return res.json({ sucess: false, message: 'Could not update entry', err: err });
        }
        return res.status(200).send({ success: true, message: 'Entry Was succesfully updated' });
      });
    }
  }, {
    key: 'deleteEntry',
    value: function deleteEntry(req, res) {
      var userId = req.user.userid;
      var entryId = req.params.entryId;

      _dbConfig2.default.query(_deleteEntry, [entryId, userId], function (err) {
        if (err) {
          return res.json({ sucess: false, message: 'Could not Delete entry', err: err });
        }
        return res.status(200).send({ success: true, message: 'Entry Was succesfully deleted' });
      });
    }
  }]);

  return EntriesController;
}();

exports.default = EntriesController;
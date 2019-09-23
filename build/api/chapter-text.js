"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chapterText = exports.ridlistText = void 0;

var _book_names = _interopRequireDefault(require("../../data/book_names.json"));

var _termSearch = require("./term-search");

var _sanitization = require("../util/sanitization");

var _util = require("../util/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const allowedTexts = ["wlc", "net", "lxx", "sbl"];

const ridlistText = (ridlist, unfilteredParamTexts, db) => {
  const filteredTextList = allowedTexts.filter(t => unfilteredParamTexts.has(t));
  if (filteredTextList.length === 0) filteredTextList.push("net");
  const requestedTextsSet = new Set(filteredTextList);
  return new Promise((resolve, reject) => {
    let ridlistResponse = []; //TODO: change "in" to {$gte: min, $lt: max}
    //[or at least make it a possibilty
    // - we need the ridlist idea for search results
    // - but definitely not for chapters

    const cursor = db.collection("verse_data").find({
      rid: {
        $in: ridlist
      }
    });
    cursor.each((err, doc) => {
      if (err) console.log("ERROR", err);

      if (doc != null) {
        const row = {
          "rid": +doc["rid"]
        };
        requestedTextsSet.forEach(text => {
          if (doc.hasOwnProperty(text)) {
            row[text] = doc[text];
          }
        });
        ridlistResponse.push(row);
      } else {
        resolve(ridlistResponse);
      }
    });
  });
};

exports.ridlistText = ridlistText;

const chapterText =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (params, db) {
    const ref = (0, _sanitization.sanitiseReference)(params.reference);
    console.log("going on with", ref);
    const unfilteredParamTexts = params["texts"] ? new Set(params["texts"]) : new Set([]);
    let highlights = {};

    if (params.hasOwnProperty("search_terms")) {
      params.search_terms.forEach(st => {
        highlights[st.uid] = (0, _termSearch._wordsThatMatchQuery)(st.data, [ref.book], ref.chapter);
      });
    }

    const minv = _book_names.default[ref.book] * 10000000 + ref.chapter * 1000;
    const maxv = _book_names.default[ref.book] * 10000000 + (ref.chapter + 1) * 1000;
    return new Promise((resolve, reject) => {
      ridlistText(Array.from({
        length: maxv - minv
      }, (v, k) => k + minv), unfilteredParamTexts, db).then(texts => {
        const returnVal = {
          "reference": params.reference,
          "text": texts
        };
        if (Object.keys(highlights).length > 0) returnVal["highlights"] = highlights;
        resolve(returnVal);
      }).catch(err => {
        reject(err);
      });
    });
  });

  return function chapterText(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.chapterText = chapterText;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvY2hhcHRlci10ZXh0LmpzIl0sIm5hbWVzIjpbImFsbG93ZWRUZXh0cyIsInJpZGxpc3RUZXh0IiwicmlkbGlzdCIsInVuZmlsdGVyZWRQYXJhbVRleHRzIiwiZGIiLCJmaWx0ZXJlZFRleHRMaXN0IiwiZmlsdGVyIiwidCIsImhhcyIsImxlbmd0aCIsInB1c2giLCJyZXF1ZXN0ZWRUZXh0c1NldCIsIlNldCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmlkbGlzdFJlc3BvbnNlIiwiY3Vyc29yIiwiY29sbGVjdGlvbiIsImZpbmQiLCJyaWQiLCIkaW4iLCJlYWNoIiwiZXJyIiwiZG9jIiwiY29uc29sZSIsImxvZyIsInJvdyIsImZvckVhY2giLCJ0ZXh0IiwiaGFzT3duUHJvcGVydHkiLCJjaGFwdGVyVGV4dCIsInBhcmFtcyIsInJlZiIsInJlZmVyZW5jZSIsImhpZ2hsaWdodHMiLCJzZWFyY2hfdGVybXMiLCJzdCIsInVpZCIsImRhdGEiLCJib29rIiwiY2hhcHRlciIsIm1pbnYiLCJib29rX25hbWVzIiwibWF4diIsIkFycmF5IiwiZnJvbSIsInYiLCJrIiwidGhlbiIsInRleHRzIiwicmV0dXJuVmFsIiwiT2JqZWN0Iiwia2V5cyIsImNhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsWUFBWSxHQUFHLENBQ3BCLEtBRG9CLEVBRXBCLEtBRm9CLEVBR3BCLEtBSG9CLEVBSXBCLEtBSm9CLENBQXJCOztBQU9BLE1BQU1DLFdBQVcsR0FBRyxDQUFDQyxPQUFELEVBQVVDLG9CQUFWLEVBQWdDQyxFQUFoQyxLQUF1QztBQUMxRCxRQUFNQyxnQkFBZ0IsR0FBR0wsWUFBWSxDQUFDTSxNQUFiLENBQW9CQyxDQUFDLElBQUlKLG9CQUFvQixDQUFDSyxHQUFyQixDQUF5QkQsQ0FBekIsQ0FBekIsQ0FBekI7QUFDQSxNQUFJRixnQkFBZ0IsQ0FBQ0ksTUFB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LElBQUksR0FBR0Y7QUFBakIsT0FBWCxFQUFvQyxDQUFDSyxDQUFELEVBQUlDLENBQUosS0FBVUEsQ0FBQyxHQUFHTixJQUFsRCxDQUFELEVBQTBEdkMsb0JBQTFELEVBQWdGQyxFQUFoRixDQUFYLENBQStGNkMsSUFBL0YsQ0FBcUdDLEtBQUQsSUFBVztBQUM5RyxjQUFNQyxTQUFTLEdBQUc7QUFDakIsdUJBQWFuQixNQUFNLENBQUNFLFNBREg7QUFFakIsa0JBQVFnQjtBQUZTLFNBQWxCO0FBSUEsWUFBSUUsTUFBTSxDQUFDQyxJQUFQLENBQVlsQixVQUFaLEVBQXdCMUIsTUFBeEIsR0FBaUMsQ0FBckMsRUFDQzBDLFNBQVMsQ0FBQyxZQUFELENBQVQsR0FBMEJoQixVQUExQjtBQUNEckIsUUFBQUEsT0FBTyxDQUFDcUMsU0FBRCxDQUFQO0FBQ0EsT0FSRCxFQVFHRyxLQVJILENBUVUvQixHQUFELElBQVM7QUFDakJSLFFBQUFBLE1BQU0sQ0FBQ1EsR0FBRCxDQUFOO0FBQ0EsT0FWRDtBQVdBLEtBWk0sQ0FBUDtBQWFBLEdBM0JnQjs7QUFBQSxrQkFBWFEsV0FBVztBQUFBO0FBQUE7QUFBQSxHQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBib29rX25hbWVzIGZyb20gJy4uLy4uL2RhdGEvYm9va19uYW1lcy5qc29uJ1xuaW1wb3J0IHsgX3dvcmRzVGhhdE1hdGNoUXVlcnkgfSBmcm9tICcuL3Rlcm0tc2VhcmNoJ1xuXG5pbXBvcnQgeyBzYW5pdGlzZVJlZmVyZW5jZSB9IGZyb20gJy4uL3V0aWwvc2FuaXRpemF0aW9uJ1xuaW1wb3J0IHsgY29udmVydFNldFRvQXJyYXkgfSBmcm9tICcuLi91dGlsL3V0aWwnXG5cbmNvbnN0IGFsbG93ZWRUZXh0cyA9IFtcblx0XCJ3bGNcIixcblx0XCJuZXRcIixcblx0XCJseHhcIixcblx0XCJzYmxcIlxuXVxuXG5jb25zdCByaWRsaXN0VGV4dCA9IChyaWRsaXN0LCB1bmZpbHRlcmVkUGFyYW1UZXh0cywgZGIpID0+IHtcblx0Y29uc3QgZmlsdGVyZWRUZXh0TGlzdCA9IGFsbG93ZWRUZXh0cy5maWx0ZXIodCA9PiB1bmZpbHRlcmVkUGFyYW1UZXh0cy5oYXModCkpXG5cdGlmIChmaWx0ZXJlZFRleHRMaXN0Lmxlbmd0aCA9PT0gMClcblx0XHRmaWx0ZXJlZFRleHRMaXN0LnB1c2goXCJuZXRcIilcblx0Y29uc3QgcmVxdWVzdGVkVGV4dHNTZXQgPSBuZXcgU2V0KGZpbHRlcmVkVGV4dExpc3QpXG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRsZXQgcmlkbGlzdFJlc3BvbnNlID0gW11cblx0XHQvL1RPRE86IGNoYW5nZSBcImluXCIgdG8geyRndGU6IG1pbiwgJGx0OiBtYXh9XG5cdFx0Ly9bb3IgYXQgbGVhc3QgbWFrZSBpdCBhIHBvc3NpYmlsdHlcblx0XHQvLyAtIHdlIG5lZWQgdGhlIHJpZGxpc3QgaWRlYSBmb3Igc2VhcmNoIHJlc3VsdHNcblx0XHQvLyAtIGJ1dCBkZWZpbml0ZWx5IG5vdCBmb3IgY2hhcHRlcnNcblx0XHRjb25zdCBjdXJzb3IgPSBkYi5jb2xsZWN0aW9uKFwidmVyc2VfZGF0YVwiKS5maW5kKHsgcmlkOiB7ICRpbjogcmlkbGlzdCB9IH0pXG5cdFx0Y3Vyc29yLmVhY2goKGVyciwgZG9jKSA9PiB7XG5cdFx0XHRpZiAoZXJyKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkVSUk9SXCIsIGVycilcblx0XHRcdGlmIChkb2MgIT0gbnVsbCkge1xuXHRcdFx0XHRjb25zdCByb3cgPSB7IFwicmlkXCI6ICtkb2NbXCJyaWRcIl0gfVxuXHRcdFx0XHRyZXF1ZXN0ZWRUZXh0c1NldC5mb3JFYWNoKHRleHQgPT4ge1xuXHRcdFx0XHRcdGlmIChkb2MuaGFzT3duUHJvcGVydHkodGV4dCkpIHtcblx0XHRcdFx0XHRcdHJvd1t0ZXh0XSA9IGRvY1t0ZXh0XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0cmlkbGlzdFJlc3BvbnNlLnB1c2gocm93KVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzb2x2ZShyaWRsaXN0UmVzcG9uc2UpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSlcbn1cblxuY29uc3QgY2hhcHRlclRleHQgPSBhc3luYyAocGFyYW1zLCBkYikgPT4ge1xuXHRjb25zdCByZWYgPSBzYW5pdGlzZVJlZmVyZW5jZShwYXJhbXMucmVmZXJlbmNlKVxuXHRjb25zb2xlLmxvZyhcImdvaW5nIG9uIHdpdGhcIiwgcmVmKVxuXHRjb25zdCB1bmZpbHRlcmVkUGFyYW1UZXh0cyA9IHBhcmFtc1tcInRleHRzXCJdID8gbmV3IFNldChwYXJhbXNbXCJ0ZXh0c1wiXSkgOiBuZXcgU2V0KFtdKVxuXG5cdGxldCBoaWdobGlnaHRzID0ge31cblx0aWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShcInNlYXJjaF90ZXJtc1wiKSkge1xuXHRcdHBhcmFtcy5zZWFyY2hfdGVybXMuZm9yRWFjaChzdCA9PiB7XG5cdFx0XHRoaWdobGlnaHRzW3N0LnVpZF0gPSBfd29yZHNUaGF0TWF0Y2hRdWVyeShzdC5kYXRhLCBbcmVmLmJvb2tdLCByZWYuY2hhcHRlcilcblx0XHR9KVxuXHR9XG5cblx0Y29uc3QgbWludiA9IGJvb2tfbmFtZXNbcmVmLmJvb2tdICogMTAwMDAwMDAgKyByZWYuY2hhcHRlciAqIDEwMDBcblx0Y29uc3QgbWF4diA9IGJvb2tfbmFtZXNbcmVmLmJvb2tdICogMTAwMDAwMDAgKyAocmVmLmNoYXB0ZXIgKyAxKSAqIDEwMDBcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRyaWRsaXN0VGV4dChBcnJheS5mcm9tKHsgbGVuZ3RoOiBtYXh2IC0gbWludiB9LCAodiwgaykgPT4gayArIG1pbnYpLCB1bmZpbHRlcmVkUGFyYW1UZXh0cywgZGIpLnRoZW4oKHRleHRzKSA9PiB7XG5cdFx0XHRjb25zdCByZXR1cm5WYWwgPSB7XG5cdFx0XHRcdFwicmVmZXJlbmNlXCI6IHBhcmFtcy5yZWZlcmVuY2UsXG5cdFx0XHRcdFwidGV4dFwiOiB0ZXh0c1xuXHRcdFx0fVxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKGhpZ2hsaWdodHMpLmxlbmd0aCA+IDApXG5cdFx0XHRcdHJldHVyblZhbFtcImhpZ2hsaWdodHNcIl0gPSBoaWdobGlnaHRzXG5cdFx0XHRyZXNvbHZlKHJldHVyblZhbClcblx0XHR9KS5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHRyZWplY3QoZXJyKVxuXHRcdH0pXG5cdH0pXG59XG5leHBvcnQgeyByaWRsaXN0VGV4dCwgY2hhcHRlclRleHQgfVxuIl19
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chapterText = exports.ridlistText = void 0;

var _book_names = _interopRequireDefault(require("../../data/book_names.json"));

var _termSearch = require("./term-search");

var _sanitization = require("../util/sanitization");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const allowedTexts = ["wlc", "net", "lxx", "sbl"];

const ridlistText = (ridlist, unfilteredParamTexts, db) => {
  const filteredTextList = allowedTexts.filter(t => unfilteredParamTexts.has(t));
  if (filteredTextList.length === 0) filteredTextList.push("net");
  const requestedTextsSet = new Set(filteredTextList);
  return new Promise((resolve, reject) => {
    let ridlistResponse = {}; //TODO: change "in" to {$gte: min, $lt: max}
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
        ridlistResponse[doc["rid"]] = {};
        requestedTextsSet.forEach(text => {
          if (doc.hasOwnProperty(text)) {
            ridlistResponse[doc["rid"]][text] = doc[text];
          }
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvY2hhcHRlci10ZXh0LmpzIl0sIm5hbWVzIjpbImFsbG93ZWRUZXh0cyIsInJpZGxpc3RUZXh0IiwicmlkbGlzdCIsInVuZmlsdGVyZWRQYXJhbVRleHRzIiwiZGIiLCJmaWx0ZXJlZFRleHRMaXN0IiwiZmlsdGVyIiwidCIsImhhcyIsImxlbmd0aCIsInB1c2giLCJyZXF1ZXN0ZWRUZXh0c1NldCIsIlNldCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmlkbGlzdFJlc3BvbnNlIiwiY3Vyc29yIiwiY29sbGVjdGlvbiIsImZpbmQiLCJyaWQiLCIkaW4iLCJlYWNoIiwiZXJyIiwiZG9jIiwiY29uc29sZSIsImxvZyIsImZvckVhY2giLCJ0ZXh0IiwiaGFzT3duUHJvcGVydHkiLCJjaGFwdGVyVGV4dCIsInBhcmFtcyIsInJlZiIsInJlZmVyZW5jZSIsImhpZ2hsaWdodHMiLCJzZWFyY2hfdGVybXMiLCJzdCIsInVpZCIsImRhdGEiLCJib29rIiwiY2hhcHRlciIsIm1pbnYiLCJib29rX25hbWVzIiwibWF4diIsIkFycmF5IiwiZnJvbSIsInYiLCJrIiwidGhlbiIsInRleHRzIiwicmV0dXJuVmFsIiwiT2JqZWN0Iiwia2V5cyIsImNhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBRUEsTUFBTUEsWUFBWSxHQUFHLENBQ3BCLEtBRG9CLEVBRXBCLEtBRm9CLEVBR3BCLEtBSG9CLEVBSXBCLEtBSm9CLENBQXJCOztBQU9BLE1BQU1DLFdBQVcsR0FBRyxDQUFDQyxPQUFELEVBQVVDLG9CQUFWLEVBQWdDQyxFQUFoQyxLQUF1QztBQUMxRCxRQUFNQyxnQkFBZ0IsR0FBR0wsWUFBWSxDQUFDTSxNQUFiLENBQW9CQyxDQUFDLElBQUlKLG9CQUFvQixDQUFDSyxHQUFyQixDQUF5QkQsQ0FBekIsQ0FBekIsQ0FBekI7QUFDQSxNQUFJRixnQkFBZ0IsQ0FBQ0ksTUFBakIsS0FBNEIsQ0FB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Q0FBQ0ssQ0FBRCxFQUFJQyxDQUFKLEtBQVVBLENBQUMsR0FBQ04sSUFBNUMsQ0FBRCxFQUFvRHRDLG9CQUFwRCxFQUEwRUMsRUFBMUUsQ0FBWCxDQUF5RjRDLElBQXpGLENBQStGQyxLQUFELElBQVc7QUFDeEcsY0FBTUMsU0FBUyxHQUFHO0FBQ2pCLHVCQUFhbkIsTUFBTSxDQUFDRSxTQURIO0FBRWpCLGtCQUFRZ0I7QUFGUyxTQUFsQjtBQUlBLFlBQUlFLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZbEIsVUFBWixFQUF3QnpCLE1BQXhCLEdBQWlDLENBQXJDLEVBQ0N5QyxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCaEIsVUFBMUI7QUFDRHBCLFFBQUFBLE9BQU8sQ0FBQ29DLFNBQUQsQ0FBUDtBQUNBLE9BUkQsRUFRR0csS0FSSCxDQVFVOUIsR0FBRCxJQUFTO0FBQ2pCUixRQUFBQSxNQUFNLENBQUNRLEdBQUQsQ0FBTjtBQUNBLE9BVkQ7QUFXQSxLQVpNLENBQVA7QUFhQSxHQTNCZ0I7O0FBQUEsa0JBQVhPLFdBQVc7QUFBQTtBQUFBO0FBQUEsR0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYm9va19uYW1lcyBmcm9tICcuLi8uLi9kYXRhL2Jvb2tfbmFtZXMuanNvbidcbmltcG9ydCB7IF93b3Jkc1RoYXRNYXRjaFF1ZXJ5IH0gZnJvbSAnLi90ZXJtLXNlYXJjaCdcblxuaW1wb3J0IHsgc2FuaXRpc2VSZWZlcmVuY2UgfSAgZnJvbSAnLi4vdXRpbC9zYW5pdGl6YXRpb24nXG5cbmNvbnN0IGFsbG93ZWRUZXh0cyA9IFtcblx0XCJ3bGNcIixcblx0XCJuZXRcIixcblx0XCJseHhcIixcblx0XCJzYmxcIlxuXVxuXG5jb25zdCByaWRsaXN0VGV4dCA9IChyaWRsaXN0LCB1bmZpbHRlcmVkUGFyYW1UZXh0cywgZGIpID0+IHtcblx0Y29uc3QgZmlsdGVyZWRUZXh0TGlzdCA9IGFsbG93ZWRUZXh0cy5maWx0ZXIodCA9PiB1bmZpbHRlcmVkUGFyYW1UZXh0cy5oYXModCkpXG5cdGlmIChmaWx0ZXJlZFRleHRMaXN0Lmxlbmd0aCA9PT0gMClcblx0XHRmaWx0ZXJlZFRleHRMaXN0LnB1c2goXCJuZXRcIilcblx0Y29uc3QgcmVxdWVzdGVkVGV4dHNTZXQgPSBuZXcgU2V0KGZpbHRlcmVkVGV4dExpc3QpXG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRsZXQgcmlkbGlzdFJlc3BvbnNlID0ge31cblx0XHQvL1RPRE86IGNoYW5nZSBcImluXCIgdG8geyRndGU6IG1pbiwgJGx0OiBtYXh9XG5cdFx0Ly9bb3IgYXQgbGVhc3QgbWFrZSBpdCBhIHBvc3NpYmlsdHlcblx0XHQvLyAtIHdlIG5lZWQgdGhlIHJpZGxpc3QgaWRlYSBmb3Igc2VhcmNoIHJlc3VsdHNcblx0XHQvLyAtIGJ1dCBkZWZpbml0ZWx5IG5vdCBmb3IgY2hhcHRlcnNcblx0XHRjb25zdCBjdXJzb3IgPSBkYi5jb2xsZWN0aW9uKFwidmVyc2VfZGF0YVwiKS5maW5kKHsgcmlkOiB7ICRpbjogcmlkbGlzdCB9IH0pXG5cdFx0Y3Vyc29yLmVhY2goKGVyciwgZG9jKSA9PiB7XG5cdFx0XHRpZiAoZXJyKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkVSUk9SXCIsIGVycilcblx0XHRcdGlmIChkb2MgIT0gbnVsbCkge1xuXHRcdFx0XHRyaWRsaXN0UmVzcG9uc2VbZG9jW1wicmlkXCJdXSA9IHt9XG5cdFx0XHRcdHJlcXVlc3RlZFRleHRzU2V0LmZvckVhY2godGV4dCA9PiB7XG5cdFx0XHRcdFx0aWYgKGRvYy5oYXNPd25Qcm9wZXJ0eSh0ZXh0KSkge1xuXHRcdFx0XHRcdFx0cmlkbGlzdFJlc3BvbnNlW2RvY1tcInJpZFwiXV1bdGV4dF0gPSBkb2NbdGV4dF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXNvbHZlKHJpZGxpc3RSZXNwb25zZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9KVxufVxuXG5jb25zdCBjaGFwdGVyVGV4dCA9IGFzeW5jIChwYXJhbXMsIGRiKSA9PiB7XG5cdGNvbnN0IHJlZiA9IHNhbml0aXNlUmVmZXJlbmNlKHBhcmFtcy5yZWZlcmVuY2UpXG5cdGNvbnNvbGUubG9nKFwiZ29pbmcgb24gd2l0aFwiLCByZWYpXG5cdGNvbnN0IHVuZmlsdGVyZWRQYXJhbVRleHRzID0gcGFyYW1zW1widGV4dHNcIl0gPyBuZXcgU2V0KHBhcmFtc1tcInRleHRzXCJdKSA6IG5ldyBTZXQoW10pXG5cblx0bGV0IGhpZ2hsaWdodHMgPSB7fVxuXHRpZiAocGFyYW1zLmhhc093blByb3BlcnR5KFwic2VhcmNoX3Rlcm1zXCIpKSB7XG5cdFx0cGFyYW1zLnNlYXJjaF90ZXJtcy5mb3JFYWNoKHN0ID0+IHtcblx0XHRcdGhpZ2hsaWdodHNbc3QudWlkXSA9IF93b3Jkc1RoYXRNYXRjaFF1ZXJ5KHN0LmRhdGEsIFtyZWYuYm9va10sIHJlZi5jaGFwdGVyKVxuXHRcdH0pXG5cdH1cblxuXHRjb25zdCBtaW52ID0gYm9va19uYW1lc1tyZWYuYm9va10gKiAxMDAwMDAwMCArIHJlZi5jaGFwdGVyICogMTAwMFxuXHRjb25zdCBtYXh2ID0gYm9va19uYW1lc1tyZWYuYm9va10gKiAxMDAwMDAwMCArIChyZWYuY2hhcHRlcisxKSAqIDEwMDBcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRyaWRsaXN0VGV4dChBcnJheS5mcm9tKHtsZW5ndGg6IG1heHYtbWludn0sICh2LCBrKSA9PiBrK21pbnYpLCB1bmZpbHRlcmVkUGFyYW1UZXh0cywgZGIpLnRoZW4oKHRleHRzKSA9PiB7XG5cdFx0XHRjb25zdCByZXR1cm5WYWwgPSB7XG5cdFx0XHRcdFwicmVmZXJlbmNlXCI6IHBhcmFtcy5yZWZlcmVuY2UsXG5cdFx0XHRcdFwidGV4dFwiOiB0ZXh0c1xuXHRcdFx0fVxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKGhpZ2hsaWdodHMpLmxlbmd0aCA+IDApXG5cdFx0XHRcdHJldHVyblZhbFtcImhpZ2hsaWdodHNcIl0gPSBoaWdobGlnaHRzXG5cdFx0XHRyZXNvbHZlKHJldHVyblZhbClcblx0XHR9KS5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHRyZWplY3QoZXJyKVxuXHRcdH0pXG5cdH0pXG59XG5leHBvcnQgeyByaWRsaXN0VGV4dCwgY2hhcHRlclRleHQgfVxuIl19
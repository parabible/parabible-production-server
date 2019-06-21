"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitiseReference = exports.sanitiseNodes = exports.sanitiseTextsAndGetIds = void 0;

var _text_data = require("../../data/text_data");

const book_names = new Set(Object.keys(_text_data.chapters_per_book));

const isKindOfInteger = n => n % 1 === 0;

const sanitiseReference = reference => {
  if (!("book" in reference)) {
    throw {
      "error": "Your reference doesn't have a 'book' value.",
      "options": Object.keys(_text_data.chapters_per_book)
    };
  }

  if (!book_names.has(reference.book)) {
    throw {
      "error": "Your reference doesn't have a valid 'book' value.",
      "options": Object.keys(_text_data.chapters_per_book)
    };
  }

  if (!("chapter" in reference)) {
    throw {
      "error": "Your reference doesn't have a 'chapter' value.",
      "options": "You should have an integer: 0 < n < (number of chapters in `book`)"
    };
  }

  if (!isKindOfInteger(reference.chapter)) {
    throw {
      "error": `Your chapter reference "${reference.chapter}" is not an integer.`,
      "options": "You should have an integer: 0 < n < (number of chapters in `book`)"
    };
  }

  if (reference.chapter < 0 || reference.chapter > _text_data.chapters_per_book[reference.book]) {
    throw {
      "error": `Your chapter reference "${reference.chapter}" is not in the range of ${reference.book} (${_text_data.chapters_per_book[reference.book]}).`,
      "options": "You should have an integer: 0 < n < (number of chapters in `book`)"
    };
  }

  reference.chapter = +reference.chapter;
  return reference;
};

exports.sanitiseReference = sanitiseReference;

const sanitiseTextsAndGetIds = texts => {
  const textsAreAllValid = texts.reduce((a, v) => a && _text_data.text_id[v] > 0);

  if (!textsAreAllValid) {
    throw {
      "error": "The `texts` parameter must be an array of strings.",
      "options": Object.keys(_text_data.text_id)
    };
  }

  return texts.map(v => ({
    name: v,
    id: _text_data.text_id[v]
  }));
};

exports.sanitiseTextsAndGetIds = sanitiseTextsAndGetIds;

const sanitiseNodes = nodes => {
  const nodeArray = [];

  try {
    nodes.forEach(n => nodeArray.push(+n));
    return nodeArray;
  } catch (e) {
    throw {
      "error": "The `nodes` parameter must be an array of integers."
    };
  }
};

exports.sanitiseNodes = sanitiseNodes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3Nhbml0aXphdGlvbi5qcyJdLCJuYW1lcyI6WyJib29rX25hbWVzIiwiU2V0IiwiT2JqZWN0Iiwia2V5cyIsImNoYXB0ZXJzX3Blcl9ib29rIiwiaXNLaW5kT2ZJbnRlZ2VyIiwibiIsInNhbml0aXNlUmVmZXJlbmNlIiwicmVmZXJlbmNlIiwiaGFzIiwiYm9vayIsImNoYXB0ZXIiLCJzYW5pdGlzZVRleHRzQW5kR2V0SWRzIiwidGV4dHMiLCJ0ZXh0c0FyZUFsbFZhbGlkIiwicmVkdWNlIiwiYSIsInYiLCJ0ZXh0X2lkIiwibWFwIiwibmFtZSIsImlkIiwic2FuaXRpc2VOb2RlcyIsIm5vZGVzIiwibm9kZUFycmF5IiwiZm9yRWFjaCIsInB1c2giLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLElBQUlDLEdBQUosQ0FBUUMsTUFBTSxDQUFDQyxJQUFQLENBQVlDLDRCQUFaLENBQVIsQ0FBbkI7O0FBRUEsTUFBTUMsZUFBZSxHQUFHQyxDQUFDLElBQU1BLENBQUMsR0FBQyxDQUFILEtBQVEsQ0FBdEM7O0FBRUEsTUFBTUMsaUJBQWlCLEdBQUdDLFNBQVMsSUFBSTtBQUNuQyxNQUFJLEVBQUUsVUFBVUEsU0FBWixDQUFKLEVBQTRCO0FBQ3hCLFVBQU07QUFDRixlQUFTLDZDQURQO0FBRUYsaUJBQVdOLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZQyw0QkFBWjtBQUZULEtBQU47QUFJSDs7QUFDRCxNQUFJLENBQUNKLFVBQVUsQ0FBQ1MsR0FBWCxDQUFlRCxTQUFTLENBQUNFLElBQXpCLENBQUwsRUFBb0M7QUFDaEMsVUFBTTtBQUNGLGVBQVMsbURBRFA7QUFFRixpQkFBV1IsTUFBTSxDQUFDQyxJQUFQLENBQVlDLDRCQUFaO0FBRlQsS0FBTjtBQUlIOztBQUNELE1BQUksRUFBRSxhQUFhSSxTQUFmLENBQUosRUFBK0I7QUFDM0IsVUFBTTtBQUNGLGVBQVMsZ0RBRFA7QUFFRixpQkFBVztBQUZULEtBQU47QUFJSDs7QUFDRCxNQUFJLENBQUNILGVBQWUsQ0FBQ0csU0FBUyxDQUFDRyxPQUFYLENBQXBCLEVBQXlDO0FBQ3JDLFVBQU07QUFDRixlQUFVLDJCQUEwQkgsU0FBUyxDQUFDRyxPQUFRLHNCQURwRDtBQUVGLGlCQUFXO0FBRlQsS0FBTjtBQUlIOztBQUNELE1BQUlILFNBQVMsQ0FBQ0csT0FBVixHQUFvQixDQUFwQixJQUF5QkgsU0FBUyxDQUFDRyxPQUFWLEdBQW9CUCw2QkFBa0JJLFNBQVMsQ0FBQ0UsSUFBNUIsQ0FBakQsRUFBb0Y7QUFDaEYsVUFBTTtBQUNGLGVBQVUsMkJBQTBCRixTQUFTLENBQUNHLE9BQVEsNEJBQTJCSCxTQUFTLENBQUNFLElBQUssS0FBSU4sNkJBQWtCSSxTQUFTLENBQUNFLElBQTVCLENBQWtDLElBRHBJO0FBRUYsaUJBQVc7QUFGVCxLQUFOO0FBSUg7O0FBQ0RGLEVBQUFBLFNBQVMsQ0FBQ0csT0FBVixHQUFvQixDQUFDSCxTQUFTLENBQUNHLE9BQS9CO0FBQ0EsU0FBT0gsU0FBUDtBQUNILENBakNEOzs7O0FBbUNBLE1BQU1JLHNCQUFzQixHQUFHQyxLQUFLLElBQUk7QUFDcEMsUUFBTUMsZ0JBQWdCLEdBQUdELEtBQUssQ0FBQ0UsTUFBTixDQUFhLENBQUNDLENBQUQsRUFBSUMsQ0FBSixLQUFVRCxDQUFDLElBQUlFLG1CQUFRRCxDQUFSLElBQWEsQ0FBekMsQ0FBekI7O0FBQ0EsTUFBSSxDQUFDSCxnQkFBTCxFQUF1QjtBQUNuQixVQUFNO0FBQ0YsZUFBUyxvREFEUDtBQUVGLGlCQUFXWixNQUFNLENBQUNDLElBQVAsQ0FBWWUsa0JBQVo7QUFGVCxLQUFOO0FBSUg7O0FBQ0QsU0FBT0wsS0FBSyxDQUFDTSxHQUFOLENBQVVGLENBQUMsS0FBSztBQUFDRyxJQUFBQSxJQUFJLEVBQUVILENBQVA7QUFBVUksSUFBQUEsRUFBRSxFQUFFSCxtQkFBUUQsQ0FBUjtBQUFkLEdBQUwsQ0FBWCxDQUFQO0FBQ0gsQ0FURDs7OztBQVdBLE1BQU1LLGFBQWEsR0FBR0MsS0FBSyxJQUFJO0FBQzNCLFFBQU1DLFNBQVMsR0FBRyxFQUFsQjs7QUFDQSxNQUFJO0FBQ0FELElBQUFBLEtBQUssQ0FBQ0UsT0FBTixDQUFjbkIsQ0FBQyxJQUFJa0IsU0FBUyxDQUFDRSxJQUFWLENBQWUsQ0FBQ3BCLENBQWhCLENBQW5CO0FBQ0EsV0FBT2tCLFNBQVA7QUFDSCxHQUhELENBSUEsT0FBT0csQ0FBUCxFQUFVO0FBQ04sVUFBTTtBQUFFLGVBQVM7QUFBWCxLQUFOO0FBQ0g7QUFDSixDQVREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGV4dF9pZCwgY2hhcHRlcnNfcGVyX2Jvb2sgfSBmcm9tICcuLi8uLi9kYXRhL3RleHRfZGF0YSdcblxuY29uc3QgYm9va19uYW1lcyA9IG5ldyBTZXQoT2JqZWN0LmtleXMoY2hhcHRlcnNfcGVyX2Jvb2spKVxuXG5jb25zdCBpc0tpbmRPZkludGVnZXIgPSBuID0+ICgobiUxKT09PTApXG5cbmNvbnN0IHNhbml0aXNlUmVmZXJlbmNlID0gcmVmZXJlbmNlID0+IHtcbiAgICBpZiAoIShcImJvb2tcIiBpbiByZWZlcmVuY2UpKSB7XG4gICAgICAgIHRocm93KHtcbiAgICAgICAgICAgIFwiZXJyb3JcIjogXCJZb3VyIHJlZmVyZW5jZSBkb2Vzbid0IGhhdmUgYSAnYm9vaycgdmFsdWUuXCIsXG4gICAgICAgICAgICBcIm9wdGlvbnNcIjogT2JqZWN0LmtleXMoY2hhcHRlcnNfcGVyX2Jvb2spXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGlmICghYm9va19uYW1lcy5oYXMocmVmZXJlbmNlLmJvb2spKXtcbiAgICAgICAgdGhyb3coe1xuICAgICAgICAgICAgXCJlcnJvclwiOiBcIllvdXIgcmVmZXJlbmNlIGRvZXNuJ3QgaGF2ZSBhIHZhbGlkICdib29rJyB2YWx1ZS5cIixcbiAgICAgICAgICAgIFwib3B0aW9uc1wiOiBPYmplY3Qua2V5cyhjaGFwdGVyc19wZXJfYm9vaylcbiAgICAgICAgfSlcbiAgICB9XG4gICAgaWYgKCEoXCJjaGFwdGVyXCIgaW4gcmVmZXJlbmNlKSkge1xuICAgICAgICB0aHJvdyh7XG4gICAgICAgICAgICBcImVycm9yXCI6IFwiWW91ciByZWZlcmVuY2UgZG9lc24ndCBoYXZlIGEgJ2NoYXB0ZXInIHZhbHVlLlwiLFxuICAgICAgICAgICAgXCJvcHRpb25zXCI6IFwiWW91IHNob3VsZCBoYXZlIGFuIGludGVnZXI6IDAgPCBuIDwgKG51bWJlciBvZiBjaGFwdGVycyBpbiBgYm9va2ApXCJcbiAgICAgICAgfSlcbiAgICB9XG4gICAgaWYgKCFpc0tpbmRPZkludGVnZXIocmVmZXJlbmNlLmNoYXB0ZXIpKSB7XG4gICAgICAgIHRocm93KHtcbiAgICAgICAgICAgIFwiZXJyb3JcIjogYFlvdXIgY2hhcHRlciByZWZlcmVuY2UgXCIke3JlZmVyZW5jZS5jaGFwdGVyfVwiIGlzIG5vdCBhbiBpbnRlZ2VyLmAsXG4gICAgICAgICAgICBcIm9wdGlvbnNcIjogXCJZb3Ugc2hvdWxkIGhhdmUgYW4gaW50ZWdlcjogMCA8IG4gPCAobnVtYmVyIG9mIGNoYXB0ZXJzIGluIGBib29rYClcIlxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZiAocmVmZXJlbmNlLmNoYXB0ZXIgPCAwIHx8IHJlZmVyZW5jZS5jaGFwdGVyID4gY2hhcHRlcnNfcGVyX2Jvb2tbcmVmZXJlbmNlLmJvb2tdKSB7XG4gICAgICAgIHRocm93KHtcbiAgICAgICAgICAgIFwiZXJyb3JcIjogYFlvdXIgY2hhcHRlciByZWZlcmVuY2UgXCIke3JlZmVyZW5jZS5jaGFwdGVyfVwiIGlzIG5vdCBpbiB0aGUgcmFuZ2Ugb2YgJHtyZWZlcmVuY2UuYm9va30gKCR7Y2hhcHRlcnNfcGVyX2Jvb2tbcmVmZXJlbmNlLmJvb2tdfSkuYCxcbiAgICAgICAgICAgIFwib3B0aW9uc1wiOiBcIllvdSBzaG91bGQgaGF2ZSBhbiBpbnRlZ2VyOiAwIDwgbiA8IChudW1iZXIgb2YgY2hhcHRlcnMgaW4gYGJvb2tgKVwiXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlZmVyZW5jZS5jaGFwdGVyID0gK3JlZmVyZW5jZS5jaGFwdGVyXG4gICAgcmV0dXJuIHJlZmVyZW5jZVxufVxuXG5jb25zdCBzYW5pdGlzZVRleHRzQW5kR2V0SWRzID0gdGV4dHMgPT4ge1xuICAgIGNvbnN0IHRleHRzQXJlQWxsVmFsaWQgPSB0ZXh0cy5yZWR1Y2UoKGEsIHYpID0+IGEgJiYgdGV4dF9pZFt2XSA+IDApXG4gICAgaWYgKCF0ZXh0c0FyZUFsbFZhbGlkKSB7XG4gICAgICAgIHRocm93KHtcbiAgICAgICAgICAgIFwiZXJyb3JcIjogXCJUaGUgYHRleHRzYCBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzLlwiLFxuICAgICAgICAgICAgXCJvcHRpb25zXCI6IE9iamVjdC5rZXlzKHRleHRfaWQpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0ZXh0cy5tYXAodiA9PiAoe25hbWU6IHYsIGlkOiB0ZXh0X2lkW3ZdfSkpXG59XG5cbmNvbnN0IHNhbml0aXNlTm9kZXMgPSBub2RlcyA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGNvbnN0IG5vZGVBcnJheSA9IFtdXG4gICAgdHJ5IHtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChuID0+IG5vZGVBcnJheS5wdXNoKCtuKSlcbiAgICAgICAgcmV0dXJuIG5vZGVBcnJheVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyh7IFwiZXJyb3JcIjogXCJUaGUgYG5vZGVzYCBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBhcnJheSBvZiBpbnRlZ2Vycy5cIiB9KVxuICAgIH1cbn1cblxuZXhwb3J0IHsgc2FuaXRpc2VUZXh0c0FuZEdldElkcywgc2FuaXRpc2VOb2Rlcywgc2FuaXRpc2VSZWZlcmVuY2UgfSJdfQ==
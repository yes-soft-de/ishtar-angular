"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _jsontoxml = _interopRequireDefault(require("jsontoxml"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseAPI = 'https://ishtar-art.de/ishtar-backend/public';
var urls = ['artist-list', 'painting-list', 'art-schools-list', 'tos', 'privacy', 'about-us', 'faq', 'imprint', 'data-processing', 'about-ishtar'];
var root_path = 'https://ishtar-art.de';
var root_path_de = root_path + '/de';
var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
var newDate = new Date(Date.now()); // region English

for (var _i = 0, _urls = urls; _i < _urls.length; _i++) {
  var path = _urls[_i];
  xml += '<url>';
  xml += "<loc>".concat(root_path, "/").concat(path, "</loc>");
  console.log("Adding Path ".concat(path));
  xml += "<xhtml:link\n               rel=\"alternate\"\n               hreflang=\"de\"\n               href=\"".concat(root_path_de, "/").concat(path, "\"/>"); // xml += `<lastmod>${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}T13:15:30Z</lastmod>`;

  xml += "<changefreq>monthly</changefreq>";
  xml += "<priority>0.8</priority>";
  xml += '</url>';
}

_axios.default.get("".concat(baseAPI, "/paintings")).then(function (result) {
  console.log('Got Painting List');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = result.data.Data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      xml += '<url>';
      xml += "<loc>".concat(root_path, "/painting/").concat(i.id, "</loc>");
      xml += "<xhtml:link\n               rel=\"alternate\"\n               hreflang=\"de\"\n               href=\"".concat(root_path_de, "/painting/").concat(i.id, "\"/>"); // xml += `<lastmod>${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}T13:15:30Z</lastmod>`;

      xml += "<changefreq>monthly</changefreq>";
      xml += "<image:image>";
      xml += "<image:loc>".concat(i.image, "</image:loc>");
      xml += "<image:title> ".concat(i.name.replace('&', 'and'), "</image:title>");
      xml += "<image:geo_location>Berlin, Germany</image:geo_location>";
      xml += "</image:image>";
      xml += "<priority>0.8</priority>";
      xml += '</url>';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  _axios.default.get("".concat(baseAPI, "/artists")).then(function (artistResult) {
    console.log('Got Artist List');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = artistResult.data.Data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var i = _step2.value;
        xml += '<url>';
        xml += "<loc>".concat(root_path, "/artist/").concat(i.id, "</loc>");
        xml += "<xhtml:link\n               rel=\"alternate\"\n               hreflang=\"de\"\n               href=\"".concat(root_path_de, "/artist/").concat(i.id, "\"/>"); // xml += `<lastmod>${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}T13:15:30Z</lastmod>`;

        xml += "<changefreq>monthly</changefreq>";
        xml += "<priority>0.7</priority>";
        xml += '</url>';
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    xml += '</urlset>';

    _fs.default.writeFileSync('sitemap.xml', xml, function (err) {
      console.log(err);
    });
  });
}); // endregion
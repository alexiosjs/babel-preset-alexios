var path = require("path");

var extname = path.extname;
var CSS_FILE_EXTNAMES = [".css", ".less", ".sass", ".scss", ".stylus", ".styl"];

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(path) {
        var specifiers = path.node.specifiers;
        var source = path.node.source;
        var value = source.value;

        if (
          specifiers.length > 0 &&
          CSS_FILE_EXTNAMES.includes(extname(value))
        ) {
          source.value = "".concat(value, "?css_modules");
        }
      },
    },
  };
};

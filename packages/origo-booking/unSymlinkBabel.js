var fs = require('fs');

var unlinkPaths = ['babel.config.js'];

unlinkPaths.forEach(function (path) {
  fs.unlink('./' + path, function (err) {
    err ? console.log('Failed to unlink', err) : console.log('UNLINKED ' + path);
  });
});
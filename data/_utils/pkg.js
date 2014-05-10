/*!
 * Pull down the package.json for a project
 * Customize `user`, `repo`, `path` and `dest`.
 *
 * Run `node pkg` to pull down the file.
 */

var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');

var cwd = path.join.bind(null, process.cwd());
var destination = cwd('data/_assemble.json');


var githubApi = require('github');
var github = new githubApi({
  version: '3.0.0',
  timeout: 5000
});

var getPackageFile = function (dest) {

  // Get package.json
  github.repos.getContent({
    user: 'assemble',
    repo: 'assemble',
    path: 'package.json'
  },

  function (err, resp, callback) {
    if (err) {
      console.log('error: ' + err);
      callback(err, null);
    } else {
      var buffer = new Buffer(resp.content, 'base64');
      var pkg = {
        name: resp.name,
        contents: JSON.parse(buffer.toString())
      };

      // Extend package.json with custom properties
      _.extend(pkg.contents, require('./extend-pkg'));

      file.writeJSONSync(dest, pkg.contents);
      console.log('Saved:', dest);
    }
  });
};

getPackageFile(destination);

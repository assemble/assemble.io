    var latest = require('latest');
    var matchdep = require('matchdep');
    var output = {};
    matchdep.filterAll('*').forEach(function(dep) {
      latest(dep, function(err, version) {
        var output = console.log(dep, version);
        JSON.stringify(output, null, 2);
        // grunt.file.write('.assemblerc', JSON.stringify(output, null, 2).replace(/(\\r\\n|\\n|\\r)/gm, '')); 
      });
    });
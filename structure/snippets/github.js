$.ajax({
  type: 'GET',
  url: 'https://api.github.com/users/jonschlinkert/repos?page=1&per_page=100',
  dataType: 'json',
  success: function (repos) {
    for (i in repos) {
      var repo = repos[i];
      if(repo.fork === false) {
        if(repo.description !== undefined && repo.description.length !== 0) {
          $('#repos').append([
              '<div class="col-md-4 repo">',
              '  <div class="panel panel-default" data-language="' + repo.language + '">',
              '    <div class="panel-heading">',
              '      <h3 class="panel-title">' + repo.name + '</h3>',
              '    </div>',
              '    <div class="panel-body">',
                     repo.description,
              '    </div>',
              '    <div class="panel-footer">',
              '      <span class="badge pull-left">forks: ' + repo.forks + '</span>',
              '      <span class="badge pull-left">watchers: ' + repo.watchers + '</span>',
              '    </div>',
              '  </div>',
              '</div>'
            ].join('\n')
          );
        }
      }
    }
    $('#repos-total').append('Total Repos: ' + repos.length);
  }
});
/**
 * Anchors template
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

module.exports = [
  '<a href="#<%= id %>" name="<%= id %>" class="anchor">',
  '  <span class="anchor-target" id="<%= id %>"></span>',
  '  <span class="glyphicon glyphicon-link"></span>',
  '</a>'
].join('\n');
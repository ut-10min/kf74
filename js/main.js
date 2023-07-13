$(function() {
  var template = $('#template').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, {talks: data});
  $('.article-headline').html(rendered);

  var hash_temp = location.hash;
  if (hash_temp) {
    location.replace('#');
    location.replace(hash_temp);
  }
});

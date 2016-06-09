var url = 'https://pokeapi.co/api/v2/pokemon/?limit=10s&offset=20'

var template = $('.template')
  .clone()
  .removeClass('template')
  .detach();

function loadPokemon(pokemon) {
  $.each(pokemon.results, function(i, mutant) {
    addMutant(mutant);
  });
}

function addMutant(mutant) {
  var li = template.clone();
  li.find('.mutant-name a')
    .text(mutant.name)
    .click(function() {
      $.ajax({
        url: mutant.url,
        method: 'get',
        success: function(pokemon) {
          var dl = $('<dl/>').css({
            "list-style": "none",
            "background-color": "orange",
            "padding": "20px",
          });
          $.each(pokemon.stats, function(i, stats) {
            var dt = $('<dt/>').css({
              "background-color": "yellow",
            }).text(stats.stat.name)
              .attr({"class": "medium-6 columns"});
            var dd = $('<dd/>').css({
              "background-color": "lavender",
            }).text(stats.base_stat)
              .attr({"class": "medium-6 columns"});
            var div = $('<div/>').attr({"class": "row"});
            var li = $('<li/>');
            div.append(dt, dd);
            li.append(div);
            dl.append(li);
          });
          li.append(dl);
        }
      });
    });

  li.attr('data-id', mutant.id);
  $('#mutantList').append(li);
}

$.get({
  url: url,
  success: loadPokemon
});

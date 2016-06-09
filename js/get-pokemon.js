var url = 'https://pokeapi.co/api/v2/pokemon/'

var app = {
  init: function(formSelector, listSelector) {
    this.form = $(formSelector);
    this.list = $(listSelector);
    this.setupEventListeners();
  },

  setupEventListeners: function() {
    this.form.submit(this.getMatch.bind(this));
  },

  getMatch: function(event) {
    event.preventDefault();
    var row = $('<div/>').attr({"class": "row"});
    var column1 = $('<div/>').attr({"class": "medium-6 columns"});
    var column2 = $('<div/>').attr({"class": "medium-6 columns"});
    var pokemon1 = [];
    var pokemon2 = [];
    $.ajax({
      url: url + $('[name="id1"]').val(),
      method: 'get',
      success: function(pokemon) {
        var head = $('<h3/>').css({"text-align": "center",})
          .html(pokemon.forms[0].name + ' <img src="http://pokeapi.co/media/sprites/pokemon/' + pokemon.id + '.png"></img>');
        var dl = $('<dl/>').css({
          "list-style": "none",
          "background-color": "orange",
          "padding": "20px",
        });
        $.each(pokemon.stats, function(i, stats) {
          pokemon1.push(stats.base_stat);
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
          column1.append(head, dl);
        });

        $.ajax({
          url: url + $('[name="id2"]').val(),
          method: 'get',
          success: function(pokemon) {
            var head = $('<h3/>').css({"text-align": "center",})
              .html(pokemon.forms[0].name + ' <img src="http://pokeapi.co/media/sprites/pokemon/' + pokemon.id + '.png"></img>');
            var dl = $('<dl/>').css({
              "list-style": "none",
              "background-color": "orange",
              "padding": "20px",
            });
            $.each(pokemon.stats, function(i, stats) {
              pokemon2.push(stats.base_stat);
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
              column2.append(head, dl);
            });

            var result = $('<h3/>').text('Compatability: ' + app.calculateCompatability(pokemon1, pokemon2) + '%')
                                   .css({"text-align": "center",});
            row.append(column1, column2);
            app.list.html('');
            app.list.append(row, result);
          }
        });
      }
    });
  },

  calculateCompatability: function(pokemon1, pokemon2) {
    var sum = 0;
    for (var i = 0; i < 6; ++i) {
      sum += Math.abs(pokemon1[i] - pokemon2[i]) / ((pokemon1[i] + pokemon2[i]) / 2);
    }

    return Math.round((1 - (sum / 6)) * 100);
  }
};

app.init('#pokeForm', '#pokeList');

function enterSearch(e) {

  if (e.which == 13) {

    console.log("enterSearch");
    transferResearchToAjax();
  }
}

function deleteResults() {

  console.log("deleteResults");
  var movies = $(".movieDescription");
  movies.remove();
}


function transferResearchToAjax() {

  console.log("transferResearchToAjax");
  var input = $("#search");
  var textInput = input.val();

  deleteResults();
  ajax(textInput);
  input.val("");
}

function ajax(title) {

  var outData = {

    api_key: "fae5bdc9ff7c6aeb45ccf6dfa925b470",
    language: "it-IT",
    query: title
  }

  $.ajax({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: outData,
    success: function (data) {

      ajaxResults(data);
    },
    error: function (request, state, error) {
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

function ajaxResults(data) {

  var results = data.results;

  for (var i = 0; i < results.length; i++) {

    var res = results[i];
    var title = res.title;
    var orTitle = res.original_title;
    var language = res.original_language;
    var vote = res.vote_average;

    addTitle(title, orTitle, language, vote);
  }

}

function addTitle(title, orTitle, language, vote) {

  var tempData = {

    title: title,
    orTitle: orTitle,
    language: language,
    vote: vote
  }

  var template = $("#movieTemplate").html();
  var compiled = Handlebars.compile(template);
  var movieDescription = compiled(tempData);

  $(".movies").append(movieDescription);
}

function init() {

  $("#search").keyup(enterSearch);

  $("button").click(transferResearchToAjax);

  //ajax("back in the future");
}

$(document).ready(init);

//creare la ricerca con il tasto button

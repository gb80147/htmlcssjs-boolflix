function enterSearch(e) {                                //la funzione passa la ricerca a "transferResearchToAjax"

  if (e.which == 13) {

    console.log("enterSearch");
    transferResearchToAjax();
  }
}

function deleteOldResults() {                            //funz. che elimina i risultati delle ricerche precedenti

  console.log("deleteOldResults");
  var movies = $(".movieDescription");
  movies.remove();
}


function transferResearchToAjax() {                      //funz. che passa il valore di input alla funz. "ajax"

  console.log("transferResearchToAjax");
  var input = $("#search");                              //assegno valore "input" all'ID "search"
  var textInput = input.val();                           //assegno valore "textInput" al contenuto di "input"

  deleteOldResults();                                    //cancello eventuali ricerche precedenti
  ajaxMovie(textInput);                                  //richiamo la funz. "ajaxMovie" passandogli il contenuto di "input"
  ajaxTvSeries(textInput)                                //richiamo la funz. "ajaxTvSeries" passandogli il contenuto di "input"
  input.val("");                                         //dopo di che il contenuto di "input" ritorna vuoto
}

function ajaxMovie(title) {

  var outData = {

    api_key: "fae5bdc9ff7c6aeb45ccf6dfa925b470",
    language: "it-IT",
    query: title                                         //questo parametro verrà sostituito dalla parola che verrà cercata
  }

  $.ajax({

    url: "https://api.themoviedb.org/3/search/movie",    //url che contiene le informazioni che ci interessano
    method: "GET",
    data: outData,
    success: function (data) {

      ajaxMovieResults(data);
    },
    error: function (request, state, error) {
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

function ajaxTvSeries(title) {

  var outData = {

    api_key: "fae5bdc9ff7c6aeb45ccf6dfa925b470",
    language: "it-IT",
    query: title                                         //questo parametro verrà sostituito dalla parola che verrà cercata
  }

  $.ajax({

    url: "https://api.themoviedb.org/3/search/tv",      //url che contiene le informazioni che ci interessano
    method: "GET",
    data: outData,
    success: function (data) {

      ajaxTvSeriesResults(data);
    },
    error: function (request, state, error) {
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

function ajaxMovieResults(data) {

  var results = data.results;

  for (var i = 0; i < results.length; i++) {

    var res = results[i];
    var title = res.title;
    var orTitle = res.original_title;
    var language = res.original_language;
    var vote = res.vote_average;

    addMovieTitle(title, orTitle, language, vote);
  }
}

function ajaxTvSeriesResults(data) {

  var results = data.results;

  for (var i = 0; i < results.length; i++) {

    var res = results[i];
    var title = res.name;
    var orTitle = res.original_name;
    var language = res.original_language;
    var vote = res.vote_average;

    addTvSeriesTitle(title, orTitle, language, vote);
  }
}

function addMovieTitle(title, orTitle, language, vote) { //funz. che stampa in ".movies"

  var tempData = {                                      //array di dati che sostituiranno i marks del template

    title: title,
    orTitle: orTitle,
    language: getLanguageFlag(language),
    vote: ratingStar(vote)
  }

  var template = $("#movieTemplate").html();            //var. che legge l'html di "#movieTemplate"
  var compiled = Handlebars.compile(template);          //handlebars compila il template creato
  var movieDescription = compiled(tempData);            //scrive nel template i dati posti ad inizio funz.

  $(".movies").append(movieDescription);
}

function addTvSeriesTitle(title, orTitle, language, vote) { //funz. che stampa in ".movies"

  var tempData = {                                      //array di dati che sostituiranno i marks del template

    title: title,
    orTitle: orTitle,
    language: getLanguageFlag(language),
    vote: ratingStar(vote)
  }

  var template = $("#movieTemplate").html();            //var. che legge l'html di "#movieTemplate"
  var compiled = Handlebars.compile(template);          //handlebars compila il template creato
  var movieDescription = compiled(tempData);            //scrive nel template i dati posti ad inizio funz.

  $(".tvSeries").append(movieDescription);
}

function getLanguageFlag(lang){

  var langFlag;

  switch(lang){

    case "it":                                               //se "language" è "it"
    langFlag = "<img src='img/it.png' class='flag'>";        //aggiungi "img" con bandiera italiana
    break;
    case "en":
      langFlag = "<img src='img/en.png' class='flag'>";
    break;
    case "es":
    langFlag = "<img src='img/es.png' class='flag'>";
    break;
    case "de":
      langFlag = "<img src='img/de.png' class='flag'>";
    break;
    case "fr":
      langFlag = "<img src='img/fr.png' class='flag'>";
    break;
    case "ja":
      langFlag = "<img src='img/jp.png' class='flag'>";
    break;
    case "zh":
      langFlag = "<img src='img/cn.png' class='flag'>";
    break;
    default:
    langFlag = "<img src='img/noFlag.png' class='flag'>";
  }

  return langFlag;
}


function ratingStar(vote) {

  var roundedVote = Math.ceil(vote) / 2;                //prendo il voto, lo arrotondo per eccesso e lo divido per 2
  var emptyStar = "<i class='far fa-star'></i>";
  var fullStar = "<i class='fas fa-star'></i>";
  var ratingStar = "";                                  //variabile vuota dove andremo ad aggiungere le stelle

  for (var i = 1; i <= 5; i++) {                        //inizio ciclo per aggiungere stelle

    if (i <= roundedVote) {                             //se "i" è <= del voto arrotondato
      ratingStar += fullStar;                           //aggiungi una stella piena a "ratingStar"
    } else {                                            //altrimenti
      ratingStar += emptyStar;                          //aggiungi una stella vuota a "ratingStar"
    }
  }

  return ratingStar;
}

function init() {

  $("#search").keyup(enterSearch);                    //premendo invio parte la funzione "enterSearch"

  $("button").click(transferResearchToAjax);          //cliccando il tasto "cerca" parte la funzione "transferResearchToAjax"
}

$(document).ready(init);

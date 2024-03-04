/*
    QUESTO FILE DIPENDE DA FUNZIONI DI cookieHandler.js;
    ASSICURARSI DI INCLUDERE IL FILE ""PRIMA"" DELL'INCLUSIONE
    DI QUESTO JS ALL'INTERNO DELL'HTML.
*/

function completeCalendar() {
  checkCookie();
  var nome = getCookie("cartella");
  var nomeFile = "/data/" + nome + "/" + nome + "_Calendario.dat";
  $(".tabella").html("");
  $.get(nomeFile, function (file) {
    var riga = file.split("\n");
    $.each(riga, function (elem) {
      if (riga[elem] == "") {
        return;
      }
      var data = riga[elem].split(",");
      var row = "";
      if (data[8] == "\r") {
        data[8] = "";
      }

      img1 = data[2] + ".jpg";
      img2 = data[3] + ".jpg";

      var risultato = data[6].split("/");

      if (risultato[0] == "0-0") {
        risultato[1] = "0-0";
        risultato[2] = "0-0";
        risultato[3] = "0-0";
        risultato[4] = "0-0";
        risultato[5] = "0-0";
      }

      row = $(
        '<div class="rigaTab" style="padding-bottom: 5px;" id="_' +
          data[0] +
          '">' +
          '<div class="row">' +
          '<div class="row">' +
          '<div class="col py-0">' +
          '<div class="text-center fw-bolder">[Part.N.: ' +
          data[0] +
          "] [Girone: " +
          data[7] +
          "] [Giornata:" +
          data[1] +
          "]</div>" +
          "</div>" +
          "</div>" +
          '<div class="row">' +
          '<div class="col py-0">' +
          '<div class="text-center">' +
          data[4] +
          " - Arb.: " +
          data[5] +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="row">' +
          '<div class="col-6">' +
          '<img class="d-inline-block rounded" src="/data/' +
          nome +
          "/icon/" +
          img1 +
          '" style="padding: 5px; max-width: 50px" />' +
          '<div class="rounded border fw-bolder" style="margin-top: 4px; margin-bottom: 4px; max-width: fit-content; margin-left: auto; margin-right: auto;">' +
          data[2] +
          "</div>" +
          "</div>" +
          '<div class="col-6">' +
          '<img class="d-inline-block rounded"src="/data/' +
          nome +
          "/icon/" +
          img2 +
          '" style="padding: 5px; max-width: 50px" />' +
          '<div class="rounded border fw-bolder" style="margin-top: 4px; margin-bottom: 4px; max-width: fit-content; margin-left: auto; margin-right: auto;">' +
          data[3] +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="row">' +
          '<div class="col py-0">' +
          '<div class="text-center text-danger fw-bolder">Ris. = ' +
          risultato[0] +
          " [" +
          risultato[1] +
          "/" +
          risultato[2] +
          "/" +
          risultato[3] +
          "/" +
          risultato[4] +
          "/" +
          risultato[5] +
          "]</div>" +
          "</div>" +
          "</div>" +
          '<div class="row">' +
          '<div class="col py-0">' +
          '<div class="text-center">' +
          data[8] +
          "</div></div>" +
          "</div></div></div>"
      );
      //console.log(data);
      if (data[0] != "undefined" || data[0] != "" || data[0] != " ") {
        $("#tabella").append(row);
      }
    });
  });
}

function titleAppend() {
  $(".tabellone").html("");
  var nome = getCookie("cartella");
  var nomeFile = "/data/codiciTornei.txt";
  $.get(nomeFile, function (file) {
    var riga = file.split("\n");
    $.each(riga, function (elem) {
      if (riga[elem] == "") {
        return;
      }
      var data = riga[elem].split(",");
      var row = "";
      var titolo = "";
      if (data[0] == nome) {
        titolo = data[1];
        row = $(
          '<h3 class="text-black" align=center>Calendario torneo ' +
            titolo +
            "</h3>"
        );
      }
      $("#tabellone").append(row);
    });
  });
}

function showSquad() {
  checkCookie();
  var nome = getCookie("cartella");
  var nomeFile = "/data/" + nome + "/" + nome + "_Squadre.dat";
  $.get(nomeFile, function (file) {
    resettaSquad();
    var riga = file.split("\n");
    $.each(riga, function (elem) {
      if (riga[elem] == "") {
        return;
      }
      var data = riga[elem].split(",");
      var row = "";
      if (data[8] == "\r") {
        data[8] = "";
      }
      row = $('<option value="' + data[0] + '">' + data[0] + "</option>");
      //console.log(data);
      if (
        data[0] != "undefined" ||
        data[0] != "" ||
        data[0] != " " ||
        data[0] != null
      ) {
        $("#form").append(row);
      }
    });
  });
}

function resettaSquad() {
  $(".squadre").html("");
  row = $(
    '<select class="form-select" id="form" name="form" aria-label="Default select example"><option selected>Selez. il team</option></select>'
  );
  $(".squadre").append(row);
}

function showGiornate() {
  checkCookie();
  var nome = getCookie("cartella");
  var nomeFile = "/data/" + nome + "/" + nome + "_Calendario.dat";
  var indice = 1;
  $.get(nomeFile, function (file) {
    resettaGiornate();
    var riga = file.split("\n");
    $.each(riga, function (elem) {
      if (riga[elem] == "") {
        return;
      }
      var data = riga[elem].split(",");
      var row = "";
      if (data[8] == "\r") {
        data[8] = "";
      }
      if (indice == data[1]) {
        indice = data[1];
        row = $('<option value="' + data[1] + '">' + data[1] + "</option>");
        indice++;
        $("#form2").append(row);
      }
    });
  });
}

function resettaGiornate() {
  $(".giornate").html("");
  row = $(
    '<select class="form-select" id="form2" name="form2" aria-label="Default select example"><option selected>Selez. la giornata</option></select>'
  );
  $(".giornate").append(row);
}

function setFilter() {
  var nomeFilter = $("#form").val();
  var giornoFilter = $("#dateStandard").val();
  var giornata = $("#form2").val();
  var modificaGiornoFilter = giornoFilter.split("-");
  giornoFilter =
    modificaGiornoFilter[2] +
    "/" +
    modificaGiornoFilter[1] +
    "/" +
    modificaGiornoFilter[0];

  checkCookie();
  var nome = getCookie("cartella");
  var nomeFile = "/data/" + nome + "/" + nome + "_Calendario.dat";
  $(".tabella").html("");
  $.get(nomeFile, function (file) {
    var riga = file.split("\n");
    $.each(riga, function (elem) {
      if (riga[elem] == "") {
        return;
      }
      var data = riga[elem].split(",");
      var row = "";
      if (data[8] == "\r") {
        data[8] = "";
      }

      img1 = data[2] + ".jpg";
      img2 = data[3] + ".jpg";

      var risultato = data[6].split("/");

      if (risultato[0] == "0-0") {
        risultato[1] = "0-0";
        risultato[2] = "0-0";
        risultato[3] = "0-0";
        risultato[4] = "0-0";
        risultato[5] = "0-0";
      }

      var giorno1 = data[4].split(" ");
      var giorno2 = giorno1[0];
      var oggi = Date.now();
      var oggiGiorno = new Date(oggi).getDate();
      var oggiMese = new Date(oggi).getMonth();
      var oggiAnno = new Date(oggi).getFullYear();
      oggi = oggiGiorno + "/" + oggiMese + "/" + oggiAnno;

      if (
        ((nomeFilter == data[2] || nomeFilter == data[3]) &&
          giornoFilter == giorno2 &&
          giornata == data[1]) ||
        (nomeFilter == "Selez. il team" &&
          giornoFilter == giorno2 &&
          giornata == "Selez. la giornata") ||
        ((nomeFilter == data[2] || nomeFilter == data[3]) &&
          giornoFilter == "undefined/undefined/" &&
          giornata == "Selez. la giornata") ||
        ((nomeFilter == data[2] || nomeFilter == data[3]) &&
          giornoFilter == giorno2 &&
          giornata == "Selez. la giornata") ||
        ((nomeFilter == data[2] || nomeFilter == data[3]) &&
          giornoFilter == "undefined/undefined/" &&
          giornata == data[1]) ||
        (nomeFilter == "Selez. il team" &&
          giornoFilter == giorno2 &&
          giornata == data[1]) ||
        (nomeFilter == "Selez. il team" &&
          giornoFilter == "undefined/undefined/" &&
          giornata == data[1])
      ) {
        row = $(
          '<div class="rigaTab" style="padding-bottom: 5px;" id="_' +
            data[0] +
            '">' +
            '<div class="row">' +
            '<div class="row">' +
            '<div class="col py-0">' +
            '<div class="text-center fw-bolder">[Part.N.: ' +
            data[0] +
            "] [Girone: " +
            data[7] +
            "] [Giornata:" +
            data[1] +
            "]</div>" +
            "</div>" +
            "</div>" +
            '<div class="row">' +
            '<div class="col py-0">' +
            '<div class="text-center">' +
            data[4] +
            " - Arb.: " +
            data[5] +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="row">' +
            '<div class="col-6">' +
            '<img class="d-inline-block rounded" src="/data/' +
            nome +
            "/icon/" +
            img1 +
            '" style="padding: 5px; max-width: 50px" />' +
            '<div class="rounded border fw-bolder" style="margin-top: 4px; margin-bottom: 4px; max-width: fit-content; margin-left: auto; margin-right: auto;">' +
            data[2] +
            "</div>" +
            "</div>" +
            '<div class="col-6">' +
            '<img class="d-inline-block rounded"src="/data/' +
            nome +
            "/icon/" +
            img2 +
            '" style="padding: 5px; max-width: 50px" />' +
            '<div class="rounded border fw-bolder" style="margin-top: 4px; margin-bottom: 4px; max-width: fit-content; margin-left: auto; margin-right: auto;">' +
            data[3] +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="row">' +
            '<div class="col py-0">' +
            '<div class="text-center text-danger fw-bolder">Ris. = ' +
            risultato[0] +
            " [" +
            risultato[1] +
            "/" +
            risultato[2] +
            "/" +
            risultato[3] +
            "/" +
            risultato[4] +
            "/" +
            risultato[5] +
            "]</div>" +
            "</div>" +
            "</div>" +
            '<div class="row">' +
            '<div class="col py-0">' +
            '<div class="text-center">' +
            data[8] +
            "</div></div>" +
            "</div></div></div>"
        );
        //console.log(data);
        if (data[0] != "undefined" || data[0] != "" || data[0] != " ") {
          $("#tabella").append(row);
        }
      }
    });
  });
}
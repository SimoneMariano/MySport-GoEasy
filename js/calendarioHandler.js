/*
    QUESTO FILE DIPENDE DA FUNZIONI DI cookieHandler.js;
    ASSICURARSI DI INCLUDERE IL FILE ""PRIMA"" DELL'INCLUSIONE
    DI QUESTO JS ALL'INTERNO DELL'HTML.
*/
function resetCalendar() {
  resettaSquad();
  $("#dateStandard").val('');
  resettaGiornate();
  completeCalendar();
}

function completeCalendar() {
  checkCookie();
  var cookie = getCookie("cartella");
  var squadraFilter = $("#form1").val();
  var giornoFilter = $("#dateStandard").val();
  var giornataFilter = $("#form2").val()

  if (!squadraFilter || squadraFilter === 'Selez. il team') {squadraFilter = '';}
  if (!giornoFilter) {giornoFilter = '';}
  if (!giornataFilter || giornataFilter === 'Selez. la giornata') {giornataFilter = '';}


  console.log(giornoFilter);

  $(".tabella").html("");
  $(document).ready(function () {
    $.ajax({
      url: "/MySport-GoEasy/php/calendarioHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "POST",
      data: { cookie: cookie, squadraFilter: squadraFilter, giornoFilter: giornoFilter, giornataFilter: giornataFilter},
      success: function (response) {
        console.log(response);
        var data = JSON.parse(response);
        var dataList = $("#tabella");
        // Loop attraverso i dati e aggiungi elementi alla lista
        for (var i = 0; i < data.length; i++) {
          img1 = data[i].squadraCasa + ".jpg";
          img2 = data[i].squadraTrasferta + ".jpg";

          var risultato = data[i].punteggio.split("/");

          if (risultato[0] == "0-0") {
            risultato[1] = "0-0";
            risultato[2] = "0-0";
            risultato[3] = "0-0";
            risultato[4] = "0-0";
            risultato[5] = "0-0";
          }

          if (data[i].arFlag == "A") {
            data[i].arFlag = "Andata";
          }
          if (data[i].arFlag == "R") {
            data[i].arFlag = "Ritorno";
          }
          if (data[i].noteArbitro == "-") {
            data[i].noteArbitro = "";
          }

          dataList.append(
            '<div class="rigaTab" style="padding-bottom: 5px;" id="_' +
              data[i].numeroPartita +
              '">' +
              '<div class="row">' +
              '<div class="row">' +
              '<div class="col py-0">' +
              '<div class="text-center fw-bolder">[Part.N.: ' +
              data[i].numeroPartita +
              "] [Girone: " +
              data[i].arFlag +
              "] [Giornata:" +
              data[i].numeroGiornata +
              "]</div>" +
              "</div>" +
              "</div>" +
              '<div class="row">' +
              '<div class="col py-0">' +
              '<div class="text-center">' +
              data[i].orarioGara +
              " - Arb.: " +
              data[i].nomeArbitro +
              "</div>" +
              "</div>" +
              "</div>" +
              '<div class="row">' +
              '<div class="col-6">' +
              '<img class="d-inline-block rounded" src="/MySport-GoEasy/data/' +
              data[i].codiceTorneo +
              "/icon/" +
              img1 +
              '" style="padding: 5px; max-width: 50px" />' +
              '<div class="rounded border fw-bolder" style="margin-top: 4px; margin-bottom: 4px; max-width: fit-content; margin-left: auto; margin-right: auto;">' +
              data[i].squadraCasa +
              "</div>" +
              "</div>" +
              '<div class="col-6">' +
              '<img class="d-inline-block rounded"src="/MySport-GoEasy/data/' +
              data[i].codiceTorneo +
              "/icon/" +
              img2 +
              '" style="padding: 5px; max-width: 50px" />' +
              '<div class="rounded border fw-bolder" style="margin-top: 4px; margin-bottom: 4px; max-width: fit-content; margin-left: auto; margin-right: auto;">' +
              data[i].squadraTrasferta +
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
              data[i].noteArbitro +
              "</div></div>" +
              "</div></div></div>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });
}

function showSquad() {
  checkCookie();
  var cookie = getCookie("cartella");
  $(document).ready(function () {
    resettaSquad();
    $.ajax({
      url: "/MySport-GoEasy/php/formCalendarHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "POST",
      data: { cookie: cookie },
      success: function (response) {
        //console.log(response);
        var data = JSON.parse(response);
        var dataList = $("#form1");
        // Loop attraverso i dati e aggiungi elementi alla lista
        for (var i = 0; i < data.length; i++) {
          dataList.append(
            '<option value="' +
              data[i].nomeSquadra +
              '">' +
              data[i].nomeSquadra +
              "</option>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });
}

function resettaSquad() {
  $(".squadre").html("");
  row = $(
    '<select class="form-select" id="form1" name="form1" aria-label="Default select example"><option selected>Selez. il team</option></select>'
  );
  $(".squadre").append(row);
}

function showGiornate() {
  checkCookie();
  var cookie = getCookie("cartella");
  resettaGiornate();
  $(document).ready(function () {
    $.ajax({
      url: "/MySport-GoEasy/php/giornateCalendarHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "POST",
      data: { cookie: cookie },
      success: function (response) {
        //console.log(response);
        var data = JSON.parse(response);
        var dataList = $("#form2");
        // Loop attraverso i dati e aggiungi elementi alla lista
        var temp = "";
        for (var i = 0; i < data.length; i++) {
          if (data[i].numeroGiornata != temp) {
            dataList.append(
              '<option value="' +
                data[i].numeroGiornata +
                '">' +
                data[i].numeroGiornata +
                "</option>"
            );
            temp = data[i].numeroGiornata;
          }
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
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

/*function setFilter() {
  var nomeFilter = $("#form").val();
  var giornoFilter = $("#dateStandard").val();
  console.log(giornoFilter);
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
      if (data[i].noteArbitro == "\r") {
        data[i].noteArbitro = "";
      }

      img1 = data[i].squadraCasa + ".jpg";
      img2 = data[i].squadraTrasferta + ".jpg";

      var risultato = data[6].split("/");

      if (risultato[0] == "0-0") {
        risultato[1] = "0-0";
        risultato[2] = "0-0";
        risultato[3] = "0-0";
        risultato[4] = "0-0";
        risultato[5] = "0-0";
      }

      var giorno1 = data[i].orarioGara.split(" ");
      var giorno2 = giorno1[0];
      var oggi = Date.now();
      var oggiGiorno = new Date(oggi).getDate();
      var oggiMese = new Date(oggi).getMonth();
      var oggiAnno = new Date(oggi).getFullYear();
      oggi = oggiGiorno + "/" + oggiMese + "/" + oggiAnno;

      if (
        ((nomeFilter == data[i].squadraCasa ||
          nomeFilter == data[i].squadraTrasferta) &&
          giornoFilter == giorno2 &&
          giornata == data[1]) ||
        (nomeFilter == "Selez. il team" &&
          giornoFilter == giorno2 &&
          giornata == "Selez. la giornata") ||
        ((nomeFilter == data[i].squadraCasa ||
          nomeFilter == data[i].squadraTrasferta) &&
          giornoFilter == "undefined/undefined/" &&
          giornata == "Selez. la giornata") ||
        ((nomeFilter == data[i].squadraCasa ||
          nomeFilter == data[i].squadraTrasferta) &&
          giornoFilter == giorno2 &&
          giornata == "Selez. la giornata") ||
        ((nomeFilter == data[i].squadraCasa ||
          nomeFilter == data[i].squadraTrasferta) &&
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
            data[i].numeroPartita +
            '">' +
            '<div class="row">' +
            '<div class="row">' +
            '<div class="col py-0">' +
            '<div class="text-center fw-bolder">[Part.N.: ' +
            data[i].numeroPartita +
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
            data[i].orarioGara +
            " - Arb.: " +
            data[i].nomeArbitro +
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
            data[i].squadraCasa +
            "</div>" +
            "</div>" +
            '<div class="col-6">' +
            '<img class="d-inline-block rounded"src="/data/' +
            nome +
            "/icon/" +
            img2 +
            '" style="padding: 5px; max-width: 50px" />' +
            '<div class="rounded border fw-bolder" style="margin-top: 4px; margin-bottom: 4px; max-width: fit-content; margin-left: auto; margin-right: auto;">' +
            data[i].squadraTrasferta +
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
            data[i].noteArbitro +
            "</div></div>" +
            "</div></div></div>"
        );
        //console.log(data);
        if (
          data[i].numeroPartita != "undefined" ||
          data[i].numeroPartita != "" ||
          data[i].numeroPartita != " "
        ) {
          $("#tabella").append(row);
        }
      }
    });
  });
}*/

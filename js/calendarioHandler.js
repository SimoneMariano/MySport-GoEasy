/*
    QUESTO FILE DIPENDE DA FUNZIONI DI cookieHandler.js;
    ASSICURARSI DI INCLUDERE IL FILE ""PRIMA"" DELL'INCLUSIONE
    DI QUESTO JS ALL'INTERNO DELL'HTML.
*/
function resetCalendar() {
  $("#form1").val("Selez. il team");
  $("#dateStandard").val("");
  $("#form2").val("Selez. la giornata");
  completeCalendar();
}

function completeCalendar() {
  checkCookie();
  var cookie = getCookie("cartella");
  var squadraFilter = $("#form1").val();
  var giornoFilter = $("#dateStandard").val();
  var giornataFilter = $("#form2").val();

  if (!squadraFilter || squadraFilter === "Selez. il team") {
    squadraFilter = "";
  }
  if (!giornoFilter) {
    giornoFilter = "";
  }
  if (!giornataFilter || giornataFilter === "Selez. la giornata") {
    giornataFilter = "";
  }

  $(".tabella").html("");
  $(document).ready(function () {
    $.ajax({
      url: "/php/calendarioHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "POST",
      data: {
        cookie: cookie,
        squadraFilter: squadraFilter,
        giornoFilter: giornoFilter,
        giornataFilter: giornataFilter,
      },
      success: function (response) {
        var data = JSON.parse(response);
        var dataList = $("#tabella");
        // Loop attraverso i dati e aggiungi elementi alla lista
        for (var i = 0; i < data.length; i++) {
          img1 = ((data[i].squadraCasa).toString()).toUpperCase() + ".jpg";
          img2 = ((data[i].squadraTrasferta).toString()).toUpperCase() + ".jpg";

          var risultato = data[i].punteggio.split("/");

          if (risultato[0] == "0-0") {
            risultato[1] = "0-0";
            risultato[2] = "0-0";
            risultato[3] = "0-0";
            risultato[4] = "0-0";
            risultato[5] = "0-0";
          }

          var parziale = [];
          for (var o = 0; o < risultato.length; o++) {
            parziale.push(risultato[o].split("-"));
          }

          for (var x = 1; x <= 5; x++) {
            if (parziale[x][0].length == 1) {
              parziale[x][0] = "0" + parziale[x][0];
            }
          }

          for (var y = 1; y <= 5; y++) {
            if (parziale[y][1].length == 1) {
              parziale[y][1] = "0" + parziale[y][1];
            }
          }

          if (data[i].arFlag == "A") {
            data[i].arFlag = "Andata";
          }
          if (data[i].arFlag == "R") {
            data[i].arFlag = "Ritorno";
          }

          var noteArbitro = data[i].noteArbitro.split("|");

          codice = noteArbitro[0];
          note = noteArbitro[1];

          var orarioGara = data[i].orarioGara.split(" ");
          var orario = orarioGara[1].split(":");
          var ore = orario[0];
          var minuti = orario[1];
          var giorno = orarioGara[0].split("-");
          var anno = giorno[0];
          var mese = giorno[1];
          var giorni = giorno[2];

          dataList.append(
            '<div class="container-fluid border-bottom" style="padding: 20px;"' +
              'data-bs-toggle="modal" data-bs-target="#modal' +
              data[i].numeroPartita +
              '" onMouseOver="this.style.backgroundColor=\'lightgray\'" onMouseOut="this.style.backgroundColor=\'\'">' +
              '<div class="row">' +
              '<div class="col">' +
              '<p class="mb-0" style="text-align: center; margin: 0 auto">' +
              "Data: <b>" +
              giorni +
              "/" +
              mese +
              "/" +
              anno +
              "</b> | Ora: <b>" +
              ore +
              "." +
              minuti +
              " " +
              note +
              "</b></p></div></div>" +
              '<div class="row">' +
              '<div class="col">' +
              '<div class="row align-items-center" style="padding-bottom: 10px;">' +
              '<div class="col-auto">' +
              '<img style="max-width: 85px; max-height: 85px; padding: 8px;" src="/data/' +
              data[i].codiceTorneo +
              "/icon/" +
              img1 +
              '" onerror="this.onerror=null; this.src=\'/images/msgelogo.jpg\';" class="img-fluid" /></div>' +
              '<div class="col" text-start><p class="mb-0" style="text-align: start;"><b>' +
              data[i].squadraCasa +
              "</b></p></div>" +
              '<div class="col text-end">' +
              '<p class="mb-0">Set: <b>' +
              parziale[0][0] +
              '</b></p><div class="hide-sm"><p class="mb-0">Parziali: ' +
              parziale[1][0] +
              " - " +
              parziale[2][0] +
              " - " +
              parziale[3][0] +
              " - " +
              parziale[4][0] +
              " - " +
              parziale[5][0] +
              "</p></div></div></div></div></div>" +
              '<div class="row"><div class="col"><div class="row align-items-center">' +
              '<div class="col-auto">' +
              '<img style="max-width: 85px; max-height: 85px; padding: 8px;" src="/data/' +
              data[i].codiceTorneo +
              "/icon/" +
              img2 +
              '" onerror="this.onerror=null; this.src=\'/images/msgelogo.jpg\';" class="img-fluid" /></div>' +
              '<div class="col" text-start><p class="mb-0" style="text-align: start;"><b>' +
              data[i].squadraTrasferta +
              "</b></p></div>" +
              '<div class="col text-end">' +
              '<p class="mb-0">Set: <b>' +
              parziale[0][1] +
              "</b></p>" +
              '<div class="hide-sm"><p class="mb-0">Parziali: ' +
              parziale[1][1] +
              " - " +
              parziale[2][1] +
              " - " +
              parziale[3][1] +
              " - " +
              parziale[4][1] +
              " - " +
              parziale[5][1] +
              "</p></div></div></div></div></div></div>" +
              '<div class="modal fade" id="modal' +
              data[i].numeroPartita +
              '" aria-labelledby="ModalLabel' +
              data[i].numeroPartita +
              '" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-4 fw-bolder" id="ModalLabel' +
              data[i].numeroPartita +
              '" style="margin: auto;">Giornata: ' +
              data[i].numeroGiornata +
              " Part.N. :" +
              data[i].numeroPartita +
              " Girone: " +
              data[i].arFlag +
              '</h1></div><div class="modal-body" style="padding-bottom: 5px; font-size: small;"><div class="row"><div class="row"><div class="col py-0"><div class="text-center">' +
              ore +
              "." +
              minuti +
              " - " +
              giorni +
              "/" +
              mese +
              "/" +
              anno +
              " - Arb.: " +
              data[i].nomeArbitro +
              '<br /></div></div></div><div class="row"><div class="col-6"><div class="row"><img class="rounded" src="/data/' +
              data[i].codiceTorneo +
              "/icon/" +
              img1 +
              '" onerror="this.onerror=null; this.src=\'/images/msgelogo.jpg\';" style="padding: 5px; max-width: 50px; max-height: 50px; margin:auto"/></div><div class="row"><div class="rounded border fw-bolder" style="margin-top: 4px; margin-bottom: 4px; max-width: fit-content; margin-left: auto; margin-right: auto;">' +
              data[i].squadraCasa +
              '</div></div></div><div class="col-6"><div class="row"><img class="rounded" src="/data/' +
              data[i].codiceTorneo +
              "/icon/" +
              img2 +
              '" onerror="this.onerror=null; this.src=\'/images/msgelogo.jpg\';" style="padding: 5px; max-width: 50px; max-height: 50px; margin:auto"/></div><div class="row"><div class="rounded border fw-bolder" style="margin-top: 4px; margin-bottom: 4px; max-width: fit-content; margin-left: auto; margin-right: auto;">' +
              data[i].squadraTrasferta +
              '</div></div></div></div></div><div class="row"><div class="col py-0"><div class="text-center text-danger fw-bolder">Ris. = ' +
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
              "]</div></div></div>" +
              '<div class="row"><div class="col py-0"><div class="text-center">' +
              '<p class="text">Indirizzo campo: ' +
              '<a href="http://maps.google.com/?q=' +
              data[i].indirizzoSquadra +
              '" target="_blank">' +
              data[i].indirizzoSquadra +
              "</a>" +
              "</p>" +
              '</div></div></div><div class="row"><div class="col py-0"><div class="text-center">' +
              note +
              '</div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">' +
              "Chiudi</button></div></div></div></div></div>"
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
      url: "/php/formCalendarHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "POST",
      data: { cookie: cookie },
      success: function (response) {
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
      url: "/php/giornateCalendarHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "POST",
      data: { cookie: cookie },
      success: function (response) {
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

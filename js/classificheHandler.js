/*
    QUESTO FILE DIPENDE DA FUNZIONI DI cookieHandler.js;
    ASSICURARSI DI INCLUDERE IL FILE ""PRIMA"" DELL'INCLUSIONE
    DI QUESTO JS ALL'INTERNO DELL'HTML.
*/

/*function pulisciTabellaClass() {
    $(".content").html("");
    row = $(
      '<table class="table table-hover table-light" border="0" cellspacing="0" cellpadding="0" id="tabella"><thead><tr id="intestazione"><th></th><th></th><th></th><th>G</th><th>Pt</th><th>V</th><th>P</th><th>Sv</th><th>Sp</th></tr></thead><tbody></tbody></table>'+
      '<script>$(document).ready(function() {$("#tabella").tablesorter({ sortList: [ [0, 0] ] });});</script>'
    );
    $(".content").append(row);
  }*/

  function completeClass() {
    checkCookie();
    var cookie = getCookie("cartella");
    $(document).ready(function () {
      //pulisciTabellaClass();
      $.ajax({
        url: "/MySport-GoEasy/php/classificheHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
        method: "POST",
        data: { cookie: cookie },
        success: function (response) {
          //console.log(response);
          var data = JSON.parse(response);
          var dataList = $("#content");
          // Loop attraverso i dati e aggiungi elementi alla lista
          for (var i = 0; i < data.length; i++) {
            dataList.append(

              '<div class="col-sm-4"><div class="card shadow p-3 mb-5 bg-body rounded" style="text-align: center; margin: 5px; this.hover: gray;" data-bs-toggle="modal" data-bs-target="#modal'+ 
              data[i].posizioneClassifica +
              '"><div class="row g-0"><div class="col-lg-4"><img  style="margin-top: 4px;" src="/MySport-GoEasy/data/'+
              data[i].codiceTorneo +
              '/icon/'+
              data[i].nomeSquadra +
              '.jpg" class="img-fluid rounded-start" /></div><div class="col-lg-8"><div class="card-body"><h5 class="card-title">Posizione: '+
              data[i].posizioneClassifica +
              '</h5><p class="card-text">'+
              data[i].nomeSquadra +
              '<br>Partite giocate: '+
              data[i].partiteGiocate +
              ', Vittorie: '+
              data[i].partiteVinte +
              ', Sconfitte: '+
              data[i].partitePerse +
              '</p> </div></div><i class="fa-solid fa-caret-down fa-2xs" style="color: #c0c0c0;"></i></div></div></div>'+
              '<div class="modal fade" id="modal' +
              data[i].posizioneClassifica +
              '" style="text-align: center; aria-labelledby="ModalLabel' +
              data[i].posizioneClassifica +
              '" aria-hidden="true" tabindex="-1"  margin: auto;">' +
              '<div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="ModalLabel' + 
              data[i].posizioneClassifica +
              '">Dati e statistiche</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">' +
              '<p class="text">Partite giocate: '+
              data[i].partiteGiocate +
              ' ( Vittorie: '+
              data[i].partiteVinte +
              ' - Sconfitte: '+
              data[i].partitePerse +
              ' )</br>Punti ottenuti: '+
              data[i].puntiFatti+
              ' - Penalità: ' +
              data[i].penalità +
              ' </br>Set vinti: ' +
              data[i].setVinti +
              ' - Set persi: ' +
              data[i].setPersi+
              ' </br>Punti fatti: ' +
              data[i].puntiFatti +
              ' - Punti subiti: ' +
              data[i].puntiSubiti +
              ' </br>Rateo set: ' +
              data[i].rateoSet +
              ' - Rateo punti: ' +
              data[i].rateoPunti +
              '</p></div></div></div></div>'

              /*"<tr style='border-spacing=0px;'><td>" +
              data[i].posizioneClassifica +
              "</td><td>" +
              '<img class="d-inline-block rounded"src="/MySport-GoEasy/data/'+ data[i].codiceTorneo +'/icon/' + data[i].nomeSquadra +'.jpg' + '" style="max-width: 40px" />'+
              "</td><td>" +
              data[i].nomeSquadra +
              "</td><td>" +
              data[i].partiteGiocate +
              "</td><td>" +
              data[i].puntiSquadra +
              "</td><td>" +
              data[i].partiteVinte +
              "</td><td>" +
              data[i].partitePerse +
              "</td><td>" +
              data[i].setVinti +
              "</td><td>" +
              data[i].setPersi +
              "</td><td>" +
              data[i].puntiFatti +
              "</td><td>" +
              data[i].puntiSubiti +
              "</td><td>" +
              data[i].rateoSet +
              "</td><td>" +
              data[i].rateoPunti +
              "</td><td>" +
              data[i].penalità +
              "</td></tr>"*/
            );
          }
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
        },
      });
    });
  }

      /*  var nomilunghi = data[1].split(" ");
        var nomeFixed;
        if (nomilunghi.length == 1) {
          if (nomilunghi[0].length > 10) {
            nomeFixed = nomilunghi[0].substr(0, 10);
            var nome2 = nomilunghi[0].substr(11);
            nomeFixed = nomeFixed + " " + nome2;
          } else {
            nomeFixed = data[1];
          }
        } else {
          nomeFixed = data[1];
        }

        var datatot = parseInt(data[3]) + parseInt(data[10]);*/
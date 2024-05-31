/*
    QUESTO FILE DIPENDE DA FUNZIONI DI cookieHandler.js;
    ASSICURARSI DI INCLUDERE IL FILE ""PRIMA"" DELL'INCLUSIONE
    DI QUESTO JS ALL'INTERNO DELL'HTML.
*/

  function completeClass() {
    checkCookie();
    var cookie = getCookie("cartella");
    $(document).ready(function () {
      $.ajax({
        url: "/php/classificheHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
        method: "POST",
        data: { cookie: cookie },
        success: function (response) {
          var data = JSON.parse(response);
          var dataList = $("#content");
          // Loop attraverso i dati e aggiungi elementi alla lista
          for (var i = 0; i < data.length; i++) {

            var rateoSet = data[i].setVinti / data[i].setPersi;

            var rateoPunti = data[i].puntiFatti / data[i].puntiSubiti;

            var temp = Number((Math.abs(rateoSet) * 100).toPrecision(15));
            rateoSet = Math.round(temp) / 100 * Math.sign(rateoSet);

            temp = Number((Math.abs(rateoPunti) * 100).toPrecision(15));
            rateoPunti = Math.round(temp) / 100 * Math.sign(rateoPunti);

            if (data[i].penalità == null) {
              data[i].penalità = 0;
            }

            dataList.append(

              '<div class="col-sm-4"><div class="card shadow p-3 mb-5 bg-body rounded" style="text-align: center; margin: 5px; this.hover: gray;" data-bs-toggle="modal" data-bs-target="#modal'+ 
              data[i].posizioneClassifica +
              '"><div class="row g-0"><div class="col-lg-4"><img  style="margin-top: 4px;" src="/data/'+
              data[i].codiceTorneo +
              '/icon/'+
              data[i].nomeSquadra +
              '.jpg" onerror="this.onerror=null; this.src=\'/images/icon.png\';" class="img-fluid rounded-start" /></div><div class="col-lg-8"><div class="card-body"><h5 class="card-title">Posizione: '+
              data[i].posizioneClassifica +
              '</h5><p class="card-text">'+
              data[i].nomeSquadra +
              '<br>Partite giocate: '+
              data[i].partiteGiocate +
              '<br>Vittorie: '+
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
              rateoSet +
              ' - Rateo punti: ' +
              rateoPunti +
              '</p></div></div></div></div>'
            );
          }
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
        },
      });
    });
  }

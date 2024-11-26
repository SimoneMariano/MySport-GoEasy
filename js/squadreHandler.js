/*
    QUESTO FILE DIPENDE DA FUNZIONI DI cookieHandler.js;
    ASSICURARSI DI INCLUDERE IL FILE ""PRIMA"" DELL'INCLUSIONE
    DI QUESTO JS ALL'INTERNO DELL'HTML.
*/

function completeSquad() {
  checkCookie();
  var cookie = getCookie("cartella");
  $.ajax({
    url: "/php/squadreHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
    method: "POST",
    data: { cookie: cookie },
    success: function (response) {
      var data = JSON.parse(response);
      var dataList = $("#content");
      // Loop attraverso i dati e aggiungi elementi alla lista
      for (var i = 0; i < data.length; i++) {

        if (data[i].giornoGaraPreferito==1){
          data[i].giornoGaraPreferito = "Lunedì";
        }
        else if (data[i].giornoGaraPreferito==2) {
          data[i].giornoGaraPreferito = "Martedì";
        }
        else if (data[i].giornoGaraPreferito==3) {
          data[i].giornoGaraPreferito = "Mercoledì";
        }
        else if (data[i].giornoGaraPreferito==4) {
          data[i].giornoGaraPreferito = "Giovedì";
        }
        else if (data[i].giornoGaraPreferito==5) {
          data[i].giornoGaraPreferito = "Venerdì";
        }
        else if (data[i].giornoGaraPreferito==6) {
          data[i].giornoGaraPreferito = "Sabato";
        }
        else if (data[i].giornoGaraPreferito==7) {
          data[i].giornoGaraPreferito = "Domenica";
        } else {
          data[i].giornoGaraPreferito = "Non specificata";
        }

        dataList.append(

          '<div class="col-sm-4"><div class="card shadow p-3 mb-5 h-75 bg-body rounded" style="text-align: center; this.hover: gray;"' +
          ' data-bs-toggle="modal" data-bs-target="#modal'+ 
          i +
          '"><div class="row g-0 h-100"><div class="col-lg-4"><img  style="margin-top: 4px; max-width: 85px; max-height: 85px;" src="/data/'+
          data[i].codiceTorneo +
          '/icon/'+
          data[i].nomeSquadra +
          '.jpg" onerror="this.onerror=null; this.src=\'/images/msgelogo.jpg\';" class="img-fluid rounded-start" /></div><div class="col-lg-8"><div class="card-body"><h6 class="card-title ">'+
          data[i].nomeSquadra +
          '</h6></div></div></div><i class="fa-solid fa-caret-down fa-2xs" style="color: #c0c0c0;"></i></div></div>'+
          '<div class="modal fade" id="modal' +
          i +
          '" style="text-align: center; aria-labelledby="ModalLabel' +
          i +
          '" aria-hidden="true" tabindex="-1"  margin: auto;">' +
          '<div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="ModalLabel' + 
          i +
          '">Informazioni utili</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">' +
          '<p class="text">Referente: '+
          data[i].referenteSquadra +
          '<br>Tel.: '+
          data[i].telefonoSquadra +
          '<br>Email: '+
          data[i].emailSquadra +
          '</br>Giorno preferito: '+
          data[i].giornoGaraPreferito +
          ' - ' +
          data[i].oraGaraPreferito +
          ' </br>Indirizzo campo: ' +
          '<a href="http://maps.google.com/?q=' +
            data[i].indirizzoSquadra +
            '" target="_blank">' +
            data[i].indirizzoSquadra +
            "</a>" +
          '</p></div></div></div></div>'

        );
      }
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

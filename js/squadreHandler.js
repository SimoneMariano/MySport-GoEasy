/*
    QUESTO FILE DIPENDE DA FUNZIONI DI cookieHandler.js;
    ASSICURARSI DI INCLUDERE IL FILE ""PRIMA"" DELL'INCLUSIONE
    DI QUESTO JS ALL'INTERNO DELL'HTML.
*/

function completeSquad() {
  checkCookie();
  var cookie = getCookie("cartella");
  $.ajax({
    url: "/MySport-GoEasy/php/squadreHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
    method: "POST",
    data: { cookie: cookie },
    success: function (response) {
      //console.log(response);
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

          '<div class="col-sm-4"><div class="card shadow p-3 mb-5 bg-body rounded" style="text-align: center; margin: 5px; this.hover: gray;" data-bs-toggle="modal" data-bs-target="#modal'+ 
          i +
          '"><div class="row g-0"><div class="col-lg-4"><img  style="margin-top: 4px;" src="/MySport-GoEasy/data/'+
          data[i].codiceTorneo +
          '/icon/'+
          data[i].nomeSquadra +
          '.jpg" class="img-fluid rounded-start" /></div><div class="col-lg-8"><div class="card-body"><h6 class="card-title">'+
          data[i].nomeSquadra +
          '</h6> </div></div><i class="fa-solid fa-caret-down fa-2xs" style="color: #c0c0c0;"></i></div></div></div>'+
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

          /*'<div class="rigaTab row" style="padding: 3px">' +
            '<div class="col-2 align-self-center">' +
            '<img class="d-inline-block rounded"src="/MySport-GoEasy/data/' +
            data[i].codiceTorneo +
            "/icon/" +
            data[i].nomeSquadra +
            '.jpg" style="max-width: 50px" />' +
            "</div>" +
            '<div class="col-10 align-self-center text-start">' +
            '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">' +
            '<div class="col fw-bold">' +
            data[i].nomeSquadra +
            "</div>" +
            '<div class="col">' +
            "All.: " +
            data[i].referenteSquadra +
            ", " +
            data[i].telefono +
            ", "+
            data[i].email +
            ";" +
            "</div>" +
            '<div class="col">' +
            "Campo: " +
            '<a href="http://maps.google.com/?q=' +
            data[i].indirizzoSquadra +
            '" target="_blank">' +
            data[i].indirizzoSquadra +
            "</a>" +
            ";" +
            "</div>" +
            '<div class="col">' +
            "Giorno: " +
            data[i].giornoGaraPreferito +
            ", " +
            data[i].oraGaraPreferito +
            ";</div>" +
            "</div>" +
            "</div>" +
            "</div>"*/
        );
      }
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

function stopBanner() {}
/*  setTimeout(() => {
    var verifica = checkLast();

    if (verifica) {
      return;
    }

    var num;
    var item;
    var trash_row;

    var select0 = document.getElementById("tabella");
    var select1 = select0.getElementsByClassName("rigaTab");

    num = select1.length - 1;
    item = select1[num];
    trash_row = item;

    var select2 = item.getElementsByClassName("col");

    item = select2[0];

    var select3 = item.getElementsByTagName("a");

    item = select3[0];

    if (item != null) {
      var data = item.title;

      if (data == "Free Web Hosting with PHP5 or PHP7") {
        $(trash_row).html("");
      }
    }
  }, 500);
}

function checkLast() {
  var num;
  var item;
  var trash_row;

  var select0 = document.getElementById("tabella");
  var select1 = select0.getElementsByClassName("rigaTab");

  num = select1.length - 1;
  item = select1[num];
  trash_row = item;

  var select2 = item.getElementsByClassName("col");

  num = select2.length - 1;
  item = select2[num];

  //console.log(item.outerText);

  var data = item.outerText.split(",");

  if (data[5] == "Giorno: undefined" && data[2] == " undefined;") {
    $(trash_row).html("");
    return true;
  } else {
    return false;
  }
}
*/
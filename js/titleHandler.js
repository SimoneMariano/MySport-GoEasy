function titleAppend() {
  var nomePagina = window.document.title;
  $(".tabellone").html("");
  var cookie = getCookie("cartella");
  $(document).ready(function () {
    $.ajax({
      url: "/MySport-GoEasy/php/titleHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "POST",
      data: {cookie: cookie},
      success: function (response) {
        //console.log(response);
        var data = JSON.parse(response);
        var dataList = $("#tabellone");
        // Loop attraverso i dati e aggiungi elementi alla lista
        for (var i = 0; i < data.length; i++) {
          dataList.append(
            '<h3 class="text-black" align=center>' +
              nomePagina + ' ' +
              data[i].nomeTorneo +
              "</h3>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });
}

/*function titleAppend() {
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
}*/

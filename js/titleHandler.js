function titleAppend() {
  var nomePagina = window.document.title;
  $(".tabellone").html("");
  var cookie = getCookie("cartella");
  $(document).ready(function () {
    $.ajax({
      url: "/php/titleHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "POST",
      data: {cookie: cookie},
      success: function (response) {
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

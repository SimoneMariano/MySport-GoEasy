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
              '</h3>' +
              '<img style="max-width: 450px; padding: 8px;" src="/data/' +
              cookie +
              "/icon/" +
              data[i].nomeTorneo +
              '.jpg" onerror="this.onerror=null;" class="img-fluid" align=center/>'
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });
}

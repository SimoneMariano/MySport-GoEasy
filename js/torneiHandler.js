function showTournament() {
  var nomeFile = "/data/codiciTornei.txt";
  $.get(nomeFile, function (file) {
    resettaForm();
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
      row = $(
        '<option value="' +
          data[0] +
          '">' +
          data[0] +
          " - " +
          data[1] +
          "</option>"
      );
      //console.log(data);
      $("#form").append(row);
    });
  });
}

function resettaForm() {
  $(".content").html("");
  row = $(
    '<select class="form-select" id="form" name="form" aria-label="Default select example"><option selected>Seleziona il campionato</option></select>'
  );
  $(".content").append(row);
}

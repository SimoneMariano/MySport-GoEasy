function showTournament() {
  $(document).ready(function () {
    resettaForm();
    $.ajax({
      url: "/MySport-GoEasy/php/torneiHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "GET",
      success: function (response) {
        var data = JSON.parse(response);
        var dataList = $("#form");
        // Loop attraverso i dati e aggiungi elementi alla lista
        for (var i = 0; i < data.length; i++) {
          dataList.append(
            '<option value="' +
              data[i].codiceTorneo +
              '">' +
              data[i].nomeTorneo +
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

function resettaForm() {
  $(".content").html("");
  row = $(
    '<select class="form-select justify-content-center" id="form" name="form" aria-label="Default select example" style="width: 80%; margin: 0 auto;"><option selected>Seleziona il campionato</option></select>'
  );
  $(".content").append(row);
}

function showPopup(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  var formSelect = document.getElementById("form"); // Get the select element
  var selectedOption = formSelect.options[formSelect.selectedIndex].value;

  if (selectedOption == "Seleziona il campionato") {
    window.alert("Seleziona un torneo valido");
    return;
  }

  var userInput = prompt("Inserisci il codice adesione:"); // Show prompt for user input

  if (selectedOption === userInput) {
    // If user clicked "OK"

    $.ajax({
      url: "/MySport-GoEasy/php/torneiHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
      method: "GET",
      success: function (response) {
        console.log(response);
        var data = JSON.parse(response);
        for (var i = 0; i < data.length; i++) {
          if (selectedOption === data[i].codiceTorneo) {
            var code = data[i].codiceTorneo;
            setCookie(code);
            window.open(
              "/MySport-GoEasy/html/tornei/squadre.html",
              "_blank"
            );
          }
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  } else {
    window.alert("Codice inserito inesistente o errato");
  }
}

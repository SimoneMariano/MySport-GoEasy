function showTournament() {
  $(document).ready(function () {
    resettaForm();
    $.ajax({
      url: "/php/torneiHandler.php", // il percorso del file PHP che gestisce il recupero dei dati
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
  event.preventDefault();

  var formSelect = document.getElementById("form");
  var selectedOption = formSelect.value;
  
  var existingCodes = getCookie("perma") || "";
  var codiciTorneo = existingCodes.split("/");
  var codiceTemporaneo = getCookie("cartella") || "";

  if (selectedOption === "Seleziona il campionato") {
    window.alert("Seleziona un torneo valido");
    return;
  }

  if (codiceTemporaneo === selectedOption) {
    window.open("/html/tornei/squadre.html", "_blank");
    return;
  }

  if (codiciTorneo.includes(selectedOption)) {
    setCookie(selectedOption);
    window.open("/html/tornei/squadre.html", "_blank");
    return;
  }

  var userInput = prompt("Inserisci il codice adesione:");
  if (!userInput) {
    window.alert("Codice adesione non inserito!");
    return;
  }

  $.ajax({
    url: "/php/torneiHandler.php",
    method: "GET",
    success: function (response) {
      try {
        var data = JSON.parse(response);
        var torneo = data.find((item) => item.codiceTorneo === selectedOption);

        if (!torneo) {
          window.alert("Codice torneo non trovato!");
          return;
        }

        if (codiceTemporaneo.includes(selectedOption) && selectedOption === torneo.codiceTorneo) {
          window.open("/html/tornei/squadre.html", "_blank");
          return;
        }

        // Verifica nei cookie
        if (codiciTorneo.includes(selectedOption) && selectedOption === torneo.codiceTorneo) {
          setCookie(selectedOption);
          window.open("/html/tornei/squadre.html", "_blank");
          return;
        }

        // Verifica input utente
        if (selectedOption === userInput && selectedOption === torneo.codiceTorneo) {
          permanentCookie(selectedOption);
          setCookie(selectedOption);
          window.open("/html/tornei/squadre.html", "_blank");
          return;
        }

        window.alert("Codice inserito inesistente o errato");
      } catch (error) {
        console.error("Errore durante il parsing dei dati:", error);
      }
    },
    error: function (xhr, status, error) {
      console.error("Errore durante il recupero dei dati:", error);
    },
  });
}
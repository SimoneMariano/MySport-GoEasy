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
      row = $('<option value="' + data[0] + '">' + data[1] + "</option>");
      //console.log(data);
      $("#form").append(row);
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
  var selectedText = formSelect.options[formSelect.selectedIndex].text;

  var userInput = prompt("Inserisci il codice adesione:"); // Show prompt for user input

  if (selectedOption === userInput) {
    // If user clicked "OK"
    var nomeFile = "/data/codiciTornei.txt";
    $.get(nomeFile, function (file) {
      var riga = file.split("\n");
      $.each(riga, function (elem) {
        if (riga[elem] == "") {
          return;
        }
        var data = riga[elem].split(",");
        if (data[8] == "\r") {
          data[8] = "";
        }

        if (selectedOption === data[0]) {
          var code = data[0];
          setCookie(code);
          window.open("/html/tornei/calendario.html", "_blank");
        }
      });
    });
  } else {
    window.alert("sometext");
  }
}

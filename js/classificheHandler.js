/*
    QUESTO FILE DIPENDE DA FUNZIONI DI cookieHandler.js;
    ASSICURARSI DI INCLUDERE IL FILE ""PRIMA"" DELL'INCLUSIONE
    DI QUESTO JS ALL'INTERNO DELL'HTML.
*/

function pulisciTabellaClass() {
    $(".content").html("");
    row = $(
      '<table class="table table-hover table-light" border="0" cellspacing="0" cellpadding="0" id="tabella"><thead><tr id="intestazione"><th></th><th></th><th></th><th>G</th><th>Pt</th><th>V</th><th>P</th><th>Sv</th><th>Sp</th></tr></thead><tbody></tbody></table>'+
      '<script>$(document).ready(function() {$("#tabella").tablesorter({ sortList: [ [0, 0] ] });});</script>'
    );
    $(".content").append(row);
  }

  function completeClass() {
    checkCookie();
    var nome = getCookie("cartella");
    var nomeFile = "/data/" + nome + "/" + nome + "_Classifica.dat";
    $.get(nomeFile, function (file) {
      pulisciTabellaClass();
      var riga = file.split("\n");
      //console.log(riga);
      $.each(riga, function (elem) {
        if (riga[elem] == "") {
          return;
        }
        var data = riga[elem].split(",");
        //console.log(data);
        var row = "";
        if (data[8] == "\r") {
          data[8] = "";
        }

        var nomilunghi = data[1].split(" ");
        var nomeFixed;
        if (nomilunghi.length == 1) {
          if (nomilunghi[0].length > 10) {
            nomeFixed = nomilunghi[0].substr(0, 10);
            var nome2 = nomilunghi[0].substr(11);
            nomeFixed = nomeFixed + " " + nome2;
          } else {
            nomeFixed = data[1];
          }
        } else {
          nomeFixed = data[1];
        }

        var datatot = parseInt(data[3]) + parseInt(data[10]);

        row = $(
          "<tr style='border-spacing=0px;'><td>" +
            data[0] +
            "</td><td>" +
            '<img class="d-inline-block rounded"src="/data/'+ nome +'/icon/' + data[1] +'.jpg' + '" style="max-width: 40px" />'+
            "</td><td>" +
            nomeFixed +
            "</td><td>" +
            data[2] +
            "</td><td>" +
            datatot +
            "</td><td>" +
            data[4] +
            "</td><td>" +
            data[5] +
            "</td><td>" +
            data[6] +
            "</td><td>" +
            data[7] +
            "</td></tr>"
        );
        //console.log(data);
        if (nomeFixed != "undefined" || nomeFixed != "" || nomeFixed != " ") {
          $("#tabella").append(row);
        }
      });
    });
  }

function titleAppend() {
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
              '<h3 class="text-black" align=center>Classifica torneo ' + titolo + '</h3>'
          );
        }
        $("#tabellone").append(row);
      });
    });
  }

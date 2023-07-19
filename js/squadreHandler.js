/*
    QUESTO FILE DIPENDE DA FUNZIONI DI cookieHandler.js;
    ASSICURARSI DI INCLUDERE IL FILE ""PRIMA"" DELL'INCLUSIONE
    DI QUESTO JS ALL'INTERNO DELL'HTML.
*/

function completeSquad() {
    checkCookie();
    var nome = getCookie("cartella");
    var nomeFile = "/data/" + nome + "/" + nome + "_Squadre.dat";
    $.get(nomeFile, function (file) {
      var riga = file.split("\n");
      var counter = 0;
      $.each(riga, function (elem) {
        if (riga[elem] == "") {
          return;
        }
        var data = riga[elem].split(",");
        //console.log(data);
        var row = "";
        if (data[8] == "\r" || data[8] == "undefined") {
          data[8] = "";
        }
  
        if (data[5] == 1) {
          data[5] = "Lunedì";
        } else if (data[5] == 2) {
          data[5] = "Martedì";
        } else if (data[5] == 3) {
          data[5] = "Mercoledì";
        } else if (data[5] == 4) {
          data[5] = "Giovedì";
        } else if (data[5] == 5) {
          data[5] = "Venerdì";
        } else if (data[5] == 6) {
          data[5] = "Sabato";
        } else if (data[5] == 7) {
          data[5] = "Domenica";
        }
  
        row = $(
          '<div class="rigaTab row" style="padding: 3px">' +
            '<div class="col-2 align-self-center">'+
              '<img class="d-inline-block rounded"src="/data/'+ nome +'/icon/' + data[8] + '" style="max-width: 50px" />'+
            '</div>' +
            '<div class="col-10 align-self-center text-start">' +
              '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">' +
                '<div class="col fw-bold">' + data[0] + '</div>' +
                '<div class="col">' + "All.: " + data[1] + ", " + data[2] + ", " + data[3] + ";" + '</div>' +
                '<div class="col">' + "Campo: " +
                  '<a href="http://maps.google.com/?q=' + data[4] + '" target="_blank">' + data[4] + "</a>" + ";" +
                '</div>' +
                '<div class="col">' + "Giorno: " + data[5] + ", " + data[6] + ';</div>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
        //console.log(data);
        if (data[0] != "undefined" || data[0] != "" || data[0] != " " || data[0] != null 
          || data[0] !== "undefined" || data[0] !== "" || data[0] !== " " || data[0] !== null || counter <= riga.length ) {
            $("#tabella").append(row);
            counter++;
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
              '<h3 class="text-black" align=center>Squadre torneo ' + titolo + '</h3>'
          );
        }
        $("#tabellone").append(row);
      });
    });
  }

  function stopBanner() {
    setTimeout(() => {

      var verifica = checkLast();

      if (verifica) {
        return;
      }

      var num;
      var item;
      var trash_row;

      var select0 = document.getElementById('tabella');
      var select1 = select0.getElementsByClassName('rigaTab');

      num = select1.length - 1;
      item = select1[num];
      trash_row = item;

      var select2= item.getElementsByClassName('col');

      item = select2[0];

      var select3= item.getElementsByTagName('a');

      item = select3[0];

      if (item != null) {
        var data = item.title;

        if (data == 'Free Web Hosting with PHP5 or PHP7') {
          $(trash_row).html("");
        }      
      }      

     }, 500);      

  }

  function checkLast() {
      var num;
      var item;
      var trash_row;

      var select0 = document.getElementById('tabella');
      var select1 = select0.getElementsByClassName('rigaTab');

      num = select1.length - 1;
      item = select1[num];
      trash_row = item;

      var select2= item.getElementsByClassName('col');
      
      num = select2.length - 1;
      item = select2[num];

      //console.log(item.outerText);

      var data = item.outerText.split(",");
      
      if (data[0] == 'Giorno: undefined' && data[1] == ' undefined;') {
        $(trash_row).html("");
        return true;
      }
      else{
        return false;
      }

  }
/* 
    QUESTO FILE E' NECESSARIO AL FUNZIONAMENTO DI calendarioHandler.js, classificheHandler.js, squadreHandler.js
    PERCUI DEVE ESSERE INCLUSO NEGLI HTML PRIMA DELL'ESECUZIONE DEI FILE SOPRACITATI
    VIENE INOLTRE INCLUSO IN tornei.html PER IL SALVATAGGIO DEI COOKIE
*/

function getCookie(nome) {
  var name = nome + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

function checkCookie() {
  var cookie = getCookie("cartella");
  if (cookie == "") {
    alert("Errore nel caricamento, riselezionare il campionato scelto");
    window.close();
  }
  if (cookie == "Seleziona il campionato") {
    alert("Errore nel caricamento, riselezionare il campionato scelto");
    window.close();
  }
}

function setCookie(code) {
  document.cookie = "cartella=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

  var cartella = code;

  var d = new Date();
  d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000); //expire cookie dopo 7 giorni
  var expires = "expires=" + d.toUTCString();

  document.cookie = "cartella=" + cartella + "; " + expires + "; path=/";
}

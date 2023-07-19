function scrollToSection() {
  var newWindow = window.open("/html/info.html");

  // Gestisce l'evento di messaggio ricevuto dalla nuova pagina
  window.addEventListener("message", function (event) {
    if (event.data === "scrollToElement") {
      var targetElement = newWindow.document.getElementById("download");
      var targetOffset = targetElement.offsetTop;

      newWindow.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    }
  });

  // Invia un messaggio alla nuova pagina per richiedere lo scroll
  newWindow.postMessage("scrollToElement", "*");
}

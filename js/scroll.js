function scrollToSection() {
  var newWindow = window.open("/html/info.html");

  // Ascolta l'evento 'load' sulla finestra appena aperta
  newWindow.addEventListener("load", function () {
    // Aspetta 500 millisecondi prima di cercare l'elemento e scorrere
    setTimeout(function () {
      // Assicurati che la finestra figlia sia completamente caricata
      if (newWindow.document.readyState === "complete") {
        // Ora puoi accedere al DOM della finestra figlia in modo sicuro
        var targetElement = newWindow.document.getElementById("download");
        if (targetElement) {
          var targetOffset = targetElement.offsetTop-100; //il meno 100 serve per fare in modo che arrivi e si visualizzi un po' più in basso in modo tale da essere più gradevole

          if ("scrollBehavior" in document.documentElement.style) {
            // Il browser supporta lo scrolling smooth
            newWindow.scrollTo({
              top: targetOffset,
              behavior: "smooth",
            });
          } else {
            // Fallback per lo scrolling normale senza effetto smooth
            newWindow.scrollTo(0, targetOffset);
          }
        } else {
          console.error(
            "L'elemento #download non è stato trovato nella finestra figlia."
          );
        }
      } else {
        console.error("La finestra figlia non è stata completamente caricata.");
      }
    }, 50); // Attendi 50 millisecondi prima di eseguire lo scrolling
  });

  // Invia un messaggio alla nuova pagina per richiedere lo scroll
  newWindow.postMessage("scrollToElement", "*");
}

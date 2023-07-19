/*QUESTO FILE E' STATO CREATO PER LA GESTIONE DEI BANNER PUBBLICITARI DERIVANTI
DA L'UTILIZZO DI SITI DI HOSTING GRATUITI*/

function stopBannerGeneral() {
    setTimeout(() => {

      var num;
      var item;
      var trash_row;

      var select0 = document.getElementsByTagName("div");

      num = select0.length - 1;
      item = select0[num];
      trash_row = item;

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


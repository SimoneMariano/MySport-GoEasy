$(document).ready(function() {
    $.ajax({
        url: 'prova.php', // il percorso del file PHP che gestisce il recupero dei dati
        method: 'POST',
        success: function(response) {
            console.log(response);
            var data = JSON.parse(response);
            var dataList = $('#data-list');

            // Loop attraverso i dati e aggiungi elementi alla lista
            for (var i = 0; i < data.length; i++) {
                dataList.append('<li>' + data[i].nomeTorneo + ' - ' + data[i].nomeTorneo + '</li>');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

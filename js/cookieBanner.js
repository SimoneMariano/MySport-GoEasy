function verifyCookie() {
    var cookieBanner = document.getElementById('cb-cookie-banner');
    var acceptButton = document.getElementById('cb-cookie-accept');

    // Funzione per impostare un cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Funzione per ottenere il valore di un cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Mostra il banner solo se l'utente non ha ancora fatto una scelta
    if (!getCookie('userConsent')) {
        cookieBanner.style.display = 'block';
    }

    // Gestione dell'accettazione dei cookie
    acceptButton.addEventListener('click', function () {
        setCookie('userConsent', 'accepted', 365);
        cookieBanner.style.display = 'none';
    });

}
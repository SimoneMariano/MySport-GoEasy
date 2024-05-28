<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera i dati dal form
    $sender_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $email_content = htmlspecialchars($_POST['messaggio']);

    // Indirizzo email del destinatario
    $to = 'mysportgoeasy@altervista.org';

    // Oggetto dell'email
    $subject = 'Nuova email dal sito web MySportGoEasy';

    // Intestazioni dell'email
    $headers = "From: " . $sender_email . "\r\n";
    $headers .= "Reply-To: " . $sender_email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Corpo dell'email
    $body = "<html><body>";
    $body .= "<p>Email inviata da: " . $sender_email . "</p>";
    $body .= "<p>Contenuto della mail:</p>";
    $body .= "<p>" . nl2br($email_content) . "</p>";
    $body .= "</body></html>";

    // Invia l'email
    if (mail($to, $subject, $body, $headers)) {
        echo '<script type="text/javascript">
                alert("Email inviata con successo");
                window.location.href = "/index.html";
              </script>'; 
    } else {
        echo '<script type="text/javascript">
                alert("Errore nell\'invio dell\'email");
                window.location.href = "/html/about.html";
              </script>'; 
    }
} else {
    echo '<script type="text/javascript">
            alert("Metodo di richiesta non valido");
            window.location.href = "/html/about.html";
          </script>'; 
}
?>

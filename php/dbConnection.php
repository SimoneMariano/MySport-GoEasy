<?php
// Connessione al database
$servername = "localhost";
$username = "mysportgoeasy"; // il tuo nome utente MySQL o phpMyAdmin
$password = ""; // la tua password MySQL o phpMyAdmin
$dbname = "my_mysportgoeasy"; // il nome del tuo database

global $conn;
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}
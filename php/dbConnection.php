<?php
// Connessione al database
$servername = "127.0.0.1"; //localhost
$username = "root"; // il tuo nome utente MySQL o phpMyAdmin
$password = ""; // la tua password MySQL o phpMyAdmin
$dbname = "volley"; // il nome del tuo database

global $conn;
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}
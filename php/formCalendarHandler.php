<?php
require "./dbConnection.php";

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

$cookie = $_POST['cookie'];

// Esegui una query per estrarre i dati
$sql = "SELECT nomeSquadra FROM squadre WHERE codiceTorneo = ('$cookie');";
$result = mysqli_query($conn, $sql);

$data = array();

if ($result->num_rows > 0) {
    // Output dei dati in formato JSON
    while ($row = mysqli_fetch_array($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(array('message' => 'Nessun dato trovato'));
}

$conn->close();
?>
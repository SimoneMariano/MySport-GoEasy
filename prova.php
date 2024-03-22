<?php
$conn = require '/php/dbConnection.php';

$code = '22_533';

// Esegui una query per estrarre i dati
$sql = "SELECT nomeTorneo FROM torneo WHERE torneo.codiceTorneo = '$code';";
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

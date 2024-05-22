<?php
require "./dbConnection.php";

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

$cookie = $_POST['cookie'];
$squadraFilter = $_POST['squadraFilter'];
$giornoFilter = $_POST['giornoFilter'];
$giornataFilter = $_POST['giornataFilter'];

// Esegui una query per estrarre i dati
if ($squadraFilter == "" && $giornoFilter == "" && $giornataFilter == "") {
    $sql = "SELECT * FROM calendario JOIN squadre On calendario.squadraCasa = squadre.nomeSquadra
WHERE calendario.codiceTorneo = ('$cookie') AND squadre.codiceTorneo = ('$cookie');";
    $result = mysqli_query($conn, $sql);
} elseif ($squadraFilter != "" && $giornoFilter == "" && $giornataFilter == "") {
    $sql = "SELECT * FROM calendario JOIN squadre On calendario.squadraCasa = squadre.nomeSquadra
WHERE calendario.codiceTorneo = ('$cookie') AND squadre.codiceTorneo = ('$cookie')
     AND (squadraCasa = ('$squadraFilter') OR squadraTrasferta = ('$squadraFilter'));";
     $result = mysqli_query($conn, $sql);
} elseif ($squadraFilter != "" && $giornoFilter != "" && $giornataFilter == "") {
    $sql = "SELECT * FROM calendario JOIN squadre On calendario.squadraCasa = squadre.nomeSquadra
WHERE calendario.codiceTorneo = ('$cookie') AND squadre.codiceTorneo = ('$cookie')
     AND (squadraCasa = ('$squadraFilter') OR squadraTrasferta = ('$squadraFilter'))
     AND  DATE(orarioGara) >= ('$giornoFilter');";
     $result = mysqli_query($conn, $sql);
} elseif ($squadraFilter != "" && $giornoFilter != "" && $giornataFilter != "") {
    $sql = "SELECT * FROM calendario JOIN squadre On calendario.squadraCasa = squadre.nomeSquadra
WHERE calendario.codiceTorneo = ('$cookie') AND squadre.codiceTorneo = ('$cookie')
     AND (squadraCasa = ('$squadraFilter') OR squadraTrasferta = ('$squadraFilter'))
     AND  DATE(orarioGara) >= ('$giornoFilter') AND numeroGiornata = ('$giornataFilter');";
     $result = mysqli_query($conn, $sql);
} elseif ($squadraFilter == '' && $giornoFilter == '' && $giornataFilter != "") {
    $sql = "SELECT * FROM calendario JOIN squadre On calendario.squadraCasa = squadre.nomeSquadra
WHERE calendario.codiceTorneo = ('$cookie') AND squadre.codiceTorneo = ('$cookie')
     AND numeroGiornata = ('$giornataFilter');";
     $result = mysqli_query($conn, $sql);
} elseif ($squadraFilter == '' && $giornoFilter != "" && $giornataFilter != "") {
    $sql = "SELECT * FROM calendario JOIN squadre On calendario.squadraCasa = squadre.nomeSquadra
WHERE calendario.codiceTorneo = ('$cookie') AND squadre.codiceTorneo = ('$cookie')
     AND  DATE(orarioGara) >= ('$giornoFilter') AND numeroGiornata = ('$giornataFilter');";
     $result = mysqli_query($conn, $sql);
} elseif ($squadraFilter != "" && $giornoFilter == '' && $giornataFilter != "") {
    $sql = "SELECT * FROM calendario JOIN squadre On calendario.squadraCasa = squadre.nomeSquadra
WHERE calendario.codiceTorneo = ('$cookie') AND squadre.codiceTorneo = ('$cookie')
     AND (squadraCasa = ('$squadraFilter') OR squadraTrasferta = ('$squadraFilter'))
     AND numeroGiornata = ('$giornataFilter');";
     $result = mysqli_query($conn, $sql);
} elseif ($squadraFilter == '' && $giornoFilter!= "" && $giornataFilter == '') {
    $sql = "SELECT * FROM calendario JOIN squadre On calendario.squadraCasa = squadre.nomeSquadra
WHERE calendario.codiceTorneo = ('$cookie') AND squadre.codiceTorneo = ('$cookie')
     AND  DATE(orarioGara) >= ('$giornoFilter');";
    $result = mysqli_query($conn, $sql);
}

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

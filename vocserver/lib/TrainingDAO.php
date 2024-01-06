<?php

function createTraining($training) {
    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $mysqli->set_charset("utf8");

    $query =  "INSERT INTO TRAINING (COLLECTION, BOX, CARD) VALUES (?, ?, ?);";

    $collection = $training["collection"];
    $box = $training["box"];
    $card = $training["card"];

    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("iii", $collection, $box, $card);
    $stmt->execute();

    $item["id"] = mysqli_insert_id($mysqli);
    $item["collection"] = $collection;
    $item["box"] = $box;
    $item["card"] = $card;

    mysqli_close($mysqli);
    return $item;
}

function nextCard($idValue) {

    global $servername, $username, $dbpassword, $dbname;
    $content = array();

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);

    $query = "SELECT ID, COLLECTION, BOX, CARD, LAST_UPDATED FROM TRAINING WHERE BOX = ".$idValue." ORDER BY LAST_UPDATED ASC LIMIT 1";
    $stmt = $mysqli->prepare($query);
    $stmt->execute();
    $stmt->bind_result($dId, $dCollection, $dBox, $dCard, $dLTS);

    while($row = $stmt->fetch()) {
        $item["id"] = $dId;
        $item["collection"] = $dCollection;
        $item["box"] = $dBox;
        $item["card"] = $dCard;
        $item["lts"] = $dLTS;
        $content[] = $item;
    }

    mysqli_close($mysqli);
    return $content[0];
}

function getTrainingById($idValue) {

    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);

    $stmt = $mysqli->prepare("SELECT ID, COLLECTION, CARD, BOX, LAST_UPDATED FROM TRAINING WHERE ID = " . $idValue);
    $stmt->execute();
    $stmt->bind_result($dId, $dCollection, $dCard, $dBox, $dLTS);
    $stmt->fetch();

    $item["id"] = $dId;
    $item["collection"] = $dCollection;
    $item["card"] = $dCard;
    $item["box"] = $dBox;
    $item["lts"] = $dLTS;

    mysqli_close($mysqli);
    return $item;
}

function updateTraining($trainingBE) {

    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);

    $query = "UPDATE TRAINING SET BOX = ?, COLLECTION = ?, CARD = ?, LAST_UPDATED = ? WHERE ID = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("iiisi",
        $trainingBE["box"],
        $trainingBE["collection"],
        $trainingBE["card"],
        $trainingBE["lts"],
        $trainingBE["id"]
    );
    $result = $stmt->execute();

    mysqli_close($mysqli);
    return $result;
}

?>

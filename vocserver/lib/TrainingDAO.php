<?php

function nextCard($idValue) {

    global $servername, $username, $dbpassword, $dbname;
    $content = array();

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);

    $query = "SELECT ID, COLLECTION, BOX, CARD FROM TRAINING WHERE BOX = ".$idValue." ORDER BY LAST_UPDATED DESC LIMIT 1";
    $stmt = $mysqli->prepare($query);
    $stmt->execute();
    $stmt->bind_result($dId, $dCollection, $dBox, $dCard);

    while($row = $stmt->fetch()) {
        $item["id"] = $dId;
        $item["collection"] = $dCollection;
        $item["box"] = $dBox;
        $item["card"] = $dCard;
        $content[] = $item;
    }

    mysqli_close($mysqli);
    return $content[0];
}

function getTrainingById($idValue) {

    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);

    $stmt = $mysqli->prepare("SELECT ID, COLLECTION, CARD, BOX FROM TRAINING WHERE ID = " . $idValue);
    $stmt->execute();
    $stmt->bind_result($dId, $dCollection, $dCard, $dBox);
    $stmt->fetch();

    $item["id"] = $dId;
    $item["collection"] = $dCollection;
    $item["card"] = $dCard;
    $item["box"] = $dBox;

    mysqli_close($mysqli);
    return $item;
}

function updateTraining($data_back) {

    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $query = "UPDATE TRAINING SET BOX = ". $data_back["box"] ." WHERE ID = ". $data_back["id"];
    $stmt = $mysqli->prepare($query);
    $stmt->execute();

    // $mysqli->commit();
    mysqli_close($mysqli);
    return;
}

?>

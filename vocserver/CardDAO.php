<?php
/*
 * CRUD for Card
 */

function createCard($card) {

}

function readCardById($id) {

    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $mysqli->set_charset("utf8");

    $query =  "SELECT ID, FRONT, BACK FROM CARDS WHERE ID = " . $id;

    $stmt = $mysqli->prepare($query);
    $stmt->execute();
    $stmt->bind_result($dId, $dFront, $dBack);
    $stmt->fetch();

    $item["id"] = $dId;
    $item["front"] = $dFront;
    $item["back"] = $dBack;

    mysqli_close($mysqli);
    return $item;
}

function updateCard($card) {

}

function deleteCardById($id) {

}


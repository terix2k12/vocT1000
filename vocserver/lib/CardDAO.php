<?php
/*
 * CRUD for Card
 */

function createCard($data_back) {
    global $servername, $username, $dbpassword, $dbname;

    $front = $data_back->{"front"};
    $back = $data_back->{"back"};
    $card["front"] = $front;
    $card["back"] = $back;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $mysqli->set_charset("utf8");

    $query =  "INSERT INTO CARDS (FRONT, BACK) VALUES (?, ?);";

    $stmt = $mysqli->prepare($query);
    $i1 = $card["front"];
    $i2 = $card["back"];
    $stmt->bind_param("ss", $i1, $i2);
    $stmt->execute();

    $item["id"] = mysqli_insert_id($mysqli);
    $item["front"] = htmlspecialchars($i1);
    $item["back"] = htmlspecialchars($i2);

    mysqli_close($mysqli);
    return $item;
}

function readCardById($id) {

    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $mysqli->set_charset("utf8");

    $query =  "SELECT ID, FRONT, BACK FROM CARDS WHERE ID = ? ";

    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $id);

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


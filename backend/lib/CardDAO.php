<?php
/*
 * CRUD for Card
 */

function createCard($data_back) {
    global $servername, $username, $dbpassword, $dbname;

    $front = $data_back->{"front"};
    $back = $data_back->{"back"};
    $id = $data_back->{"id"};

    $card["id"] = intval(htmlspecialchars($id));
    $card["front"] = htmlspecialchars($front);
    $card["back"] = htmlspecialchars($back);

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $mysqli->set_charset("utf8");

    if($id > 0) {
        $query =  "UPDATE CARDS SET FRONT = ?, BACK = ? WHERE ID = ?";
        $i1 = $card["front"];
        $i2 = $card["back"];
        $i3 = $card["id"];
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("ssi", $i1, $i2, $i3);
    } else {
        $query =  "INSERT INTO CARDS (FRONT, BACK) VALUES (?, ?);";
        $i1 = $card["front"];
        $i2 = $card["back"];
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("ss", $i1, $i2);
    }

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

    $item["id"] = intval($dId);
    $item["front"] = htmlspecialchars($dFront);
    $item["back"] = htmlspecialchars($dBack);

    mysqli_close($mysqli);
    return $item;
}

function readAllCardsBetween($idMin, $idMax) {

    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $mysqli->set_charset("utf8");

    $query =  " SELECT ID, FRONT, BACK FROM CARDS WHERE ID >= ? AND ID <= ? ";

    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("ii", $idMin, $idMax);

    $stmt->execute();
    $stmt->bind_result($dId, $dFront, $dBack);
    $stmt->fetch();

    $content[] = [];
    $i = 0;
    while($row = $stmt->fetch()) {
        $item["id"] = intval($dId);
        $item["front"] = htmlspecialchars($dFront);
        $item["back"] = htmlspecialchars($dBack);
        $content[$i] = $item;
        $i = $i + 1;
    }

    mysqli_close($mysqli);
    return $content;
}

function updateCard($card) {

}

function deleteCardById($id) {

}


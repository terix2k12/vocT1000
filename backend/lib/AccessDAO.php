<?php
/*
 * CRUD for Access
 */

function createAccess() {
    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $mysqli->set_charset("utf8");

    $query =  "INSERT INTO ACCESS (LAST_UPDATED) VALUES (?);";
    $stmt = $mysqli->prepare($query);
    $date = date("Y-m-d H:i:s");
    $stmt->bind_param("s", $date);

    $stmt->execute();

    $item["id"] = mysqli_insert_id($mysqli);
    $item["lts"] = $date;

    mysqli_close($mysqli);
    return $item;
}

function readAccessCount() {
    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $mysqli->set_charset("utf8");

    $query =  "SELECT COUNT(*) FROM ACCESS;";

    $stmt = $mysqli->prepare($query);

    $stmt->execute();
    $stmt->bind_result($item);
    $stmt->fetch();

    mysqli_close($mysqli);
    return $item;
}

function deleteAccessAll() {
    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $mysqli->set_charset("utf8");

    $query =  "DELETE FROM ACCESS;";

    $stmt = $mysqli->prepare($query);
    $stmt->execute();
    mysqli_close($mysqli);
}

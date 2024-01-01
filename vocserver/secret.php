<?php
session_start();

if(!isset($_SESSION['userid'])) {
    die('Missing login');
}

$userid = $_SESSION['userid'];

echo "User: ".$userid;
?>
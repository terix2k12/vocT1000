<?php
session_start();

    $user = $_POST['user'];
    $password = $_POST['password'];

//    if ($user == 'voct' && $password == '1234') {
        $_SESSION['userid'] = 'secretsausage';
        echo 'Success';
//    } else {
//        echo 'Failure';
//    }

?>
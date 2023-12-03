<?php

$response["name"] = "T-1000 API";
$response["version"] = 1.0;

header("Content-Type: application/json; charset=UTF-8");
echo json_encode($response);

//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
//header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

?>
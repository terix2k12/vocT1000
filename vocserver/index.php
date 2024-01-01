<?php
  /*
  Docker Environment Test:
  phpinfo();
  */

// Credentials as specified in docker-compose.yml
$servername = 't1000Db';
$username = 'devuser';
$dbpassword = 'devpass';
$dbname = 't1000_data_db';

include_once "lib/TrainingDAO.php";

include_once "lib/CardDAO.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uriExploded = explode( '/', $uri );
$uriCount = count($uriExploded);

$uriBase = $uriExploded[0]; // Should be ''
$uriCommand = $uriExploded[1];

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if($uriCommand == "logout") {
    header("HTTP/1.1 200 OK");
    $success["info"] = "Logout successful!";
    echo json_encode( $success );
    return;
}

if($uriCommand == "login") {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("HTTP/1.1 200 OK");
        header("Access-Control-Allow-Methods: OPTIONS,POST");
        $success["info"] = "Preflight information.";
        echo json_encode( $success );
        return;
    }

    $data_back = json_decode(file_get_contents('php://input'));
    $user = $data_back->{"username"};
    $pwd = $data_back->{"password"};

    if($user == "foouser" && $pwd == "qwertz") {
        header("HTTP/1.1 200 OK");
        $success["success"] = "Login successful!";
        echo json_encode( $success );
        return;
    } else {
        header("HTTP/1.1 401 Access denied.");
        $error["error"] = "Invalid credentials!";
        echo json_encode( $error );
        return;
    }
}

if($uriCommand == "hindi") {
    $cardCommand = $uriExploded[2];

    if($cardCommand == 'next') {
        $idValue = intval($uriExploded[3]);
        echo json_encode( nextCard($idValue) );
        return;
    }

    if($cardCommand == 'get') {
        $idValue = $uriExploded[3];
        echo json_encode( readCardById($idValue) );
        return;
    }

    if($cardCommand == 'promote') {
        $idValue = $uriExploded[3];
        $training = getTrainingById($idValue);
        $training["box"] =  $training["box"] + 1;
        updateTraining($training);
        $updatedBE = getTrainingById($idValue);
        echo json_encode( $updatedBE );
        return;
    }

    if($cardCommand == 'demote') {
        $idValue = $uriExploded[3];
        $training = getTrainingById($idValue);
        $training["box"] =  $training["box"] - 1;
        updateTraining($training);
        echo json_encode( true );
        return;
    }

    if($cardCommand == 'skip') {
        $idValue = $uriExploded[3];

        $training = getTrainingById($idValue);
        $training["box"] =  $training["box"] - 1;
        updateTraining($training);

        // $training = getTrainingById($idValue);
        $training["box"] =  $training["box"] + 1;
        updateTraining($training);

        echo json_encode( true );
        return;
    }

    if($cardCommand == 'save') {
        $data_back = json_decode(file_get_contents('php://input'));
        $box = $data_back->{"box"};
        $id = $data_back->{"id"};
        $collection = $data_back->{"collection"};
        $card= $data_back->{"card"};
        $new_data["id"] = $id;
        $new_data["box"] = $box - 1;
        $new_data["card"] = $card;
        $new_data["collection"] = $collection;
        echo json_encode( save($new_data) );
        return;
    }

}

$response["name"] = "T-1000 API";
$response["version"] = 1.0;
echo json_encode($response);

//header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
//header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

?>
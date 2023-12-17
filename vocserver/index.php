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

  	function nextCard($idValue) {

        global $servername, $username, $dbpassword, $dbname;
        $content = array();

    	$mysqli = new mysqli($servername, $username, $dbpassword, $dbname);

        $query = "SELECT ID, COLLECTION, BOX, CARD FROM TRAINING WHERE BOX = ".$idValue." ORDER BY LAST_UPDATED ASC LIMIT 1";
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

function getCardById($idValue) {

    global $servername, $username, $dbpassword, $dbname;

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);

    $stmt = $mysqli->prepare("SELECT ID, FRONT, BACK FROM CARDS WHERE ID = " . $idValue);
    $stmt->execute();
    $stmt->bind_result($dId, $dFront, $dBack);
    $stmt->fetch();

    $item["id"] = $dId;
    $item["front"] = $dFront;
    $item["back"] = $dBack;

    mysqli_close($mysqli);
    return $item;
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

    mysqli_close($mysqli);
    return;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uriExploded = explode( '/', $uri );
$uriCount = count($uriExploded);

$uriBase = $uriExploded[0]; // Should be ''
$uriCommand = $uriExploded[1];

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

if($uriCommand == "hindi") {
    $cardCommand = $uriExploded[2];

    if($cardCommand == 'next') {
        $idValue = intval($uriExploded[3]);
        echo json_encode( nextCard($idValue) );
        return;
    }

    if($cardCommand == 'get') {
        $idValue = $uriExploded[3];
        echo json_encode( getCardById($idValue) );
        return;
    }

    if($cardCommand == 'promote') {
        $idValue = $uriExploded[3];
        $training = getTrainingById($idValue);
        $training["box"] =  $training["box"] + 1;
        updateTraining($training);
        echo json_encode( true );
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
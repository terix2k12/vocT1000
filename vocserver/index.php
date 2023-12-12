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

  	function nextCard() {

        global $servername, $username, $dbpassword, $dbname;
        $content = array();

    	$mysqli = new mysqli($servername, $username, $dbpassword, $dbname);

    	$stmt = $mysqli->prepare("SELECT ID, COLLECTION, BOX, CARD FROM TRAINING ORDER BY LAST_UPDATED ASC LIMIT 1");
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
    	return $content;
  	}

function save($data_back) {

    global $servername, $username, $dbpassword, $dbname;
    $content = array();

    $mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
    $query = "UPDATE TRAINING SET BOX = ". $data_back["box"] ." WHERE ID = ". $data_back["id"];
    $stmt = $mysqli->prepare($query);
    $stmt->execute();

    mysqli_close($mysqli);
    return $content;
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
        echo json_encode( nextCard() );
        return;
    }

    if($cardCommand == 'promote') {
        $data_back = json_decode(file_get_contents('php://input'));
        $box = $data_back->{"box"};
        $id = $data_back->{"id"};
        $collection = $data_back->{"collection"};
        $card= $data_back->{"card"};
        $new_data["id"] = $id;
        $new_data["box"] = $box + 1;
        $new_data["card"] = $card;
        $new_data["collection"] = $collection;
        echo json_encode( save($data_back) );
        return;
    }

    if($cardCommand == 'demote') {
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
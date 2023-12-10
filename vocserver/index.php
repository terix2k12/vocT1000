<?php
  /*
  Docker Environment Test:
  phpinfo();
  */

  	function dbdata() {
    	
    	$content = array();

    	// Credentials as specified in docker-compose.yml
    	$servername = 't1000Db'; 
    	$username = 'devuser';
    	$dbpassword = 'devpass';
    	$dbname = 't1000_data_db';

    	$mysqli = new mysqli($servername, $username, $dbpassword, $dbname);
 
    	$stmt = $mysqli->prepare("SELECT * FROM EXAMPLEDATA");
    	$stmt->execute();
    	$stmt->bind_result($dId, $dName, $dShelf);

	    while($row = $stmt->fetch()) {
	        $item["id"] = $dId;
	        $item["name"] = $dName;
	        $item["shelf"] = $dShelf;
	        $content[] = $item;
	    }
    
    	mysqli_close($mysqli);
    	return $content;
  	}
	
	function mockdata() {
		$art1["id"]=1;
		$art1["name"]="cat";
		$art1["shelf"]=1;

		$art2["id"]=2;
		$art2["name"]="dog";
		$art2["shelf"]=1;

		$art3["id"]=3;
		$art3["name"]="car";
		$art3["shelf"]=2;

		return [
			$art1,
			$art2,
			$art3
			];
	}

$response["name"] = "T-1000 API";
$response["version"] = 1.0;
$response["data"] = dbdata();

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

echo json_encode($response);


//header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
//header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

?>
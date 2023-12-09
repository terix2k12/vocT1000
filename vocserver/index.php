<?php


	
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
$response["data"] = mockdata();

header("Content-Type: application/json; charset=UTF-8");
echo json_encode($response);

//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
//header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

?>
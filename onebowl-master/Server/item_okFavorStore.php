<?
header("Access-Control-Allow-Origin: *");

$db_host = "localhost";	// Mysql 데이터베이스를 가지고 있는 서버의 IP 할당.
$db_user = "root";

$db_password = "autoset";
$db_name = "sedb";

$conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);

if(mysqli_connect_errno($conn)) {
  echo "데이터베이스 연결 실패: " . mysqli_connect_error();
}

$storeCode = $_POST['storeCode'];
$storeName = $_POST['storeName'];

$member_id = $_COOKIE['login_id'];

$query = "INSERT INTO member_favor_store (member_id, member_favor_store) VALUES ('". $member_id . "', '". $storeCode. "');";
mysqli_query($conn, $query, MYSQLI_USE_RESULT);

// 해당 가게의 좋아요 -1.

$query = "UPDATE store SET store_favor = store_favor + 1 WHERE store_code = '" . $storeCode . "'";
mysqli_query($conn, $query, MYSQLI_USE_RESULT);

mysqli_close($conn);
?>

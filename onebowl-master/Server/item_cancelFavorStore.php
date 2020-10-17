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

$storeFavor -= 1;

$query = "DELETE FROM member_favor_store WHERE member_id='" . $member_id . "' AND member_favor_store='" . $storeCode . "'";
mysqli_query($conn, $query, MYSQLI_USE_RESULT);

$query = "UPDATE store SET store_favor = store_favor - 1 WHERE store_code = '" . $storeCode . "'";
mysqli_query($conn, $query, MYSQLI_USE_RESULT);

mysqli_close($conn);

?>

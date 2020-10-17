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

$reviewCode = $_POST['reviewCode'];

$query = "UPDATE review SET review_unFavor = review_unFavor + 1 WHERE review_code = '" . $reviewCode . "'";
mysqli_query($conn, $query, MYSQLI_USE_RESULT);

mysqli_close($conn);
?>

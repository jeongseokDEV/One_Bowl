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

$imageUrl = $_POST['imageUrl'];
$starPoint = $_POST['starPoint'];
$reviewText = $_POST['reviewText'];
$id = $_POST['id'];
$member_id = $_COOKIE['login_id'];

$query = "INSERT INTO review (review_text, review_image, review_starPoint, store_code, member_id) VALUES ('". $reviewText . "', '". $imageUrl . "', '". $starPoint . "', '". $id . "', '". $member_id ."');";

mysqli_query($conn, $query, MYSQLI_USE_RESULT);
mysqli_close($conn);

// echo "imageUrl = " . $imageUrl . " starPoint = " . $starPoint . " reviewText = " . $reviewText . " id = " . $id . " member_id = " . $member_id;
?>

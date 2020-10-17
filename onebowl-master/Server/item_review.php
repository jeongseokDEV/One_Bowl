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

$id = $_POST['id'];

$data = "";

$query = "SELECT review_code, review_text, review_image, review_starPoint, review_favor, review_unFavor, member_id FROM review WHERE store_code = '" . $id . "'";

$resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

while($row = mysqli_fetch_object($resource)) {
  $data = $row->review_code . "@" . $row->review_text . "@" . $row->review_image . "@" . $row->review_starPoint . "@" . $row->review_favor . "@" . $row->review_unFavor . "@" . $row->member_id . "|" . $data;
}

echo $data;
?>

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

  $query = "SELECT calendar_code, calendar_content, calendar_date FROM calendar";
  $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);
  $data = "";

  while($row = mysqli_fetch_object($resource)) {
    $data = $row->calendar_code . "/" . $row->calendar_content . "/" . $row->calendar_date . "|" . $data;
  }

  echo $data;
?>

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

  $query = "select id from member";
  $resource = mysqli_query($conn, $query, MYSQLI_USE_RESULT);

  $idValue = $_POST['id'];
  $exist_flag = false;

  $data = "asd";

  while($row = mysqli_fetch_object($resource)) {
    if($row->id == $idValue) {
      $exist_flag = true;
    }
  }

  if($exist_flag == true) {
    $response = "success";
  } else {
    $response = "error";
  }

  echo $response;
?>
